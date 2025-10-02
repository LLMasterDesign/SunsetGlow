# Sunset Glow Lighting — Ready-to-Deploy Site

This folder is a cleaned, consistent, and slightly more "holiday" version of your site.

## What I changed
- Added a festive string-lights divider and a warmer hero background on the home page (pure CSS, no external assets).
- Standardized phone to (555) 555-0199 everywhere for now.
- Made CSS/JS paths relative (`./styles.css`, `./script.js`) so local preview and subpath hosting work.
- Kept structure, accessibility, and responsive behavior intact.

## How to preview locally
Open `index.html` in your browser.

## How to publish instantly (Netlify Drop)
Zip this folder and drag it to https://app.netlify.com/drop
You’ll get a live URL immediately.

## Hooking up a form (quickest)
Replace the form `action` in `contact.html` with your Formspree endpoint:
<form action="https://formspree.io/f/YOUR_ID" method="POST">

## Custom domain later
Add your domain in Netlify → Site settings → Domain management.
