# Cyphalon — static website

A static HTML/CSS/JavaScript website. No Node.js, build step, database or server code is needed.

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `identity.html` | Identity & Access Management (Keycloak) |
| `endpoint.html` | Endpoint Security (Wazuh) |
| `vulnerability.html` | Vulnerability Assessment & Penetration Testing |
| `visibility.html` | Security Visibility — SIEM & dashboards (Wazuh + Grafana) |
| `industries.html` | Industries, with a recommended starting point for each |
| `contact.html` | Contact form (opens the visitor's email app, so no server is needed) |
| `404.html` | Not-found page (GitHub Pages serves it automatically) |

Every page shares `styles.css`, `script.js` and `assets/favicon.svg`. The header, footer and navigation are the same on every page.

## Preview locally

Unzip the folder and double-click `index.html`. All links between pages work offline. Fonts load from Google Fonts when you're online.

Or run a local server from this folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Before going live

- `sitemap.xml`, `robots.txt` and the canonical tags assume the domain `https://cyphalon.com`. If you use a different domain, update it there.
- All contact links use `business@cyphalon.com`. Confirm the mailbox exists.

## Publish on GitHub Pages

1. Create a new GitHub repository (for example, `cyphalon-website`).
2. Upload the contents of this folder to the repository root. The root should contain all the `.html` files, `styles.css`, `script.js`, `sitemap.xml`, `robots.txt` and `assets/`.
3. Open **Settings → Pages** in the repository.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then save.
6. Wait for the Pages deployment to complete. Your GitHub Pages URL will appear in the Pages settings.

## Connect a custom domain using Cloudflare DNS

Use the custom-domain field in **GitHub repository → Settings → Pages** first, and save the exact domain you plan to use. Then create the matching DNS records in Cloudflare. For an apex/root domain (`example.com`), GitHub currently documents these `A` records:

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

For `www.example.com`, add a `CNAME` record with name `www` and target `<your-github-username>.github.io` (do not add the repository name to the target). For both root and `www`, configure both hostnames in GitHub Pages if you intend to use both. Keep an eye out for conflicting old `A`, `AAAA`, or `CNAME` records at the same hostnames.

After DNS is correct, return to **Settings → Pages** and enable **Enforce HTTPS** when the option becomes available. DNS propagation and certificate provisioning can take time. If you proxy the records through Cloudflare, troubleshoot with DNS-only (grey cloud) first if domain validation or HTTPS does not work.

The email links on this site use `business@cyphalon.com`. Confirm that mailbox exists before publishing, or change the address in `index.html` to the one you actively use.
