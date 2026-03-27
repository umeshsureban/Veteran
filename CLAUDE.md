# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static landing page for VETERAN NextGen Academy, featuring Sravan Kumar's tutoring business. It's a single-file HTML application with inline CSS and no build process. The site showcases academic results, teaching methodology, and contact information for prospective students.

## Getting Started

### Running the Site Locally
- Use `node serve.mjs` to start a dev server at `http://localhost:3000`
- This serves the project root directly (no build step needed)
- The server runs in the background; no need to start multiple instances

### Taking Screenshots
- Use `node screenshot.mjs http://localhost:3000` to capture the page
- Screenshots save to `./temporary screenshots/screenshot-N.png` (auto-incremented)
- Optional label: `node screenshot.mjs http://localhost:3000 label-name` → `screenshot-N-label-name.png`
- Always screenshot from localhost, never from `file:///` URLs
- Compare screenshots against references using specific measurements: font sizes, spacing, hex colors, etc.

## Architecture & Structure

### Single-File Design
- **index.html** contains all HTML, CSS (inline `<style>` block), and linking to external CDN libraries
- No component files, no build step, no dependencies to install
- Tailwind CSS loaded via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Google Fonts loaded for typography: Playfair Display (headings), Sora (body)

### CSS Custom Properties (Design System)
Located in `:root` selector:
- `--gold: #D4AF37` (primary accent, call-to-action buttons)
- `--gold-dark: #B8860B` (darker gold variant)
- `--navy: #0F2542` (primary dark color, navigation, backgrounds)
- `--charcoal: #1a1a1a` (text, footer)
- `--white: #FFFFFF` (backgrounds, text contrast)
- `--light-gray: #F5F5F5` (section backgrounds)
- `--accent: #2E5090` (secondary blue for gradients)

Use these variables throughout custom CSS—do not invent new colors or use Tailwind defaults.

### Page Sections

1. **Navigation** (`nav` element)
   - Fixed position, blur effect, semi-transparent navy background
   - Logo image on left, navigation links + CTA button on right
   - Hover states: gold underline animation on links, inverted button on CTA
   - Mobile: wraps at 768px breakpoint

2. **Hero Section** (`section.hero`)
   - Full-viewport height with gradient background (navy to teal)
   - Two-column grid: content left, headshot image right
   - Contains: logo, badge, heading, subtitle, paragraph, credentials, two action buttons
   - Animated floating circles in background (gold radial gradients)
   - Animated fighter plane emoji (✈️) flies across screen continuously
   - Mobile: stacks to single column, center-aligned

3. **Results Section** (`section.results`)
   - Light gray background
   - Three metric cards with gold top border
   - Hover effect: translateY up, shadow with gold tint
   - Responsive grid: auto-fit with 250px min width

4. **Teaching Methodology** (`section.methodology`)
   - Five method cards with navy-to-accent gradient
   - Gold heading text, white body text
   - Radial gradient decoration in top-right corner (non-interactive)
   - Staggered animations on load (0.1s–0.5s delays)

5. **Background Section** (`section.background`)
   - Light gradient background
   - Two-column layout: text left, icon box right
   - Icon box: gold gradient with flying emoji
   - Contains experience badges with left gold border
   - Mobile: stacks to single column

6. **CTA Section** (`section.cta`)
   - Navy gradient background with floating gold circle animation
   - Centered heading and paragraph
   - Two contact buttons (WhatsApp, phone)
   - Position relative, z-index layering for overlays

7. **Footer** (`footer`)
   - Charcoal background
   - Three-column grid with section headers
   - Footer links to social media and tutor platforms
   - Mobile: auto-fit grid

### Typography

- **Headings (h1–h3):** Playfair Display, weight 800, tight letter-spacing (-0.02em), color navy or white depending on background
- **Body Text:** Sora, weight 300–500, 1.6–1.8 line-height, charcoal or white
- **Small Caps:** Sora, weight 600–700, uppercase, 0.05em letter-spacing (used in badges, footer section titles)

