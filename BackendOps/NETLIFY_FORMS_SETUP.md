# Netlify Forms Backend Setup

## ✅ Forms Already Configured

All contact intake forms on the site are properly configured to use Netlify Forms:

### Active Forms:
1. **Main Contact Form** (`contact.html`)
   - Form name: `Quote`
   - Method: POST
   - Attributes: `data-netlify="true"` ✓
   - Honeypot: `bot-field` ✓
   - File upload: Photo field enabled ✓

2. **Modal Quote Form** (`index.html`)
   - Form name: `Quote` (modal version)
   - Method: POST
   - Attributes: `data-netlify="true"` ✓
   - Honeypot: `bot-field` ✓
   - File upload: Photo field enabled ✓

## Form Fields Collected

### Customer Information:
- Full Name *
- Email *
- Phone *
- Property Address *

### Project Details:
- Front of Home Photo (optional)
- Estimated Square Footage (optional)
- Interested Package (dropdown) *
  - 🎄 Classic Glow - Starting at $800
  - ✨ Winter Wonderland - Starting at $1,400
  - 🌟 Holiday Spectacular - Starting at $2,400
  - 🎁 Custom Celebration
  - Not sure yet

### Services Checkboxes:
- [ ] Roofline Lighting
- [ ] Tree Wrapping
- [ ] Backyard Lighting
- [ ] Pathway Lights
- [ ] Window Frames
- [ ] Wreaths & Garland

### Additional Options:
- Multi-Year Discount checkbox
- Additional Details textarea

## How to Access Form Submissions

Once deployed to Netlify:

1. Go to your Netlify dashboard
2. Select your site
3. Navigate to: **Forms** tab
4. All submissions will appear here with:
   - Timestamp
   - All form field data
   - Attached photos (if uploaded)
   - Email notifications (can be configured)

## Form Data Flow

```
Customer fills form
    ↓
Netlify receives submission
    ↓
Data stored in Netlify Forms dashboard
    ↓
Email notification sent (optional - configure in Netlify)
    ↓
Export to CSV or integrate with Zapier/Make (optional)
```

## Property Scraper Agent Integration

### Current Status:
The form collects property address and square footage. The property URL field has been removed from the user-facing form as requested.

### Future Backend Integration:
As noted in your requirements, you have a scraper agent in `BackendOps/PropertyScraper/` that:
- Collects home size and price data
- Projects quote prices
- Currently reports to markdown

### To Connect Scraper to Form Data:

**Option 1: Netlify Functions (Recommended)**
1. Create a Netlify Function in `netlify/functions/`
2. Trigger on form submission
3. Call scraper with property address
4. Append data to submission

**Option 2: Webhook Integration**
1. Configure Netlify Form webhook
2. Send submissions to external service
3. Process with scraper
4. Store enriched data

**Option 3: Manual Processing**
1. Export form submissions from Netlify
2. Run scraper on addresses
3. Match data manually

### Example Netlify Function (Future Implementation):

```javascript
// netlify/functions/process-quote.js
exports.handler = async (event) => {
  const formData = JSON.parse(event.body);
  const address = formData.data.address;
  
  // Call property scraper
  const propertyData = await scrapePropertyData(address);
  
  // Calculate quote
  const quote = calculateQuote(propertyData, formData);
  
  // Store or email results
  return {
    statusCode: 200,
    body: JSON.stringify({ quote })
  };
};
```

## CSV Export Format

When you export from Netlify Forms, you'll get:

| Name | Email | Phone | Address | Package | Services | Notes | Timestamp |
|------|-------|-------|---------|---------|----------|-------|-----------|
| ... | ... | ... | ... | ... | ... | ... | ... |

## Notes

- ✅ Forms are live and ready once site is deployed
- ✅ No additional backend code required for basic operation
- ✅ File uploads work automatically
- ✅ Spam protection included (honeypot)
- 📊 100 submissions/month free (Netlify)
- 🔄 Scraper integration planned but not yet connected
- 📧 Email notifications configurable in Netlify settings

## Next Steps

1. Deploy site to Netlify
2. Test form submission
3. Configure email notifications (optional)
4. Set up scraper integration when ready
5. Consider Zapier/Make for automated workflows
