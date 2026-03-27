# Quick Start: Deploy to veteran.aitomate.cloud

## TL;DR — The Essentials

You have:
- ✅ A GitHub Actions workflow that auto-deploys on every push to `master`
- ✅ A landing page ready for production (`index.html` + `brand_assets/`)
- ⏳ Need to do: Configure Hostinger subdomain and GitHub Secrets

---

## 5-Minute Setup (Do This Now)

### Step 1: Create Subdomain (2 min)
1. hPanel → **Hosting** → **Subdomains**
2. Create: `veteran` on `aitomate.cloud`

### Step 2: Get FTP Credentials (1 min)
1. hPanel → **FTP Accounts** → **Create FTP Account**
2. Username: `veteran-deploy`
3. Directory: `/home/u[ID]/domains/veteran.aitomate.cloud/public_html`
4. Save password somewhere

### Step 3: Add GitHub Secrets (2 min)
1. Go to: `https://github.com/umeshsureban/Veteran/settings/secrets/actions`
2. Create 4 secrets:
   - `FTP_HOST` = `files.hostinger.com` (or hostname from hPanel)
   - `FTP_USERNAME` = `veteran-deploy@aitomate.cloud`
   - `FTP_PASSWORD` = (the password you just saved)
   - `FTP_SERVER_DIR` = `/home/u[ID]/domains/veteran.aitomate.cloud/public_html/`

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

# That's it! GitHub Actions automatically deploys within 30 seconds.
```

---

## Need More Details?

See **`DEPLOYMENT_SETUP.md`** for:
- Detailed step-by-step walkthrough
- Troubleshooting common issues
- How to verify everything works
- Testing incremental deployments

---

## Deployed Files

**Only these reach the server:**
- `index.html` (the landing page)
- `brand_assets/Favicon_Logo.svg`
- `brand_assets/Hero_logo.svg`
- `brand_assets/Nav_LogoNoBG.svg`
- `brand_assets/Sravan_noBG.svg`
- `brand_assets/flat logo.svg`

**Everything else stays private** (dev docs, git config, node_modules excluded by `.gitignore`).

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

## Common Issues

**Website not loading?**
- Wait 5 min for DNS propagation
- Check Actions log for deployment errors

**FTP connection failed?**
- Double-check `FTP_SERVER_DIR` ends with `/`
- Try the specific FTP hostname from hPanel (not just `files.hostinger.com`)

**SVG images not showing (404)?**
- Check Files were uploaded in Actions log
- Verify all SVG files exist in hPanel File Manager

---

**Questions?** Refer to `DEPLOYMENT_SETUP.md` — it has answers to all common issues.
