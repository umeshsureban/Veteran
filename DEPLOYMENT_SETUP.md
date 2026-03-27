# Deployment Setup Guide: veteran.aitomate.cloud via GitHub Actions → Hostinger VPS (SFTP)

## Status: Ready to Configure

✅ **Repository:** Cleaned and pushed to GitHub
✅ **GitHub Actions Workflow:** Created and committed (`.github/workflows/deploy.yml`)
⏳ **Next Steps:** Manual Hostinger & GitHub Secrets setup required

---

## VPS Connection Details

Your Hostinger VPS uses **SFTP** (Secure File Transfer Protocol) — more secure than FTP:

- **Host:** `72.60.103.200`
- **Port:** `22` (standard SSH)
- **Protocol:** SFTP (SSH encrypted)
- **Authentication:** SSH username + password OR SSH key

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
   - **Document root:** Auto-fills (note this path — you'll need it for Step 2)
4. Click **Create**
5. Wait 1–5 minutes for DNS to propagate

You can test that it's live with: `ping veteran.aitomate.cloud`

---

## Step 2: Get Your VPS SSH Credentials

You need your VPS SSH username and password to connect via SFTP.

### 2.1 Find Your SSH Credentials in hPanel

1. hPanel → **Hosting** → your plan
2. Look for one of these sections:
   - **SSH Access** or **SSH/Terminal Access**
   - **Advanced** → **SSH**
   - **Server Information**
3. You should see:
   - **SSH Host:** `72.60.103.200` (already known)
   - **SSH Port:** `22` (already known)
   - **SSH Username:** `root` or a custom username (e.g., `u123456789`)
   - **SSH Password:** Your VPS password

4. **Save these credentials somewhere safe** — you'll need them in Step 3

### 2.2 Determine Your Document Root Path

When you created the subdomain, hPanel assigned a document root path. You need to find it:

1. hPanel → **Hosting** → **File Manager**
2. Navigate to your subdomain folder: you should see something like:
   ```
   /home/u[ID]/public_html/veteran.aitomate.cloud/
   ```
   Or:
   ```
   /home/u[ID]/domains/veteran.aitomate.cloud/public_html/
   ```
3. Note the **full path** shown in the File Manager address bar
4. Add a trailing slash: `/home/u[ID]/public_html/veteran.aitomate.cloud/`

This is your `SFTP_TARGET_DIR`.

---

## Step 3: Add GitHub Secrets for CI/CD

### 3.1 Navigate to GitHub Secrets
1. Go to: `https://github.com/umeshsureban/Veteran/settings/secrets/actions`
2. Click **New repository secret** for each secret below

### 3.2 Create Three Repository Secrets

| Secret Name | Value | Example |
|---|---|---|
| `SFTP_USERNAME` | Your VPS SSH username | `root` or `u123456789` |
| `SFTP_PASSWORD` | Your VPS SSH password | `(your VPS password)` |
| `SFTP_TARGET_DIR` | Full document root path (with trailing slash) | `/home/u123456789/public_html/veteran.aitomate.cloud/` |

**Important:** These secrets are encrypted by GitHub and will never appear in logs or be visible to anyone without admin access to this repository.

---

## Step 4: Verify Everything is Ready

Run this command in your local repo to confirm the workflow file is correct:

```bash
cat .github/workflows/deploy.yml
```

Expected output should show:
- `host: 72.60.103.200`
- `port: 22`
- `source: "index.html,brand_assets/"`
- References to `SFTP_USERNAME`, `SFTP_PASSWORD`, `SFTP_TARGET_DIR`

---

## Step 5: Trigger the First Deployment

The workflow automatically triggers on every push to `master`. Since we just updated the workflow file, pushing it will trigger the first deployment.

### 5.1 Commit and Push the Updated Workflow

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: update to SFTP deployment for Hostinger VPS"
git push origin master
```

### 5.2 Monitor the Deployment
1. Go to: `https://github.com/umeshsureban/Veteran/actions`
2. Click on the "Deploy to Hostinger VPS (veteran.aitomate.cloud)" run
3. Expand the **"Deploy via SFTP to Hostinger VPS"** step
4. Watch as files are uploaded

### Expected First Run Output
```
Transferring files to 72.60.103.200:22
Uploading index.html
Uploading brand_assets/Favicon_Logo.svg
Uploading brand_assets/Hero_logo.svg
Uploading brand_assets/Nav_LogoNoBG.svg
Uploading brand_assets/Sravan_noBG.svg
Uploading brand_assets/flat logo.svg
Transfer complete
```

**If the workflow shows as "waiting" or "queued":** The GitHub Actions runner will pick it up momentarily. These free runners are usually available within seconds.

**If the workflow fails with a connection error:** Double-check the secrets:
- `SFTP_USERNAME` and `SFTP_PASSWORD` are correct for your VPS
- `SFTP_TARGET_DIR` path is correct and ends with `/`
- Verify credentials work by testing SSH connection: `ssh u[ID]@72.60.103.200` (should prompt for password)

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

If any asset shows **404**, the files may not have uploaded correctly. Check the Actions log for errors.

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

To verify that the workflow deploys correctly on subsequent pushes:

### 7.1 Make a Small Change
1. Edit `index.html` locally (e.g., change a color or text)
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
   Transferring files to 72.60.103.200:22
   Uploading index.html
   Transfer complete
   ```

This confirms the workflow uploads only changed files.

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
3. Expand **"Deploy via SFTP to Hostinger VPS"** to see the error

**Common errors and fixes:**

| Error | Cause | Fix |
|---|---|---|
| `Connection refused` | Wrong host or port | Verify host is `72.60.103.200` and port is `22` |
| `Authentication failed` | Wrong username/password | Test locally: `ssh u[ID]@72.60.103.200` |
| `Permission denied` | Wrong directory path | Verify `SFTP_TARGET_DIR` in File Manager; must end with `/` |
| `0 files transferred` | All files were already on server | Normal on subsequent runs — only changed files upload |

### Issue: Website Shows Old Content

1. Force a full re-upload by making a change to a file:
   ```bash
   git commit --allow-empty -m "trigger: force deployment"
   git push origin master
   ```
2. Check the Actions log to see all files being transferred
3. Hard refresh the browser: `Ctrl+Shift+R` or `Cmd+Shift+R`

### Issue: SVG Files Not Loading (404 Errors)

1. Check the **Network** tab in DevTools — note the URL of the failing request
2. Go to hPanel → **File Manager** → navigate to your subdomain directory
3. Verify all 5 SVG files are there in `brand_assets/` subfolder
4. If missing:
   - The SFTP upload failed; check the Actions log for errors
   - Manually upload via hPanel File Manager as a quick fix

### Issue: Site Works Locally but Not on Domain

Likely causes:
1. DNS hasn't fully propagated (wait 10 minutes and try again)
2. Files didn't upload (check Actions log for errors)
3. Wrong subdomain created in hPanel
4. Browser cache (do a hard refresh: `Ctrl+Shift+R` or `Cmd+Shift+R`)

---

## How the Workflow Works

Every time you push to `master`:

1. GitHub Actions checks out your code
2. Connects to your VPS via SFTP (`72.60.103.200:22`)
3. Authenticates with your SSH username/password
4. Transfers `index.html` and `brand_assets/` folder to the subdomain directory
5. Overwrites any existing files
6. Completes and logs the result

This means:
- Fast deployments (only production files uploaded)
- Only `index.html` and `brand_assets/` reach the server
- Dev files (CLAUDE.md, PDFs, screenshots) never deploy
- Changes visible within seconds of pushing

---

## Files Deployed

Only these files reach the server via SFTP:

```
veteran.aitomate.cloud/
├── index.html                        (main landing page)
└── brand_assets/
    ├── Favicon_Logo.svg
    ├── Hero_logo.svg
    ├── Nav_LogoNoBG.svg
    ├── Sravan_noBG.svg               (hero headshot image)
    └── flat logo.svg
```

Everything else (CLAUDE.md, SRAVAN_PROFILE.md, .gitignore, .github/, etc.) stays in the repo but never uploaded to the VPS.

---

## Summary Checklist

- [ ] Created subdomain `veteran` on `aitomate.cloud` in hPanel
- [ ] Found your VPS SSH username and password
- [ ] Determined your document root path (`SFTP_TARGET_DIR`)
- [ ] Added 3 GitHub Secrets (SFTP_USERNAME, SFTP_PASSWORD, SFTP_TARGET_DIR)
- [ ] Updated workflow file with SFTP configuration
- [ ] Pushed changes to trigger first deployment
- [ ] First deployment ran (check Actions page)
- [ ] Website loads at `https://veteran.aitomate.cloud`
- [ ] All SVG assets return 200 (check Network tab)
- [ ] Responsive design works (test at 768px)
- [ ] Contact buttons work (WhatsApp, phone)
- [ ] Made a test change, pushed, and verified it deployed
- [ ] (Optional) Enabled SSL/HTTPS

---

## Questions?

Refer to:
- **GitHub Actions workflow:** `.github/workflows/deploy.yml`
- **Git history:** `git log --oneline` (shows all deployment commits)
- **Hostinger docs:** https://www.hostinger.com/help/
- **appleboy/scp-action:** https://github.com/appleboy/scp-action
