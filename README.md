<!-- Title -->
<h1 align="center">☁️ cloudflare-workers</h1>

<!-- Description -->
<p align="center">✨ A personal knowledge base and curated code examples for exploring Cloudflare Workers, Email Workers, R2, KV, Durable Objects, and serverless tooling.</p>

<!-- 🚀 Project Overview -->
<p align="center">
  <!-- Top Language -->
  <img src="https://img.shields.io/github/languages/top/bensonngu/cloudflare-workers?style=for-the-badge&color=8A2BE2" alt="Top Language">
  
  <!-- Language Count -->
  <img src="https://img.shields.io/github/languages/count/bensonngu/cloudflare-workers?style=for-the-badge&color=8A2BE2" alt="Language Count">

  <!-- License -->
  <img src="https://img.shields.io/github/license/bensonngu/cloudflare-workers?style=for-the-badge&color=228B22" alt="License">
</p>

<!-- 🌍 Community & Repo Stats -->
<p align="center">
  <!-- Stars -->
  <img src="https://img.shields.io/github/stars/bensonngu/cloudflare-workers?style=for-the-badge&color=FFD700" alt="Repo Stars">

  <!-- Forks -->
  <img src="https://img.shields.io/github/forks/bensonngu/cloudflare-workers?style=for-the-badge&color=FF8C00" alt="Repo Forks">

  <!-- Watchers -->
  <img src="https://img.shields.io/github/watchers/bensonngu/cloudflare-workers?style=for-the-badge&color=1E90FF" alt="Repo Watchers">

  <!-- Open Issues -->
  <img src="https://img.shields.io/github/issues/bensonngu/cloudflare-workers?style=for-the-badge&color=DC143C" alt="Open Issues">
</p>

<!-- 📈 Activity -->
<p align="center">
  <!-- Last Commit -->
  <img src="https://img.shields.io/github/last-commit/bensonngu/cloudflare-workers?style=for-the-badge&color=00CED1" alt="Last Commit">

  <!-- Commit Activity -->
  <img src="https://img.shields.io/github/commit-activity/y/bensonngu/cloudflare-workers?style=for-the-badge&color=20B2AA" alt="Commit Activity">
</p>


This repository is a **living collection of notes, code snippets, and project experiments** based on my exploration of [Cloudflare Workers](https://developers.cloudflare.com/workers/). It covers core features like Workers, Email Workers, KV, R2, Durable Objects, and other tools in the Cloudflare ecosystem.

---

## 📌 Why This Repo?

- 🧠 Track my personal learning journey
- 🔬 Document use cases and testing scenarios
- ⚙️ Share practical examples with the community

---

## 🧱 Topics Covered

| Folder             | Description                                                 |
|--------------------|-------------------------------------------------------------|
| `workers/`         | Basic HTTP request handling, middleware, async logic        |
| `email-workers/`   | Handle inbound email, forwarding, parsing, etc.             |
| `kv/`              | Key-Value storage operations and caching patterns           |
| `r2/`              | File storage (upload/download) with R2                      |
| `durable-objects/` | State management at the edge                                |
| `bindings/`        | Environment bindings and secrets                            |
| `routing/`         | Custom domains, subrequests, and URL routing                |
| `auth/`            | Basic authentication & token validation on the edge         |

---

## 📁 Project Structure

```text
cloudflare-workers-research/
├── email-workers/
│   └── forward-example.js
├── kv/
│   └── rate-limiter.js
├── r2/
│   └── upload-to-r2.js
├── durable-objects/
│   └── counter-object.js
├── bindings/
│   └── secret-example.md
├── notes/
│   └── what-is-cloudflare-workers.md
└── README.md

```

---

## 🚀 Getting Started

You can clone this repo and run examples using [`wrangler`](https://developers.cloudflare.com/workers/wrangler/):

```bash
git clone https://github.com/BensonNgu/cloudflare-workers.git
cd cloudflare-workers

# Run any example (with Wrangler v3)
wrangler dev path/to/example.js
````

---

## 🛡 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

## 🙋‍♂️ Who Am I?

Hi! I’m [Benson Ngu](https://bensonngu.cc), a developer exploring the edge of the web. I use this repo to log my discoveries and small experiments in the Cloudflare ecosystem.

---

## 🌐 Useful Links

* [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
* [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
* [Cloudflare Developer Blog](https://blog.cloudflare.com/)
