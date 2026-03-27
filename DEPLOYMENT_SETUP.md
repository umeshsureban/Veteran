# Deployment Setup Guide: veteran.aitomate.cloud via GitHub Actions → Hostinger

## Status: Ready to Configure

✅ **Repository:** Cleaned and pushed to GitHub
✅ **GitHub Actions Workflow:** Created and committed (`.github/workflows/deploy.yml`)
⏳ **Next Steps:** Manual Hostinger & GitHub Secrets setup required

---

## Step 1: Create Subdomain on Hostinger (hPanel)

### 1.1 Log Into hPanel
- Go to: `https://hpanel.hostinger.com`
- Log in with your credentials

### 1.2 Create the Subdomain
1. Navigate to: **Hosting** → select your `aitomate.cloud` hosting plan → **Subdomains**
2. Click **Create a Subdomain**
3. Fill in the form:
   - **Subdomain name:** `veteran`
   - **Domain:** `aitomate.cloud` (auto-selected)
   - **Document root:** Auto-fills as `/home/u[ID]/domains/veteran.aitomate.cloud/public_html`
4. Click **Create**
5. Wait 1–5 minutes for DNS to propagate

You can test that it's live with: `ping veteran.aitomate.cloud`

---

## Step 2: Get FTP Credentials for GitHub Actions

### Option A: Use Your Main FTP Account (Quick, Less Secure)
1. hPanel → **Hosting** → **FTP Accounts**
2. Find your main FTP account (usually `u[ID]` or your username)
3. Note these details:
   - **Host:** Usually `files.hostinger.com` (or check the page for exact value)
   - **Username:** `u[ID]` or your main FTP username
   - **Password:** Your main FTP password
   - **Server Directory:** `/home/u[ID]/domains/veteran.aitomate.cloud/public_html/`

### Option B: Create a Dedicated FTP Account for CI/CD (Recommended — More Secure)
1. hPanel → **Hosting** → **FTP Accounts** → **Create FTP Account**
2. Fill in:
   - **Username:** `veteran-deploy`
   - **Password:** Generate a strong one (copy it immediately — shown only once)
   - **Directory:** `/home/u[ID]/domains/veteran.aitomate.cloud/public_html`
3. Click **Create**
4. Note the FTP host shown on the page (e.g., `files.hostinger.com` or `srv123.hostinger.com`)

**You will now have:**
- FTP Host (e.g., `files.hostinger.com`)
- FTP Username (e.g., `veteran-deploy@aitomate.cloud`)
- FTP Password (the one you just created)
- FTP Server Directory: `/home/u[ID]/domains/veteran.aitomate.cloud/public_html/` (trailing slash required)

---

## Step 3: Add GitHub Secrets for CI/CD

### 3.1 Navigate to GitHub Secrets
1. Go to: `https://github.com/umeshsureban/Veteran/settings/secrets/actions`
2. Click **New repository secret** for each secret below

### 3.2 Create Four Repository Secrets

| Secret Name | Value | Example |
|---|---|---|
| `FTP_HOST` | FTP host from hPanel | `files.hostinger.com` |
| `FTP_USERNAME` | FTP username | `veteran-deploy@aitomate.cloud` |
| `FTP_PASSWORD` | FTP password | `(generated secure password)` |
| `FTP_SERVER_DIR` | Server directory path with trailing slash | `/home/u123456789/domains/veteran.aitomate.cloud/public_html/` |

**Important:** These secrets are encrypted by GitHub and will never appear in logs or be visible to anyone without admin access to this repository.

---

## Step 4: Verify Everything is Ready

Run this command in your local repo to confirm the workflow file is correct:

```bash
cat .github/workflows/deploy.yml
```

Expected output should show the FTP deployment workflow with the secrets properly referenced.

---

## Step 5: Trigger the First Deployment

The workflow automatically triggers on every push to `master`. Since we just pushed the workflow file, the first deployment may have already started.

### Monitor the Deployment
1. Go to: `https://github.com/umeshsureban/Veteran/actions`
2. Click on the "Deploy to Hostinger (veteran.aitomate.cloud)" run
3. Expand the **"Deploy via FTP to Hostinger"** step
4. Watch as files are uploaded (verbose logging shows each file)

