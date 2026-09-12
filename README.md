# Malwa-Tec Services — Website

A hosting-ready, 8-page static website for Malwa-Tec Services (residential & commercial pest control, Indore). Built with HTML5, CSS3 and vanilla JavaScript — no frameworks, no build step.

## Contents

```
malwa-tec-services/
├── index.html, about.html, services.html, contact.html, gallery.html,
│   privacy-policy.html, terms-and-conditions.html, blog-termite-management.html
├── css/style.css
├── js/script.js
├── images/  (hero, services, team, gallery, logos — all placeholders)
├── assets/favicon.svg
├── robots.txt
├── sitemap.xml
└── README.md
```

## 1. Setup — view it locally

No build tools are needed.

1. Download/copy the whole `malwa-tec-services` folder.
2. Open `index.html` directly in a browser, **or** run a simple local server (recommended, so relative paths behave exactly like on real hosting):
   - Python: `python3 -m http.server 8000` from inside the folder, then visit `http://localhost:8000`
   - VS Code: use the "Live Server" extension
3. Click through all 8 pages and the nav/footer links to confirm everything opens.

## 2. Replace the placeholder images

All images are auto-generated branded placeholders (not real photos), each clearly labelled "REPLACE IMAGE" and saved as `.jpg` files, so you can swap them by filename without touching any HTML.

- `images/hero/` — home, commercial, about and residential hero banners
- `images/services/` — one image per service card
- `images/team/` — owner + 4 technician placeholders
- `images/gallery/` — 9 gallery images used with the filter/lightbox
- `images/logos/` — 6 dummy client logo marks (SVG)
- `images/logo-malwa-tec.jpg` — your business logo (already using the logo you supplied)

**To replace:** save your real photo with the **same filename** into the same folder, keeping similar dimensions (see each image's aspect ratio in the page it's used on) — no code changes needed. If you use different filenames, update the `src="images/..."` path in the relevant HTML file(s).

## 3. Replace the client logos

The homepage and gallery page both show a "Trusted by Businesses" logo strip using dummy marks (`images/logos/client-logo-01.svg` … `06.svg`). These are **not real clients** — a comment is included in the HTML source:
```html
<!-- Replace dummy client logos with approved client logos after receiving permission. -->
```
Once you have permission from actual commercial clients, replace the SVG/PNG files (same filenames, or update the `src` attributes and `alt` text in `index.html` and `gallery.html`) and update the `<span>` labels from "Client Logo 01" to the real client name.

## 4. Update business information

Business details currently appear in **every page's header/footer** and on `contact.html`. Search-and-replace across all `.html` files for:

| Item | Current value |
|---|---|
| Business name | Malwa-Tec Services |
| Phone | +91 9893264066 (`tel:+919893264066`, `wa.me/919893264066`) |
| Email | malwatecservices@gmail.com |
| Address | 144, Swami Dayanand Nagar, Manik Bagh Road, Indore, Madhya Pradesh, India |
| GSTIN | 23ATHPA5567C1Z3 (footer of every page) |
| Instagram | https://www.instagram.com/malwa.tecservices |
| Facebook | https://www.facebook.com/MalwaTecServices |
| Service areas | Indore, Ujjain, Dewas, Rau, Mhow |
| Owner | Shoeb Amin, 15+ years experience (`about.html`) |
| Customer stats | 10+ yrs, 1,600+ residential, 1,100+ commercial, 2,700+ total (`index.html`, `about.html`) |

Use your editor's find-and-replace across the project folder to update these everywhere at once.

## 5. Contact form setup — connect to malwatecservices@gmail.com

The form in `contact.html` (`#enquiry-form`) currently points to a placeholder:

```html
<form id="enquiry-form" action="YOUR_FORM_ENDPOINT_HERE" method="POST" novalidate>
```

Until this is replaced, the site will **not** silently claim success — submitting shows an honest message asking the visitor to call or WhatsApp instead. Nothing is emailed until you connect a real endpoint.

### Option A — Formspree (recommended, no backend required)

1. Go to https://formspree.io and create a free account.
2. Create a new form and set the recipient email to `malwatecservices@gmail.com`.
3. Verify that email address when Formspree prompts you (check your inbox for a confirmation link).
4. Copy the endpoint Formspree gives you — it looks like `https://formspree.io/f/xxxxxxxx`.
5. In `contact.html`, replace:
   ```html
   action="YOUR_FORM_ENDPOINT_HERE"
   ```
   with:
   ```html
   action="https://formspree.io/f/xxxxxxxx"
   ```
