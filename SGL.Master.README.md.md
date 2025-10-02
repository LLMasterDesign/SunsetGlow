# Sunset Glow Lighting - Master Project

**Live Site:** sunsetglowlighting.com  
**Status:** ✅ DEPLOYED (Netlify + Namecheap DNS)

Production-ready static website for Sunset Glow Lighting, a veteran-owned holiday lighting company in Princeton, TX.

## 🚀 Current Deployment

### ✅ LIVE on Netlify
- **Domain:** sunsetglowlighting.com (via Namecheap DNS)
- **Forms:** Netlify Forms enabled (Quote form with file upload)
- **Redirects:** www → apex, custom 404, thank-you page
- **SEO:** Sitemap, robots.txt, Open Graph, Twitter cards, LocalBusiness schema

### Local Development
1. Navigate to `SGL.Website/` folder
2. Open `index.html` in a modern browser (or use local server)
3. No build process required - pure HTML/CSS/JS

### Re-Deploy Updates
1. Push changes to GitHub (see Git Setup below)
2. Netlify auto-deploys on push to main branch
3. Or: Drag updated `SGL.Website/` folder to Netlify dashboard

## 📁 Project Structure
```
SunsetGlow/
├── SGL.Website/              # Public website (deployed to Netlify)
│   ├── index.html            # Homepage with modal estimate form
│   ├── services.html         # 4-tier packages (Basic/Enhanced/Premium/Custom)
│   ├── about.html            # Company story & veteran values
│   ├── contact.html          # Full contact form + FAQ
│   ├── blog.html             # Resources & tips
│   ├── service-book.html     # Service offerings overview
│   ├── thanks.html           # Thank-you page (post-form submission)
│   ├── 404.html              # Custom 404 with auto-redirect
│   ├── styles.css            # All styles (mobile-first, CSS variables)
│   ├── script.js             # Forms, validation, modals, navigation
│   ├── favicon.svg           # Brand favicon
│   ├── sitemap.xml           # SEO sitemap
│   ├── robots.txt            # Search engine directives
│   ├── _redirects            # Netlify redirects (www → apex)
│   └── CHANGELOG.md          # Detailed change log
│
├── BackendOps/               # Internal ops (NOT deployed publicly)
│   ├── BizDeck/              # Business planning & investor docs
│   │   ├── PricingBook.md           # Cost structure, margins, COGS
│   │   ├── PackageTierModel.md      # 60/80/120 ft standardized inventory theory
│   │   ├── PricingCalculator.csv    # Dynamic pricing spreadsheet
│   │   └── MultiYearRetentionEquation.md  # LTV/retention model for investors
│   ├── PropertyScraper/      # Property data enrichment
│   │   ├── README.md
│   │   └── internal-lookup-plan.md  # Manual lookup workflow
│   ├── ServiceBook/          # Internal spec for service offerings
│   │   ├── README.md
│   │   └── SPEC.prompt.txt
│   ├── Photos/               # Raw uploads, project images
│   ├── AdminDocs/            # Taxes, filings, policies
│   └── AmbiFlii/             # [Purpose TBD]
│
├── SGL.Intake.form.md        # Intake form template
└── SGL.Master.README.md.md   # This file
```
## ✅ Pre-Launch Checklist

### Content Updates
- [x] Replace placeholder email: hello@sunsetglowlighting.com
- [x] Replace placeholder phone: (555) 555-0199
- [x] Update package pricing (removed inline prices, conversation-based)
- [ ] Add real gallery photos to replace `.gallery-placeholder` divs
- [ ] Add owner/team photo to `about.html`
- [ ] Add blog post images to `blog.html`
- [ ] Update service area map on `contact.html`

### Technical Setup
- [x] Set up Netlify Forms (enabled with file upload support)
- [x] Add favicon and touch icons
- [x] Generate sitemap.xml and robots.txt
- [x] Add SEO meta tags (Open Graph, Twitter cards)
- [x] Add schema.org LocalBusiness markup
- [x] Create custom 404 page
- [x] Add thank-you page redirect
- [ ] Configure email notifications for form submissions (test forms first)
- [ ] Set up Google Analytics or tracking (optional)
- [ ] Add Google Places API for address autocomplete (optional)
- [ ] Set up newsletter integration (Mailchimp, ConvertKit, etc.)

### SEO Optimization
- [x] Verify all meta descriptions are accurate
- [x] Add schema.org markup for LocalBusiness
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Create and verify Google Business Profile
- [ ] Get listed in local directories

### Testing
- [ ] Test on mobile devices (iOS and Android)
- [ ] Test on tablets
- [ ] Test on desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] Run Lighthouse audit (target: 90+ on all metrics)
- [ ] Test form validation
- [ ] Test all links
- [ ] Check contrast ratios for accessibility
- [ ] Test with screen reader (NVDA or VoiceOver)

## 🎨 Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --sunset-1: #F8C36A;  /* Light gold */
    --sunset-2: #F39A54;  /* Amber */
    --sunset-3: #D9663A;  /* Warm red */
    --ink: #171717;       /* Near black */
    --cloud: #FAFAFA;     /* Off white */
}
```

### Typography

Currently using system fonts. To add custom fonts:

1. Link Google Fonts in HTML `<head>`
2. Update `--font-sans` in CSS variables

### Images

Replace placeholder divs with real images:

```html
<!-- Replace this: -->
<div class="gallery-placeholder">Install Photo 1</div>

