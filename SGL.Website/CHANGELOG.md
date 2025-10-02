- thanks.html
  - Added thank-you page and wired forms to redirect on success
- contact.html, index.html
  - Added action to /thanks.html for Netlify redirect after submission
  - Removed public "Property URL" field (moved to internal backend lookup)
  - Removed inline pricing from all package cards (conversation-based instead)
- services.html
  - Removed inline pricing (Basic, Enhanced, Premium, Custom now show CTA text only)
- BackendOps/BizDeck/
  - Created PricingBook.md with cost structure, COGS estimates, margin analysis
  - Created MultiYearRetentionEquation.md for investor/banker documentation
  - Created PackageTierModel.md with 60/80/120 ft standardized inventory theory
  - Created PricingCalculator.csv for dynamic tier pricing modeling
- BackendOps/PropertyScraper/
  - Added internal-lookup-plan.md for backend property data workflow
- index.html
  - Made all package cards clickable (open modals with full details)
  - Updated tiers to show coverage (60/80/120 ft) instead of inline pricing
  - Pricing revealed after scrolling in modals (~$800/$1,400/$2,400 starting points)
- script.js
  - Enhanced modal system to handle multiple package modals (basic/enhanced/premium/custom)
  - Escape key closes any open modal
# Sunset Glow Lighting — Changelog

A running log of notable changes made to files in this folder. Keep entries short and high-signal.

## How to add your own entry
- Add a new section at the top with the current date and your name/initials
- List file-specific changes as bullets, grouped by filename

Template:
```
## YYYY-MM-DD – Your Name/Initials
- filename.ext
  - Brief description of change
```

---

## 2025-10-01 – Assistant
- contact.html
  - Enabled file upload (photo), property URL, estimated sqft
  - Emphasized multi-year discount grouping
- index.html
  - Added modal “Free Estimate” form wired to Netlify
  - Added file upload + metadata fields to modal
  - Added Level 4 “Custom” package and package detail modal
- services.html
  - Added Level 4 Custom Package section
- script.js
  - Reused validation; added per-form validation helpers
  - Added Netlify multipart submission when a file is attached
  - Added modal open/close hooks and Custom package modal triggers
- styles.css
  - Added modal styles
- service-book.html
  - Created standalone Service Book page
- index.html
  - Added SEO meta: robots, canonical, Open Graph, Twitter tags
  - Set theme-color and kept description/title
- services.html
  - Added SEO meta: robots, canonical, Open Graph, Twitter tags
- about.html
  - Added SEO meta: robots, canonical, Open Graph, Twitter tags
- contact.html
  - Added SEO meta: robots, canonical, Open Graph, Twitter tags
  - Enabled Netlify Forms (data-netlify, honeypot, form-name)
- blog.html
  - Added SEO meta: robots, canonical, Open Graph, Twitter tags
- robots.txt
  - Created allow-all robots file with sitemap reference
- sitemap.xml
  - Created basic sitemap with core pages
- styles.css
  - Removed stray Markdown code fence at EOF that prevented CSS from loading
- script.js
  - Removed stray Markdown code fence at EOF that broke script execution
  - Added Netlify form submission (URL-encoded) with graceful fallback
- index.html, about.html, services.html, contact.html, blog.html
  - Removed stray Markdown code fences at EOF that broke rendering
  - Added favicon/touch icon links

- _redirects
  - Added www → apex 301 and SPA fallback to /index.html
- 404.html
  - Added custom 404 with CTA and timed redirect to home

Notes:
- Left image/social `og:image` out for now; add when you have a share image.
- Canonical URLs point to `https://sunsetglowlighting.com/` domain; adjust if deploying elsewhere.

## 2025-10-01 – User
- index.html
  - Switched asset paths to `./styles.css` and `./script.js`
  - Added `festive` class to hero and a `.string-lights` divider
  - Updated footer phone text to `(555) 555-0199`
- about.html, services.html, contact.html, blog.html
  - Switched asset paths to `./styles.css` and/or `./script.js`
- styles.css
  - Added festive accents: `.string-lights`, `.hero.festive`, refined card styling


