# VETERAN NextGen Academy — Landing Page

Static landing page for **Sravan Kumar's** Class 10 tutoring business. Ex-Indian Air Force officer, CBSE board specialist.

**Live site:** https://veteran.aitomate.cloud  
**GitHub:** https://github.com/umeshsureban/Veteran

---

## Stack

- Plain HTML + inline CSS — no build step, no npm required for the site itself
- [Tailwind CSS](https://tailwindcss.com/) via CDN
- [Three.js r128](https://threejs.org/) via CDN (GLSL Hills hero animation)
- Google Fonts: Playfair Display + Sora

---

## Local Development

```bash
node serve.mjs
```

Opens at `http://localhost:3000`. The server is a minimal Node.js HTTP server (see `serve.mjs`).

### Taking screenshots

```bash
node screenshot.mjs http://localhost:3000
```

Screenshots save to `./temporary screenshots/` (auto-incremented filenames).

---

## Deployment

Pushes to `master` auto-deploy via GitHub Actions (`.github/workflows/deploy.yml`) using **rsync over SSH** to the Hostinger VPS at `72.60.103.200`.

### Required GitHub Secrets

| Secret | Value |
|---|---|
| `SSH_PRIVATE_KEY` | Private key for VPS access |
| `SSH_HOST` | `72.60.103.200` |
| `SSH_USERNAME` | VPS SSH user (e.g. `root`) |
| `SSH_TARGET_DIR` | Absolute path to subdomain document root on VPS |

Monitor deployments at: https://github.com/umeshsureban/Veteran/actions

---

## Project Structure

```
Veteran/
├── index.html              # Main landing page
├── brand_assets/
│   ├── Nav_LogoNoBG.svg        # Navbar logo
│   ├── Hero_logo.svg           # Hero section logo
│   ├── Favicon_Logo.svg        # Favicon
│   ├── Sravan_noBG.svg         # Headshot image
│   ├── testimonial1.jpeg       # Testimonial photo — Fadilah Fatmi
│   ├── testimonial2.png        # Testimonial photo — Dimple
│   └── testimonial3.png        # Testimonial photo — Ashritha
├── robots.txt
├── sitemap.xml
├── serve.mjs               # Dev server (gitignored)
└── screenshot.mjs          # Screenshot tool (gitignored)
```

---

## Design System

CSS custom properties defined in `:root`:

| Variable | Value | Usage |
|---|---|---|
| `--gold` | `#D4AF37` | Primary accent, CTA buttons |
| `--navy` | `#060E1A` | Dark backgrounds, navigation |
| `--charcoal` | `#111318` | Footer, body text |
| `--white` | `#FFFFFF` | Light backgrounds, contrast text |

Typography: **Playfair Display** (headings, weight 800) + **Sora** (body, weight 300–600)

---

## UI Features

- **Floating social bar** — fixed to the left side, vertically centered; links to WhatsApp, Instagram, YouTube, LinkedIn, Facebook with hover tooltips
- **Scroll-to-top button** — fixed bottom-right, appears after scrolling 400px
- **Testimonial carousel** — auto-scrolling with photo cards (Fadilah, Dimple, Ashritha)
- **GLSL Hills animation** — WebGL hero background via Three.js
- **Scroll-reveal** — IntersectionObserver fade-in on section cards

---

## Contact

**Sravan Kumar** — +91-8619510953  
WhatsApp: https://wa.me/918619510953
