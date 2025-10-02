# Property Scraper (Planning)

Goal: Enrich leads with public property metadata when an estimate is submitted.

Initial data targets
- Parcel address normalization
- Est. sqft, lot size
- Stories, roof complexity signals
- Last sale price/year

Approach
- Phase 1: Manual lookup links (Zillow, Redfin, County CAD) using provided URL
- Phase 2: Serverless scraper with rate-limits and caching (respect TOS)

Security & Privacy
- Do not store scraped PII beyond what user provided
- Attribute sources; allow removal on request