### Animations

All animations use CSS `@keyframes`:
- **float:** translateY movement over 20–25s, infinite loop (used on background circles)
- **slideUp:** opacity 0→1 + translateY -40px→0, 1s ease-out (used on hero and section content)
- **slideInLeft:** opacity 0→1 + translateX -60px→0, 1s ease-out (hero image)
- **flyAcross:** left -100px→110%, 8s ease-in-out, infinite (fighter plane)

Staggered animation-delay applied to card groups (0.1s, 0.2s, 0.3s, etc.).

### Interactive States

- **Buttons:** All `.btn`, `.nav-cta`, `.contact-btn` have hover states
  - Primary buttons: gold background → transparent with gold text/border
  - Secondary buttons: transparent border → white fill with navy text
  - All button hovers include `transform: translateY(-3px)` and shadow
- **Links:** nav links fade to gold on hover, gold underline animates in via `::after` pseudo-element
- **Cards:** hover translateY(-8px to -10px) with shadow enhancement
- **No hover effects on mobile:** Use @media to disable on small screens if needed

## Brand Assets

Located in `/brand_assets/`:
- `Nav_LogoNoBG.svg` — Navigation bar logo (40px height)
- `Hero_logo.svg` — Large hero section logo (130px max-width)
- `Favicon_Logo.svg` — Favicon in head
- `Sravan_noBG.svg` — Hero headshot image (400px max-width, 3:4 aspect ratio)
- `flat logo.svg` — Unused variant

Always use existing SVG assets; do not replace with placeholders unless explicitly told.

## Responsive Design

### Mobile Breakpoint: 768px

**Navigation:** Flex wraps, font-size reduces to 0.8rem, gap narrows

**Hero:**
- Grid switches to single column
- Content center-aligned
- Credentials flex-direction wraps
- Buttons stack vertically
- Headshot max-width: 300px (from 400px)
- Fighter plane hidden with `display: none`

**Sections:** Padding reduces from 5rem 2rem → 3rem 1.5rem

**Background:** Grid stacks to single column

**Cards:** Continue responsive grid with auto-fit minmax

## Common Tasks

### Editing Content
1. Update text in section headings, paragraphs, or cards directly in the HTML
2. Replace images by changing `src` attributes (use existing brand assets)
3. Change colors by modifying CSS custom properties at `:root`
4. Adjust spacing via `padding`, `gap`, `margin` CSS properties

### Adding a New Section
1. Create a new `<section>` element with semantic class name
2. Add padding: `5rem 2rem` (standard section padding)
3. Add responsive breakpoint at 768px if needed
4. Follow animation pattern: use `@keyframes` from top of file, apply `animation-delay` to staggered elements
5. Use existing color variables and gradient patterns

### Modifying Animations
- All `@keyframes` defined at top of `<style>` block (line 153–196)
- Adjust duration, delay, or easing in animation shorthand
- Test on localhost and screenshot to verify smoothness

### Changing Contact Information
- Update WhatsApp number in all instances: `href="https://wa.me/[NUMBER]"`
- Update phone number in CTA section and footer
- Replace social media links in footer (Instagram, YouTube, etc.)

## Testing & QA

- Always test on localhost before considering changes complete
- Screenshot at desktop (default 1440×900) and mobile (768px and below)
- Check all hover states on buttons and links
- Verify animations loop smoothly and don't stutter
- Test all external links (WhatsApp, phone, social media) open correctly
- Ensure brand assets display without 404 errors

## Notes

- No build process, no npm install, no dependencies beyond CDN libraries
- Single HTML file keeps development simple but limits code reuse
- Animations are GPU-friendly (only transform/opacity); never add transition-all
- Color scheme is custom gold + navy; do not deviate to Tailwind defaults
- All responsive behavior handled via CSS media queries, no JavaScript frameworks
