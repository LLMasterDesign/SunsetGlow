# Deployment Guide - Sunset Glow Lighting

## Quick Setup: Netlify + Git

### 1. Initialize Git Repository (if not already done)

```bash
# Navigate to project root
cd "X:\[OBSIDIAN]\[VAULTS]\SunsetGlow"

# Initialize git (if needed)
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit: Sunset Glow Lighting website"
```

### 2. Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named: `sunset-glow-lighting` (or your preferred name)
3. **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click "Create repository"

### 3. Link Local Repository to GitHub

```bash
# Add GitHub remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/LLarzMasterD/sunset-glow-jobs.git

# Or if you created a different repo:
# git remote add origin https://github.com/USERNAME/REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 4. Complete Netlify Setup

1. Go back to your Netlify dashboard: [https://app.netlify.com/projects/dreamy-profiterole-dcb73a](https://app.netlify.com/projects/dreamy-profiterole-dcb73a)

2. Click **"Link repository"** or **"Import from Git"**

3. Choose **GitHub** as your Git provider

4. Authorize Netlify (if prompted)

5. Select your repository: `LLarzMasterD/sunset-glow-jobs`

6. **Build settings** (Netlify should detect `netlify.toml` automatically):
   - **Branch to deploy:** `main`
   - **Build command:** *(leave blank or auto-detected)*
   - **Publish directory:** `SGL.Website`

7. Click **"Deploy site"**

### 5. Configure Custom Domain (Optional)

After first deployment:

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter: `sunsetglowlighting.com`
4. Follow DNS configuration instructions from your domain registrar

### 6. Automatic Deployments

✅ **Now configured!** Every time you commit and push to GitHub:

```bash
# Make changes to files
# ... edit files ...

# Stage changes
git add .

# Commit changes
git commit -m "Update: description of your changes"

# Push to GitHub (triggers automatic Netlify deploy)
git push
```

Netlify will automatically:
- Detect the push
- Build the site (using `netlify.toml` config)
- Deploy to production
- Update your live site in ~30 seconds

## Netlify Dashboard Features

- **Deploy log:** See build progress and any errors
- **Deploy previews:** Test changes before merging
- **Forms:** Your contact forms will work automatically (already configured with `data-netlify="true"`)
- **Analytics:** Track site visitors (optional upgrade)
- **Domain & HTTPS:** Automatic SSL certificates

## File Structure

```
SunsetGlow/
├── netlify.toml          # Netlify configuration (deploy settings)
├── .gitignore            # Files to exclude from Git
├── DEPLOYMENT.md         # This file
├── SGL.Website/          # → Published to Netlify
│   ├── index.html
│   ├── services.html
│   ├── about.html
│   ├── contact.html
│   ├── blog.html
│   ├── styles.css
│   ├── script.js
│   ├── _redirects       # Netlify redirects
│   ├── robots.txt
│   ├── sitemap.xml
│   └── favicon.svg
└── BackendOps/           # Not deployed (internal docs)
```

## Troubleshooting

### Build Fails
- Check **Deploy log** in Netlify dashboard
- Ensure `SGL.Website` directory exists
- Verify `netlify.toml` is in root directory

### Forms Not Working
- Ensure forms have `data-netlify="true"` attribute ✅ (already configured)
- Check **Forms** tab in Netlify dashboard
- Verify `action="/thanks.html"` paths are correct

### Changes Not Showing
- Check deploy status (may take 30-60 seconds)
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- Clear browser cache

### Domain Not Working
- DNS propagation can take 24-48 hours
- Verify DNS settings with your registrar
- Check SSL certificate status in Netlify

## Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Git Basics](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)

---

**Site:** Sunset Glow Lighting  
**Tech:** Static HTML/CSS/JS  
**Hosting:** Netlify  
**Forms:** Netlify Forms (built-in)

