# Internal Property Lookup Plan

## Purpose
When a lead submits an estimate with their address, we use internal tools to pull public property data **without asking them for URLs**—keeps the form simple and non-intrusive.

## Data Sources (Manual Phase 1)
- Zillow/Redfin: Quick manual search by address → sqft, stories, lot size
- County CAD (Central Appraisal District): Official parcel data, last sale price
- Google Maps: Aerial view for roof complexity, tree count

## Workflow
1. Lead submits address in form
2. Backend (your side) opens tabs with pre-filled searches:
   - `https://www.zillow.com/homes/{address}_rb/`
   - County CAD lookup (varies by county)
   - Google Maps satellite view
3. Copy relevant data into CRM/sheet
4. Use data to inform quote (complexity, size, price bracket)

## Phase 2 (Future Automation)
- Serverless scraper that fetches public data via APIs
- Rate-limited, cached, respectful of TOS
- Store only what's needed for quoting; purge PII on request

## Privacy
- No user-facing "paste your Zillow link" fields
- All lookups done internally after submission
- Transparent: if asked, we explain we use public records to provide accurate quotes



