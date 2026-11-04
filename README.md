# Cyphalon — static website

A static HTML/CSS/JavaScript website for [cyphalon.com](https://cyphalon.com), hosted on **Cloudflare Pages**. There is no Node.js, build step, database or server code.

## Pages

| File | Live URL | Page |
|---|---|---|
| `index.html` | `/` | Home |
| `identity.html` | `/identity` | Identity & Access Management (Keycloak) |
| `endpoint.html` | `/endpoint` | Endpoint Security (Wazuh) |
| `vulnerability.html` | `/vulnerability` | Vulnerability Assessment & Penetration Testing |
| `visibility.html` | `/visibility` | Security Visibility — SIEM & dashboards (Wazuh + Grafana) |
| `industries.html` | `/industries` | Industries, with a recommended starting point for each |
| `contact.html` | `/contact` | Contact form (opens the visitor's email app, so no server is needed) |
| `404.html` | — | Not-found page, served automatically by Cloudflare Pages |

Every page shares `styles.css`, `script.js` and `assets/favicon.svg`.

Cloudflare Pages serves clean URLs, so `/identity.html` redirects to `/identity`. The canonical tags, `og:url` tags and `sitemap.xml` use the clean URLs. Links between pages still use `.html` so the site also works when opened from a local folder.

## Meta Pixel

Pixel ID `1096894659651998` is installed on every page:

- **PageView** fires on every page load. The script is in each page's `<head>`, and the `<noscript>` fallback is at the top of `<body>`.
- **Lead** fires when someone submits the contact form, with the chosen service as `content_name` (see `script.js`).

If you add a new page, copy the Meta Pixel block from an existing page's `<head>` and the `<noscript>` block below `<body>`.

## Deploying (Cloudflare Pages)

Cloudflare Pages is connected to this repository, and **every push to `main` deploys automatically**.

First-time setup, for reference:

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → select this repository.
2. Build settings:
   - **Production branch:** `main`
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`
3. **Save and Deploy**. Cloudflare gives you a preview address on `*.pages.dev`.
4. In the project, open **Custom domains** and add `cyphalon.com` and `www.cyphalon.com`. First delete any old `A`, `AAAA` or `CNAME` records for those hostnames that point to the previous server. Otherwise Cloudflare reports a conflict.
5. Optional: add a redirect rule under **Rules → Redirect Rules** that sends `www.cyphalon.com/*` to `https://cyphalon.com/${1}`.

HTTPS certificates are issued automatically.

## Editing the site

- **Text and content:** edit the relevant `.html` file. The header, navigation and footer are repeated in every page, so change them in all files.
- **Styles:** `styles.css`. **Behavior** (mobile menu, Solutions dropdown, contact form, Lead event): `script.js`.
- **Email address:** contact links use `business@cyphalon.com`. Search and replace it across the `.html` files and in `contact.html`'s `data-mailto-form` attribute to change it.
- **New page:** copy an existing service page as a starting point, add it to the navigation and footer in every page, and add its clean URL to `sitemap.xml`.

## Preview locally

Double-click `index.html`, or run a local server from this folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`. Fonts load from Google Fonts when you're online.
