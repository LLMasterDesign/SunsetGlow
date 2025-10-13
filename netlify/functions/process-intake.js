const { createClient } = require('@supabase/supabase-js');
const nodemailer = require('nodemailer');

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Email transporter setup
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }) 
    };
  }

  try {
    const formData = JSON.parse(event.body);
    
    // Validate required fields
    const validation = validateFormData(formData);
    if (!validation.isValid) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Validation failed', 
          details: validation.errors 
        })
      };
    }

    // Store submission in database
    const submissionId = await storeFormSubmission(formData);
    
    // Send confirmation email to customer
    await sendCustomerConfirmation(formData);
    
    // Send notification to business
    await sendBusinessNotification(formData, submissionId);
    
    // Generate Calendly link with pre-filled data
    const calendlyLink = generateCalendlyLink(formData);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        submissionId,
        calendlyLink,
        message: 'Form submitted successfully. Check your email for next steps.'
      })
    };

  } catch (error) {
    console.error('Webhook error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: 'Please try again or call us at (555) 555-0199'
      })
    };
  }
};

function validateFormData(data) {
  const errors = [];
  const required = ['name', 'email', 'phone', 'address', 'package', 'preferredDate'];
  
  required.forEach(field => {
    if (!data[field] || data[field].trim() === '') {
      errors.push(`${field} is required`);
    }
  });
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.push('Invalid email format');
  }
  
  // Phone validation (10 digits)
  const phoneDigits = data.phone ? data.phone.replace(/\D/g, '') : '';
  if (data.phone && phoneDigits.length !== 10) {
    errors.push('Phone number must be 10 digits');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

async function storeFormSubmission(data) {
  const { data: submission, error } = await supabase
    .from('form_submissions')
    .insert([{
      customer_name: data.name,
      email: data.email,
      phone: data.phone,
      alt_phone: data.altPhone || null,
      preferred_contact: data.preferredContact,
      address: data.address,
      property_type: data.propertyType,
      stories: data.stories || null,
      roof_type: data.roofType || null,
      features: data.features ? data.features.join(', ') : null,
      gate_code: data.gateCode || null,
      parking_info: data.parkingInfo || null,
      package: data.package,
      color_preference: data.colorPreference,
      additional_services: data.additionalServices ? data.additionalServices.join(', ') : null,
      preferred_date: data.preferredDate,
      alternate_date: data.alternateDate || null,
      time_preference: data.timePreference || null,
      removal_date: data.removalDate || null,
      home_presence: data.homePresence || null,
      payment_method: data.paymentMethod || null,
      billing_address: data.billingAddress || null,
      invoice_email: data.invoiceEmail || null,
      emergency_name: data.emergencyName || null,
      emergency_phone: data.emergencyPhone || null,
      emergency_relation: data.emergencyRelation || null,
      special_requests: data.specialRequests || null,
      referral_source: data.referralSource || null,
      photo_consent: data.photoConsent === 'yes',
      terms_accepted: data.termsAccept === 'yes',
      status: 'pending',
      created_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) {
    console.error('Database error:', error);
    throw new Error('Failed to store submission');
  }

  return submission.id;
}

async function sendCustomerConfirmation(data) {
  const calendlyLink = generateCalendlyLink(data);
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: 'Installation Request Received - Sunset Glow Lighting',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d97706;">Thank You for Your Installation Request!</h2>
        
        <p>Hi ${data.name},</p>
        
        <p>We've received your installation request and are excited to help transform your property with beautiful holiday lighting!</p>
        
        <h3>Next Steps:</h3>
        <ol>
          <li><strong>Schedule Your Installation:</strong> <a href="${calendlyLink}" style="background: #d97706; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Book Your Installation Time</a></li>
          <li>We'll review your property details and confirm availability</li>
          <li>You'll receive a final service agreement via email</li>
          <li>We'll arrive on your scheduled date to begin installation</li>
        </ol>
        
        <h3>Your Request Details:</h3>
        <ul>
          <li><strong>Package:</strong> ${data.package}</li>
          <li><strong>Preferred Date:</strong> ${new Date(data.preferredDate).toLocaleDateString()}</li>
          <li><strong>Property:</strong> ${data.address}</li>
          <li><strong>Color Preference:</strong> ${data.colorPreference}</li>
        </ul>
        
        <p>If you have any questions, please call us at <strong>(555) 555-0199</strong> or reply to this email.</p>
        
        <p>Best regards,<br>
        The Sunset Glow Lighting Team</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="font-size: 12px; color: #666;">
          Sunset Glow Lighting | Veteran-Owned Holiday Lighting Service<br>
          Princeton, TX | (555) 555-0199 | hello@sunsetglowlighting.com
        </p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
}

async function sendBusinessNotification(data, submissionId) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.BUSINESS_EMAIL,
    subject: `New Installation Request - ${data.name} (${data.package})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d97706;">New Installation Request</h2>
        
        <h3>Customer Information:</h3>
        <ul>
          <li><strong>Name:</strong> ${data.name}</li>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>Phone:</strong> ${data.phone}</li>
          <li><strong>Preferred Contact:</strong> ${data.preferredContact}</li>
        </ul>
        
        <h3>Property Details:</h3>
        <ul>
          <li><strong>Address:</strong> ${data.address}</li>
          <li><strong>Type:</strong> ${data.propertyType}</li>
          <li><strong>Stories:</strong> ${data.stories || 'Not specified'}</li>
          <li><strong>Roof Type:</strong> ${data.roofType || 'Not specified'}</li>
        </ul>
        
        <h3>Service Request:</h3>
        <ul>
          <li><strong>Package:</strong> ${data.package}</li>
          <li><strong>Color:</strong> ${data.colorPreference}</li>
          <li><strong>Preferred Date:</strong> ${new Date(data.preferredDate).toLocaleDateString()}</li>
          <li><strong>Alternate Date:</strong> ${data.alternateDate ? new Date(data.alternateDate).toLocaleDateString() : 'Not specified'}</li>
        </ul>
        
        <h3>Additional Information:</h3>
        <ul>
          <li><strong>Special Requests:</strong> ${data.specialRequests || 'None'}</li>
          <li><strong>Referral Source:</strong> ${data.referralSource || 'Not specified'}</li>
          <li><strong>Photo Consent:</strong> ${data.photoConsent === 'yes' ? 'Yes' : 'No'}</li>
        </ul>
        
        <p><strong>Submission ID:</strong> ${submissionId}</p>
        <p><strong>Received:</strong> ${new Date().toLocaleString()}</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="font-size: 12px; color: #666;">
          This notification was automatically generated from your website form.
        </p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
}

function generateCalendlyLink(data) {
  const baseUrl = 'https://calendly.com/sunset-glow-lighting/installation-consultation';
  const params = new URLSearchParams({
    name: data.name,
    email: data.email,
    'a1[0]': data.address,
    'a2[0]': data.package,
    'a3[0]': data.preferredDate,
    'a4[0]': data.phone
  });
  
  return `${baseUrl}?${params.toString()}`;
}