6. Re-upload/redeploy `contact.html`. Submit a test enquiry and confirm it arrives at the inbox.

The JavaScript (`js/script.js`) already: validates required fields client-side, disables the submit button while sending (prevents duplicate submissions), and shows clear success/error states based on the actual response from Formspree — it never fakes a success message.

### Option B — PHP backend (only if your hosting supports PHP)

If you're on a cPanel host with PHP support (this will **not** work on Netlify or Vercel static hosting), you can instead point the form at a small PHP script using `mail()` or an SMTP library such as PHPMailer, which posts to `malwatecservices@gmail.com`. This requires:
- A PHP-enabled host (shared cPanel hosting typically supports this; Netlify/Vercel static hosting does not).
- Do **not** hardcode any email password directly in a plain PHP `mail()` script exposed to the public folder — if you use SMTP authentication, store credentials in an environment variable or a config file outside the public web root.
- This isn't included by default in this project (no PHP file is provided) — set it up separately if you choose this route, and update `action="..."` in `contact.html` to point to your PHP script's path.

## 6. SEO setup

- **Titles & meta descriptions** are already unique per page — edit the `<title>` and `<meta name="description">` tags directly in each HTML file.
- **Canonical URLs**: every page has `<link rel="canonical" href="https://www.malwatecservices.in/...">` — replace `malwatecservices.in` with your real domain across all files.
- **Open Graph / Twitter tags**: same placeholder domain appears in `og:url` — update once your domain is live.
- **sitemap.xml**: replace `malwatecservices.in` with your real domain in every `<loc>` entry.
- **robots.txt**: update the `Sitemap:` line with your real domain.
- **Social sharing image**: currently reuses existing hero/service images via `og:image` — swap for a dedicated 1200×630px share image once available.
- **Google Search Console**: after deployment, add your property, verify ownership, and submit `sitemap.xml`.

## 7. Deployment

### cPanel shared hosting
1. Zip the contents of `malwa-tec-services/` (not the folder itself — the files at the top level).
2. In cPanel → File Manager, go to `public_html` (or your domain's web root).
3. Upload and extract the zip so `index.html` sits directly inside `public_html`.
4. Visit your domain to confirm.

### Netlify
1. Drag-and-drop the `malwa-tec-services` folder onto https://app.netlify.com/drop, **or**
2. Push the folder to a Git repository and connect it in Netlify with build command left blank and publish directory set to the project root.

### Vercel
1. Push the folder to a Git repository.
2. Import the repo in Vercel, set the framework preset to "Other", leave build command blank, and set the output directory to the project root.

### GitHub Pages
1. Push the folder to a repository.
2. In repository Settings → Pages, set the source to the branch/root containing `index.html`.

All internal links use relative paths (`about.html`, `css/style.css`, etc.), so the site works the same on any of the above.

## 8. Before going live — important notes

- Replace **all** placeholder images (hero, services, team, gallery) with real photos.
- Replace the 6 dummy client logos only after receiving explicit permission from real clients.
- Replace the 4 technician placeholder names/photos and the owner photo with real details.
- Add real certificate images for the government pest control licence and MSME certification in `about.html` (currently marked with dashed placeholder boxes).
- Replace the Google Maps placeholder in `contact.html` with a real embed URL for your address (an example `<iframe>` line is commented directly above the placeholder block).
- Connect the contact form to a live endpoint (see Section 5) — until then it will not send real emails, by design.
- Add real publication/last-updated dates on the blog page (`blog-termite-management.html`) and update the `datePublished`/`dateModified` values in its JSON-LD script.
- Have the Privacy Policy and Terms & Conditions pages reviewed (legal counsel if possible) before publishing, since they're provided as customizable templates.
- Confirm with the business whether "Weed Control" should remain listed as a service — it's marked in `services.html` and `contact.html` as needing confirmation before launch.

## 9. Notes on the accessibility & interaction features already built in

- Sticky header, mobile hamburger menu, keyboard-accessible nav
- FAQ accordions (home + blog) built with buttons and `aria-expanded`
- Gallery category filter + keyboard-accessible lightbox with Prev/Next/Escape support
- Floating WhatsApp and Call buttons, plus a back-to-top button
- `prefers-reduced-motion` is respected — animations are disabled for users who request it
- All CTAs are functional links (`tel:`, `https://wa.me/`, `mailto:`, or real page links) — nothing is a dead/decorative button
