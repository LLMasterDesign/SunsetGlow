# Branch Recovery Plan

## Problem Diagnosis
The remaining branches have massive merge conflicts because they diverged significantly from main. Both branches and main have modified the same core files (contact.html, styles.css, etc.).

## Available Solutions

### Option 1: Cherry-Pick Strategy (Recommended)
- Extract the valuable changes from each branch
- Apply them as new commits on top of current main
- Preserves the specific improvements without conflicts

### Option 2: Rebase Strategy
- Rebase each branch onto current main
- Resolve conflicts during rebase
- More complex but preserves branch history

### Option 3: Manual Integration
- Review each branch's changes
- Manually apply the good parts to main
- Most control but most time-consuming

### Option 4: Fresh Start
- Delete problematic branches
- Extract any valuable code snippets
- Start fresh with new feature branches

## Recommended Approach

For each branch, I'll:
1. Analyze what changes it contains
2. Determine if changes are still valuable
3. Cherry-pick the good changes onto main
4. Delete the problematic branch

## Branch Analysis

### High Priority (Likely Valuable)
- `origin/LLarzMasterD-patch-1` - Script and styling updates
- `origin/cursor/enhance-service-and-pricebook-presentation-5d07` - Package modals
- `origin/cursor/fix-banner-and-button-layout-issues-e035` - Responsive fixes

### Medium Priority (Review Needed)
- `origin/cursor/fix-burger-bar-dropdown-4e4c` - Mobile navigation
- `origin/cursor/fix-contact-form-for-seo-tracking-2d8e` - Form improvements
- `origin/cursor/optimize-seo-for-local-and-ai-chatbot-discoverability-0604` - SEO updates

### Low Priority (Likely Stale)
- `origin/cursor/research-christmas-light-website-design-and-inspiration-8dab`
- `origin/cursor/sunsetglow-launch-roadmap-to-first-customer-*` (duplicate branches)
- `origin/troubleshooting-website-changes-no-ntl-*` (Netlify bot branch)