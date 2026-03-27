# Quick Start: Deploy to veteran.aitomate.cloud (SFTP)

## TL;DR — The Essentials

You have:
- ✅ A GitHub Actions workflow that auto-deploys via SFTP to your Hostinger VPS on every push to `master`
- ✅ A landing page ready for production (`index.html` + `brand_assets/`)
- ✅ VPS connection details: `72.60.103.200:22` (SFTP)
- ⏳ Need to do: Create subdomain and add GitHub Secrets

---

## 5-Minute Setup (Do This Now)

### Step 1: Create Subdomain (2 min)
1. hPanel → **Hosting** → **Subdomains**
2. Create: `veteran` on `aitomate.cloud`
3. Note the document root path shown (you'll need it in Step 3)

### Step 2: Get VPS SSH Credentials (1 min)
1. hPanel → **Hosting** → **SSH Access** (or similar)
2. Find your:
   - **SSH Username** (e.g., `root` or `u123456789`)
   - **SSH Password** (your VPS password)
3. Save these somewhere

### Step 3: Add GitHub Secrets (2 min)
1. Go to: `https://github.com/umeshsureban/Veteran/settings/secrets/actions`
2. Create 3 secrets:
   - `SFTP_USERNAME` = your VPS SSH username
   - `SFTP_PASSWORD` = your VPS SSH password
   - `SFTP_TARGET_DIR` = `/home/u[ID]/public_html/veteran.aitomate.cloud/` (the path from Step 1, with trailing `/`)

### Step 4: Check Deployment
1. Go to: `https://github.com/umeshsureban/Veteran/actions`
2. Wait for the workflow to complete (usually < 30 seconds)
3. Open `https://veteran.aitomate.cloud` in browser

---

## How to Update the Website

After setup, it's super simple:

```bash
# 1. Make your changes in VSCode
# 2. Commit and push
git add index.html
git commit -m "update: change hero text"
git push origin master

# That's it! GitHub Actions automatically deploys via SFTP within 30 seconds.
```

---

## Need More Details?

See **`DEPLOYMENT_SETUP.md`** for:
- Detailed step-by-step walkthrough (with screenshots tips)
- How to find your VPS SSH credentials
- How to determine your document root path
- Troubleshooting common issues
- How to verify everything works
- Testing incremental deployments

---

## Deployed Files

**Only these reach the VPS:**
- `index.html` (the landing page)
- `brand_assets/Favicon_Logo.svg`
- `brand_assets/Hero_logo.svg`
- `brand_assets/Nav_LogoNoBG.svg`
- `brand_assets/Sravan_noBG.svg`
- `brand_assets/flat logo.svg`

**Everything else stays private** (dev docs, git config, PDFs excluded by `.gitignore`).

---

## Quick Links

| What | Where |
|---|---|
| Deployment guide | `DEPLOYMENT_SETUP.md` in repo |
| Workflow config | `.github/workflows/deploy.yml` |
| GitHub Actions | https://github.com/umeshsureban/Veteran/actions |
| GitHub Secrets | https://github.com/umeshsureban/Veteran/settings/secrets/actions |
| Live website | https://veteran.aitomate.cloud |
| Hostinger hPanel | https://hpanel.hostinger.com |

---

## VPS Connection Details

Your Hostinger VPS uses **SFTP** (Secure File Transfer):
- **Host:** `72.60.103.200`
- **Port:** `22` (standard SSH)
- **Protocol:** SFTP (SSH encrypted — more secure than FTP)
- **Auth:** SSH username + password

---

## Common Issues

**Website not loading?**
- Wait 5 min for DNS propagation
- Check Actions log for deployment errors

**SFTP connection failed?**
- Verify `SFTP_USERNAME` and `SFTP_PASSWORD` are correct
- Test locally: `ssh u[ID]@72.60.103.200` (should prompt for password)
- Verify `SFTP_TARGET_DIR` ends with `/`

**SVG images not showing (404)?**
- Check Files were uploaded in Actions log
- Verify all SVG files exist in hPanel File Manager under your subdomain

---

**Questions?** Refer to `DEPLOYMENT_SETUP.md` — it has answers to all common issues and a full walkthrough.
