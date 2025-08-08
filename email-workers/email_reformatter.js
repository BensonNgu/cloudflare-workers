/**
 * email_reformatter.js
 *
 * Cloudflare Email Worker that:
 * - Tags email subjects based on recipient (configurable mapping)
 * - Formats the body to include sender, all recipients (To + Cc)
 * - Preserves original content after the formatted header
 * - Works for both direct and CC'd emails
 * - Sends reformatted email via MailChannels to your inbox
 *
 * Author: Benson Ngu
 * Created Date: 2025-08-08
 * Last Update: 2025-08-08
 */


export default {
  async email(message, env, ctx) {
    /**
     * ===============================
     * CONFIG: Email to Tag Mapping
     * ===============================
     * Key   = email address (lowercase)
     * Value = subject tag (no brackets)
     */
    const SUBJECT_TAGS = {
      "support@yourdomain.com": "support",
      "me@yourdomain.com": "inquiry",
      // Add more like:
      // "jobs@yourdomain.com": "job-application"
    };

    // --- Get recipient info ---
    const toList = message.to?.map(r => r.address.toLowerCase()) ?? [];
    const ccHeader = (message.headers.get("Cc") || "").toLowerCase();

    // --- Determine the matching tag ---
    let chosenTag = null;
    for (const [email, tag] of Object.entries(SUBJECT_TAGS)) {
      if (toList.includes(email) || ccHeader.includes(email)) {
        chosenTag = tag;
        break; // Stop at first match
      }
    }

    // --- Avoid double-tagging ---
    const alreadyTagged = chosenTag
      ? new RegExp(`^\\s*\\[${chosenTag}\\]\\s*`, "i").test(message.subject || "")
      : false;

    let newSubject = message.subject || "";
    if (chosenTag && !alreadyTagged) {
      newSubject = `[${chosenTag}] ${newSubject}`;
    }

    // --- Format header summary for body ---
    const from = message.from;
    const toPretty = message.to?.map(r => r.name ? `${r.name} <${r.address}>` : r.address) ?? [];
    const ccPretty = ccHeader
      ? ccHeader.split(",").map(s => s.trim()).filter(Boolean)
      : [];

    const esc = s => (s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    const headerText = [
      `From: ${from?.name ? `${from.name} <${from.address}>` : from?.address || "(unknown)"}`,
      `To: ${toPretty.join(", ") || "(none)"}`,
      `Cc: ${ccPretty.join(", ") || "(none)"}`
    ].join("\n");

    const headerHtml = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.45">
        <div style="padding:12px;border:1px solid #eee;border-radius:8px;background:#fafafa">
          <div><strong>From:</strong> ${esc(from?.name ? `${from.name} &lt;${from.address}&gt;` : from?.address || "(unknown)")}</div>
          <div><strong>To:</strong> ${esc(toPretty.join(", ") || "(none)")}</div>
          <div><strong>Cc:</strong> ${esc(ccPretty.join(", ") || "(none)")}</div>
        </div>
        <div style="margin:14px 0;border-top:1px solid #eee"></div>
      </div>`.trim();

    // --- Get original content ---
    let origText = "";
    try { origText = await message.text(); } catch {}
    let origHtml = "";
    try { origHtml = await message.html(); } catch {}

    const bodyHtml = origHtml
      ? headerHtml + origHtml
      : `${headerHtml}<pre style="white-space:pre-wrap;font-family:ui-monospace,Menlo,Consolas,monospace">${esc(origText || "(no body)")}</pre>`;

    const bodyText = `${headerText}\n\n------------------------------\n\n${origText || "(no body)"}`;

    // --- Send via MailChannels ---
    const DESTINATION = "yourrealinbox@gmail.com";
    const FROM_EMAIL = "router@yourdomain.com";
    const FROM_NAME = "Benson Mail Router";

    const payload = {
      personalizations: [{ to: [{ email: DESTINATION }] }],
      from: { email: FROM_EMAIL, name: FROM_NAME },
      subject: newSubject,
      content: [
        { type: "text/plain", value: bodyText },
        { type: "text/html", value: bodyHtml }
      ],
      headers: {
        "Reply-To": from?.address || ""
      }
    };

    const resp = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!resp.ok) {
      await message.forward(DESTINATION, { headers: { "Subject": newSubject } });
    }
  }
};