### Expected First Run Output
```
Uploading index.html
Uploading brand_assets/Favicon_Logo.svg
Uploading brand_assets/Hero_logo.svg
Uploading brand_assets/Nav_LogoNoBG.svg
Uploading brand_assets/Sravan_noBG.svg
Uploading brand_assets/flat logo.svg
```

**If the workflow shows as "waiting" or "queued":** The GitHub Actions runner will pick it up momentarily. These free runners are usually available within seconds.

**If the workflow fails with a connection error:** Double-check the FTP credentials. The most common issue is:
- `FTP_SERVER_DIR` path is incorrect or missing trailing slash
- `FTP_HOST` is wrong (try the server-specific hostname from hPanel instead of `files.hostinger.com`)
- Credentials are typo'd

---

## Step 6: Verify the Website is Live

### 6.1 Open the Website
1. Open `https://veteran.aitomate.cloud` in your browser
2. You should see the VETERAN NextGen Academy landing page with:
   - Navy navigation bar with logo
   - Hero section with Sravan's headshot SVG image
   - Results section with three metric cards
   - Teaching methodology cards
   - Background/about section
   - CTA section with contact buttons
   - Footer

### 6.2 Verify Assets Loaded
1. Open **DevTools** (F12 or Ctrl+Shift+I)
2. Go to the **Network** tab
3. Reload the page
4. Check that all SVG files have status **200**:
   - `Favicon_Logo.svg`
   - `Hero_logo.svg`
   - `Nav_LogoNoBG.svg`
   - `Sravan_noBG.svg`
   - `flat logo.svg`

If any asset shows **404**, the FTP directory path or upload failed.

### 6.3 Test Responsive Design
1. In DevTools, toggle **Device Toolbar** (Ctrl+Shift+M)
2. Select **iPhone 12** or any mobile device (768px breakpoint)
3. Verify the layout stacks correctly:
   - Navigation wraps
   - Hero content and image stack vertically, centered
   - Cards remain responsive

### 6.4 Test Interactive Elements
1. Click the **"Enroll Now"** button → should scroll to CTA section
2. Click the **"Chat on WhatsApp"** button → should open WhatsApp to `8619510953`
3. Click **"WhatsApp Enquiry"** in nav → same as above
4. Click **"Call Now"** button → should prompt to call `8619510953`
5. Hover over nav links → should show gold underline animation
6. Hover over buttons → should see color/shadow transitions

---

## Step 7: Test Incremental Deployments

To verify that the workflow only uploads changed files (not all files every time):

### 7.1 Make a Small Change
1. Edit `index.html` locally (e.g., change "Sravan Kumar" heading color from white to light gray)
2. Save and commit:
   ```bash
   git add index.html
   git commit -m "test: change heading color for deployment verification"
   git push origin master
   ```

### 7.2 Monitor the Deployment
1. Go to **Actions** on GitHub
2. Watch the deployment log
3. You should see:
   ```
   Uploading index.html
   (no other files uploaded)
   ```

This confirms the workflow uses incremental FTP sync—it only uploads files that changed.

### 7.3 Revert the Test Change
1. Undo your change to `index.html` and push again:
   ```bash
   git restore index.html
   git add index.html
   git commit -m "revert: undo heading color test"
   git push origin master
   ```

---

## Optional: Enable HTTPS/SSL

After the subdomain is live and working, enable the free SSL certificate:

1. hPanel → **Hosting** → **SSL**
2. Find `veteran.aitomate.cloud` and click **Install**
3. Select **Let's Encrypt** (free)
4. Check **Force HTTPS Redirect** to auto-redirect HTTP to HTTPS

This usually takes 5–15 minutes to activate.

---

## Troubleshooting

### Issue: GitHub Actions Workflow Failed

**Check the Actions log:**
1. Go to `https://github.com/umeshsureban/Veteran/actions`
2. Click the failed run
3. Expand **"Deploy via FTP to Hostinger"** to see the error