<!-- With this: -->
<img src="path/to/image.jpg" alt="Holiday lights installation in Princeton" loading="lazy">
```

## 🔧 Form Integration

### Netlify Forms (Recommended)

1. Add `netlify` attribute to form:

```html
<form name="quote" method="POST" data-netlify="true">
```

1. View submissions in Netlify dashboard

### Custom Backend

Update form action in `contact.html` and handle POST in `script.js`:

```javascript
const response = await fetch('YOUR_ENDPOINT_URL', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});
```

## 📊 Analytics Setup

Add Google Analytics before `</head>`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## ♿ Accessibility Features

- Semantic HTML5 landmarks
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators
- Screen reader friendly
- 4.5:1 minimum contrast ratio
- Reduced motion support

## 🎯 Current Features

### Website (Live)
- ✅ **Modal estimate form** (photo upload, sqft, package selection)
- ✅ **Clickable package tiers** (Basic/Enhanced/Premium/Custom modals)
- ✅ **Pricing reveal strategy** (scroll down in modals to see ~$800/$1,400/$2,400)
- ✅ **Netlify Forms** (file upload support, honeypot, redirect to thanks.html)
- ✅ **Mobile-responsive** (hamburger nav, touch-friendly)
- ✅ **SEO optimized** (meta tags, schema, sitemap, robots.txt)
- ✅ **Accessibility** (ARIA labels, skip links, focus management, keyboard nav)

### Backend Ops (Internal)
- ✅ **Pricing Book** with cost structure and margin analysis
- ✅ **Package Tier Model** (60/80/120 ft standardized inventory theory)
- ✅ **Pricing Calculator** (CSV spreadsheet for dynamic modeling)
- ✅ **Multi-Year Retention Equation** (investor/banker documentation)
- ✅ **Property Scraper Plan** (internal lookup workflow)

---

## 🔧 Git Setup & GitHub Integration

### First-Time Setup (From Obsidian Vault)

**Option 1: Initialize Git in SGL.Website folder only (Recommended)**

**Prerequisites:**
- Install Git: Download from https://git-scm.com/download/win
- Create GitHub account: https://github.com/signup
- Create new repo on GitHub (don't initialize with README)

```powershell
# Open PowerShell and navigate to website folder
Set-Location "X:\[OBSIDIAN]\[VAULTS]\SunsetGlow\SGL.Website"

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Sunset Glow Lighting website"

# Link to GitHub repo (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/sunset-glow-lighting.git
git branch -M main
git push -u origin main
```

**Note:** If Git is not installed, download from https://git-scm.com/download/win and run the installer.

**Option 2: Initialize Git in entire SunsetGlow vault (includes BackendOps)**
```powershell
# Navigate to vault root
cd "X:\[OBSIDIAN]\[VAULTS]\SunsetGlow"

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - SGL website + backend ops"

# Create GitHub repo (do this on github.com first, then):
git remote add origin https://github.com/YOUR_USERNAME/sunset-glow-vault.git
git branch -M main
git push -u origin main
```

### Connect Netlify to GitHub (Auto-Deploy)
1. In Netlify dashboard → Site Settings → Build & Deploy
2. Link to GitHub repository
3. Set **Base directory:** `SGL.Website`
4. Set **Publish directory:** `SGL.Website`
5. Every push to `main` branch auto-deploys

### Daily Workflow
```powershell
# Make changes to files
# Then commit and push:
git add .
git commit -m "Description of changes"
git push
```

Netlify will automatically rebuild and deploy within 1-2 minutes.

---

## 🚨 What's Next

### Immediate (Week 1)
- [ ] Test all forms on live site (submit dummy data)
- [ ] Add real photos (gallery, about page, blog)
- [ ] Test package modals (click all 4 tiers, verify pricing appears)
- [ ] Submit to Google Search Console
- [ ] Set up Google Business Profile

### Short-Term (Month 1)
- [ ] Get supplier invoices → Update COGS in `BackendOps/BizDeck/PricingBook.md`
- [ ] Test 60/80/120 ft theory on 5-10 real jobs
- [ ] Refine package tier pricing based on actual costs
- [ ] Set up email notifications for form submissions
- [ ] Add Google Analytics

### Long-Term (Quarter 1)
- [ ] Build internal CRM or use sheet to track leads
- [ ] Implement property scraper (Phase 1: manual lookups)
- [ ] Create investor pitch deck using BizDeck docs
- [ ] Develop 5-year plan
- [ ] Consider AI chat assistant (after forms stabilize)

---

## 📞 Support & Documentation

- **Website changelog:** `SGL.Website/CHANGELOG.md`
- **Pricing details:** `BackendOps/BizDeck/PricingBook.md`
- **Tier model:** `BackendOps/BizDeck/PackageTierModel.md`
- **Inline code comments:** HTML, CSS, JS files
- **Rule system:** `.cursor/rules/raven-gen.mdc` (internal AI response binding)

---

## 🤖 Internal System Integration

### Cursor AI Rule Set
- **Location:** `.cursor/rules/raven-gen.mdc`
- **Purpose:** Pheno-binding compiler for context-aware AI responses
- **Spec:** ρ{Input} → φ{Bind} → τ{Output} pipeline with namespace resolution
- **Always Applied:** True (active across entire SunsetGlow vault)
- **Function:** Enables structured, industry-specific responses when working on SGL projects

### How It Works
The rule system compiles namespace bindings into phenotypic slots:
- **ρ{Input}** — Ingest and normalize request context
- **φ{Bind}** — Map to industry-specific functions and resolve namespaces
- **τ{Output}** — Emit structured output (code, docs, config)
- **ν{Resilience}** — Validate and verify against source registry
- **λ{Governance}** — Audit trail with PII redaction

This keeps AI responses aligned with your business logic, pricing models, and operational workflows.

---

## 📄 License

**Proprietary - LLMasterDesign © 2025**  
//▙▖▙▖▞▞▙▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂〘・.°𝚫〙