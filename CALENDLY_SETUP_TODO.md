# 🗓️ Calendly Integration Setup - TODO List

## ✅ What I've Done for You

### Backend Infrastructure
- ✅ Created Netlify Functions for webhook processing
- ✅ Set up form submission handler (`process-intake.js`)
- ✅ Created Calendly webhook handler (`calendly-webhook.js`)
- ✅ Added availability checking function (`check-availability.js`)
- ✅ Updated form JavaScript to use webhook processing
- ✅ Created database schema for Supabase
- ✅ Added environment variable configuration

### Form Integration
- ✅ Enhanced intake form to use webhook processing
- ✅ Added Calendly link generation with pre-filled data
- ✅ Updated success message to include scheduling link
- ✅ Maintained backward compatibility with other forms

---

## 🚀 What You Need to Do on Vercel/Netlify

### 1. **Set Up Supabase Database** (Priority: HIGH)
```sql
-- Run this in Supabase SQL Editor
-- Copy the contents of database-schema.sql
```

**Steps:**
1. Go to [Supabase](https://supabase.com) and create a new project
2. Go to SQL Editor
3. Copy and paste the contents of `database-schema.sql`
4. Run the SQL to create tables and indexes
5. Note your project URL and anon key

### 2. **Configure Environment Variables** (Priority: HIGH)
In your Netlify dashboard:
1. Go to Site Settings → Environment Variables
2. Add these variables:
   ```
   SUPABASE_URL=your-supabase-project-url
   SUPABASE_ANON_KEY=your-supabase-anon-key
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-app-password
   BUSINESS_EMAIL=business@sunsetglowlighting.com
   CALENDLY_WEBHOOK_SECRET=your-webhook-secret
   ```

### 3. **Set Up Gmail App Password** (Priority: HIGH)
1. Enable 2-factor authentication on your Gmail account
2. Go to Google Account → Security → App passwords
3. Generate an app password for "Mail"
4. Use this password (not your regular Gmail password) in `EMAIL_PASS`

### 4. **Create Calendly Account & Event Types** (Priority: HIGH)
1. Go to [Calendly](https://calendly.com) and create account
2. Create event types:
   - **Installation Consultation** (30-60 minutes)
   - **Installation Service** (2-4 hours)
   - **Maintenance Visit** (1-2 hours)
3. Set your availability (business hours, timezone)
4. Configure event settings:
   - Buffer time between events
   - Maximum advance booking time
   - Minimum notice required

### 5. **Configure Calendly Webhooks** (Priority: HIGH)
1. In Calendly, go to Integrations → Webhooks
2. Add webhook endpoint: `https://your-site.netlify.app/.netlify/functions/calendly-webhook`
3. Select events to track:
   - `invitee.created`
   - `invitee.canceled`
   - `invitee.rescheduled`
4. Copy the webhook secret and add to environment variables

### 6. **Test the Integration** (Priority: MEDIUM)
1. Deploy your site to Netlify
2. Fill out the intake form on your live site
3. Check that:
   - Form submission creates database record
   - Confirmation email is sent
   - Calendly link is generated correctly
   - Booking in Calendly triggers webhook

### 7. **Customize Calendly Event Types** (Priority: MEDIUM)
1. **Installation Consultation Event:**
   - Duration: 30-60 minutes
   - Description: "Initial consultation to discuss your holiday lighting needs"
   - Questions to ask:
     - Property address
     - Package preference
     - Preferred installation date
     - Special requirements

2. **Installation Service Event:**
   - Duration: 2-4 hours
   - Description: "Full installation of holiday lighting system"
     - Questions to ask:
     - Confirmation of package details
     - Access instructions
     - Emergency contact information

### 8. **Set Up Email Templates** (Priority: MEDIUM)
1. **Customer Confirmation Email:**
   - Professional branding
   - Clear next steps
   - Contact information
   - Rescheduling instructions

2. **Business Notification Email:**
   - All customer details
   - Installation requirements
   - Calendar link
   - Follow-up reminders

### 9. **Configure Business Rules** (Priority: MEDIUM)
1. **Booking Windows:**
   - Minimum 24 hours notice
   - Maximum 30 days in advance
   - Blackout dates for holidays

2. **Availability:**
   - Monday-Friday: 8 AM - 5 PM
   - Saturday: 9 AM - 3 PM
   - Sunday: Closed (unless emergency)

3. **Buffer Times:**
   - 30 minutes between consultations
   - 1 hour between installations
   - Travel time considerations

### 10. **Set Up Monitoring & Analytics** (Priority: LOW)
1. **Netlify Functions Logs:**
   - Monitor webhook success/failure rates
   - Track response times
   - Set up alerts for errors

2. **Calendly Analytics:**
   - Track booking conversion rates
   - Monitor no-show rates
   - Analyze popular time slots

3. **Email Delivery:**
   - Monitor email bounce rates
   - Track open/click rates
   - Set up email delivery alerts

---

## 🔧 Technical Configuration Details

### Calendly Event Type Configuration
```json
{
  "name": "Installation Consultation",
  "duration": 60,
  "description": "Initial consultation to discuss your holiday lighting needs and create a custom installation plan.",
  "questions": [
    {
      "name": "property_address",
      "type": "text",
      "required": true,
      "answer_choices": []
    },
    {
      "name": "package_preference",
      "type": "single_choice",
      "required": true,
      "answer_choices": ["Level 1 - Basic", "Level 2 - Enhanced", "Level 3 - Premium", "Custom Package"]
    },
    {
      "name": "special_requirements",
      "type": "text",
      "required": false,
      "answer_choices": []
    }
  ]
}
```

### Webhook Payload Structure
```json
{
  "event": "invitee.created",
  "payload": {
    "event": {
      "uuid": "event-uuid",
      "name": "Installation Consultation",
      "start_time": "2024-01-15T10:00:00.000000Z",
      "end_time": "2024-01-15T11:00:00.000000Z",
      "timezone": "America/Chicago"
    },
    "invitee": {
      "uuid": "invitee-uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "phone_number": "+15551234567"
    },
    "questions_and_answers": [
      {
        "question": "Property Address",
        "answer": "123 Main St, Princeton, TX 75407"
      }
    ]
  }
}
```

---

## 🚨 Common Issues & Solutions

### Issue: Webhook not receiving data
**Solution:** Check Netlify function logs and ensure webhook URL is correct

### Issue: Emails not sending
**Solution:** Verify Gmail app password and SMTP settings

### Issue: Database connection errors
**Solution:** Check Supabase credentials and RLS policies

### Issue: Calendly link not working
**Solution:** Verify Calendly event type configuration and URL parameters

---

## 📞 Support Resources

- **Netlify Functions:** [docs.netlify.com/functions](https://docs.netlify.com/functions)
- **Calendly Webhooks:** [calendly.com/integrations/webhooks](https://calendly.com/integrations/webhooks)
- **Supabase Docs:** [supabase.com/docs](https://supabase.com/docs)
- **Gmail App Passwords:** [support.google.com/accounts/answer/185833](https://support.google.com/accounts/answer/185833)

---

## 🎯 Success Metrics to Track

1. **Form Conversion Rate:** % of visitors who complete intake form
2. **Booking Conversion Rate:** % of form submissions that result in Calendly bookings
3. **Email Delivery Rate:** % of emails successfully delivered
4. **Webhook Success Rate:** % of webhook calls that succeed
5. **Customer Satisfaction:** Post-installation feedback scores

---

**Next Steps:** Start with items 1-5 (database, environment variables, Gmail, Calendly setup) as these are required for the system to function. Items 6-10 can be done in parallel or after the core system is working.