**Common errors and fixes:**

| Error | Cause | Fix |
|---|---|---|
| `Connection refused` | FTP host is wrong | Check exact FTP host in hPanel; try `srv[N].hostinger.com` format |
| `550 Permission denied` | Wrong directory path or credentials | Verify `FTP_SERVER_DIR` ends with `/` and matches hPanel File Manager path |
| `530 Login incorrect` | Wrong username or password | Re-check FTP credentials in hPanel; recreate account if unsure |
| `0 files uploaded` | All files were already on server | This is normal on subsequent runs — only changed files upload |

### Issue: Website Shows Old Content

**The .ftp-deploy-sync-state.json file tracks what's deployed.** If you need to force a full re-upload:
1. Go to hPanel → **File Manager**
2. Navigate to `/domains/veteran.aitomate.cloud/public_html/`
3. Delete the `.ftp-deploy-sync-state.json` file
4. Push an empty commit or make a small change and push:
   ```bash
   git commit --allow-empty -m "trigger: force full redeployment"
   git push origin master
   ```

### Issue: SVG Files Not Loading (404 Errors)

1. Check the **Network** tab in DevTools — note the URL of the failing request
2. Go to hPanel → **File Manager** → navigate to `/domains/veteran.aitomate.cloud/public_html/brand_assets/`
3. Verify all 5 SVG files are there
4. If missing:
   - The FTP upload failed; check the Actions log for errors
   - Manually upload them via hPanel File Manager as a quick fix

### Issue: Site Works Locally but Not on Domain

Likely causes:
1. DNS hasn't fully propagated (wait 10 minutes and try again)
2. Files didn't upload (check Actions log)
3. Wrong subdomain created in hPanel
4. Browser cache (do a hard refresh: Ctrl+Shift+R or Cmd+Shift+R)

---

## How the Workflow Works

Every time you push to `master`:

1. GitHub Actions checks out your code
2. Connects to your FTP server using the secrets
3. Compares local files with what's on the server (via `.ftp-deploy-sync-state.json`)
4. Uploads only files that changed or are new
5. Excludes all files listed in the `exclude` block of the workflow YAML
6. Updates `.ftp-deploy-sync-state.json` on the server to track state for next run

This means:
- Fast deployments (incremental, not full sync)
- Only production files reach the server (`index.html` + `brand_assets/`)
- Dev files (CLAUDE.md, PDFs, screenshots) never deploy
- Subsequent pushes are faster than the first

---

## Files Deployed

Only these files reach the server via FTP:

```
public_html/
├── index.html                        (main landing page)
└── brand_assets/
    ├── Favicon_Logo.svg
    ├── Hero_logo.svg
    ├── Nav_LogoNoBG.svg
    ├── Sravan_noBG.svg               (hero headshot image)
    └── flat logo.svg
```

Everything else (CLAUDE.md, SRAVAN_PROFILE.md, .gitignore, .github/, etc.) stays in the repo but never uploaded to Hostinger.

---

## Summary Checklist

- [ ] Created subdomain `veteran` on `aitomate.cloud` in hPanel
- [ ] Got FTP credentials (host, username, password, directory path)
- [ ] Added 4 GitHub Secrets (FTP_HOST, FTP_USERNAME, FTP_PASSWORD, FTP_SERVER_DIR)
- [ ] Verified workflow file at `.github/workflows/deploy.yml` exists
- [ ] First deployment ran (check Actions page)
- [ ] Website loads at `https://veteran.aitomate.cloud`
- [ ] All SVG assets return 200 (check Network tab)
- [ ] Responsive design works (test at 768px)
- [ ] Contact buttons work (WhatsApp, phone)
- [ ] Made a test change, pushed, and saw incremental upload work
- [ ] (Optional) Enabled SSL/HTTPS

---

## Questions?

Refer to:
- **Deployment workflow:** `.github/workflows/deploy.yml`
- **Git history:** `git log --oneline` (shows all deployment commits)
- **Hostinger docs:** https://www.hostinger.com/help/
- **GitHub Actions docs:** https://docs.github.com/en/actions
