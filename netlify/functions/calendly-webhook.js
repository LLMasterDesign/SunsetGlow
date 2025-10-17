const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

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
    const webhookData = JSON.parse(event.body);
    
    // Verify this is a Calendly webhook
    if (!webhookData.event || !webhookData.payload) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid webhook payload' })
      };
    }

    console.log('Calendly webhook received:', webhookData.event);

    // Handle different Calendly events
    switch (webhookData.event) {
      case 'invitee.created':
        await handleBookingCreated(webhookData.payload);
        break;
      case 'invitee.canceled':
        await handleBookingCanceled(webhookData.payload);
        break;
      case 'invitee.rescheduled':
        await handleBookingRescheduled(webhookData.payload);
        break;
      default:
        console.log('Unhandled event type:', webhookData.event);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true })
    };

  } catch (error) {
    console.error('Calendly webhook error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: 'Webhook processing failed'
      })
    };
  }
};

async function handleBookingCreated(payload) {
  const { event, invitee, questions_and_answers } = payload;
  
  console.log('New booking created:', {
    eventName: event.name,
    inviteeName: invitee.name,
    inviteeEmail: invitee.email,
    startTime: event.start_time,
    endTime: event.end_time
  });

  // Extract custom answers
  const customAnswers = {};
  if (questions_and_answers) {
    questions_and_answers.forEach(qa => {
      customAnswers[qa.question] = qa.answer;
    });
  }

  // Update or create booking record
  const bookingData = {
    calendly_event_uuid: event.uuid,
    calendly_invitee_uuid: invitee.uuid,
    event_name: event.name,
    event_type: event.event_type,
    start_time: event.start_time,
    end_time: event.end_time,
    timezone: event.timezone,
    invitee_name: invitee.name,
    invitee_email: invitee.email,
    invitee_phone: invitee.phone_number,
    status: 'scheduled',
    custom_answers: JSON.stringify(customAnswers),
    created_at: new Date().toISOString()
  };

  // Check if this is an update to existing submission
  const { data: existingSubmission } = await supabase
    .from('form_submissions')
    .select('id')
    .eq('email', invitee.email)
    .eq('status', 'pending')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (existingSubmission) {
    // Update existing submission
    await supabase
      .from('form_submissions')
      .update({ 
        status: 'scheduled',
        calendly_event_uuid: event.uuid,
        scheduled_date: event.start_time,
        updated_at: new Date().toISOString()
      })
      .eq('id', existingSubmission.id);
  }

  // Store booking details
  const { data: booking, error } = await supabase
    .from('calendly_bookings')
    .upsert([bookingData], { 
      onConflict: 'calendly_event_uuid',
      ignoreDuplicates: false 
    })
    .select()
    .single();

  if (error) {
    console.error('Database error storing booking:', error);
    throw new Error('Failed to store booking');
  }

  // Send confirmation to customer
  await sendBookingConfirmation(invitee, event, customAnswers);
  
  // Send notification to business
  await sendBookingNotification(invitee, event, customAnswers);

  console.log('Booking processed successfully:', booking.id);
}

async function handleBookingCanceled(payload) {
  const { event, invitee } = payload;
  
  console.log('Booking canceled:', {
    eventName: event.name,
    inviteeName: invitee.name,
    inviteeEmail: invitee.email
  });

  // Update booking status
  await supabase
    .from('calendly_bookings')
    .update({ 
      status: 'canceled',
      updated_at: new Date().toISOString()
    })
    .eq('calendly_event_uuid', event.uuid);

  // Update form submission if exists
  await supabase
    .from('form_submissions')
    .update({ 
      status: 'canceled',
      updated_at: new Date().toISOString()
    })
    .eq('calendly_event_uuid', event.uuid);

  // Send cancellation notification
  await sendCancellationNotification(invitee, event);
}

async function handleBookingRescheduled(payload) {
  const { event, invitee, old_invitee } = payload;
  
  console.log('Booking rescheduled:', {
    eventName: event.name,
    inviteeName: invitee.name,
    oldTime: old_invitee.created_at,
    newTime: event.start_time
  });

  // Update booking with new time
  await supabase
    .from('calendly_bookings')
    .update({ 
      start_time: event.start_time,
      end_time: event.end_time,
      status: 'rescheduled',
      updated_at: new Date().toISOString()
    })
    .eq('calendly_event_uuid', event.uuid);

  // Update form submission
  await supabase
    .from('form_submissions')
    .update({ 
      scheduled_date: event.start_time,
      status: 'rescheduled',
      updated_at: new Date().toISOString()
    })
    .eq('calendly_event_uuid', event.uuid);

  // Send rescheduling confirmation
  await sendReschedulingConfirmation(invitee, event, old_invitee);
}

async function sendBookingConfirmation(invitee, event, customAnswers) {
  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const eventDate = new Date(event.start_time).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: event.timezone
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: invitee.email,
    subject: 'Installation Appointment Confirmed - Sunset Glow Lighting',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d97706;">Installation Appointment Confirmed!</h2>
        
        <p>Hi ${invitee.name},</p>
        
        <p>Your installation appointment has been confirmed. We're excited to transform your property with beautiful holiday lighting!</p>
        
        <h3>Appointment Details:</h3>
        <ul>
          <li><strong>Date & Time:</strong> ${eventDate}</li>
          <li><strong>Service:</strong> ${event.name}</li>
          <li><strong>Duration:</strong> ${Math.round((new Date(event.end_time) - new Date(event.start_time)) / (1000 * 60 * 60))} hours</li>
        </ul>
        
        <h3>What to Expect:</h3>
        <ol>
          <li>Our team will arrive at the scheduled time</li>
          <li>We'll review the installation plan with you</li>
          <li>Installation will begin immediately</li>
          <li>We'll test all lights and ensure everything works perfectly</li>
          <li>You'll receive a walkthrough of the lighting system</li>
        </ol>
        
        <h3>Preparation Tips:</h3>
        <ul>
          <li>Ensure clear access to all installation areas</li>
          <li>Have any special instructions ready</li>
          <li>Be available for questions during installation</li>
        </ul>
        
        <p>If you need to reschedule or have questions, please call us at <strong>(555) 555-0199</strong> or reply to this email.</p>
        
        <p>We look forward to creating a stunning holiday display for your property!</p>
        
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

async function sendBookingNotification(invitee, event, customAnswers) {
  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const eventDate = new Date(event.start_time).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: event.timezone
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.BUSINESS_EMAIL,
    subject: `New Installation Appointment - ${invitee.name} (${eventDate})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d97706;">New Installation Appointment</h2>
        
        <h3>Customer Information:</h3>
        <ul>
          <li><strong>Name:</strong> ${invitee.name}</li>
          <li><strong>Email:</strong> ${invitee.email}</li>
          <li><strong>Phone:</strong> ${invitee.phone_number || 'Not provided'}</li>
        </ul>
        
        <h3>Appointment Details:</h3>
        <ul>
          <li><strong>Service:</strong> ${event.name}</li>
          <li><strong>Date & Time:</strong> ${eventDate}</li>
          <li><strong>Duration:</strong> ${Math.round((new Date(event.end_time) - new Date(event.start_time)) / (1000 * 60 * 60))} hours</li>
          <li><strong>Event UUID:</strong> ${event.uuid}</li>
        </ul>
        
        <h3>Custom Information:</h3>
        <ul>
          ${Object.entries(customAnswers).map(([question, answer]) => 
            `<li><strong>${question}:</strong> ${answer}</li>`
          ).join('')}
        </ul>
        
        <p><strong>Received:</strong> ${new Date().toLocaleString()}</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="font-size: 12px; color: #666;">
          This notification was automatically generated from Calendly.
        </p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
}

async function sendCancellationNotification(invitee, event) {
  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.BUSINESS_EMAIL,
    subject: `Appointment Canceled - ${invitee.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">Appointment Canceled</h2>
        
        <p><strong>Customer:</strong> ${invitee.name} (${invitee.email})</p>
        <p><strong>Service:</strong> ${event.name}</p>
        <p><strong>Canceled:</strong> ${new Date().toLocaleString()}</p>
        
        <p>This appointment has been canceled through Calendly.</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
}

async function sendReschedulingConfirmation(invitee, event, oldInvitee) {
  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const newEventDate = new Date(event.start_time).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: event.timezone
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: invitee.email,
    subject: 'Installation Appointment Rescheduled - Sunset Glow Lighting',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d97706;">Appointment Rescheduled</h2>
        
        <p>Hi ${invitee.name},</p>
        
        <p>Your installation appointment has been rescheduled to:</p>
        
        <h3>New Appointment Details:</h3>
        <ul>
          <li><strong>Date & Time:</strong> ${newEventDate}</li>
          <li><strong>Service:</strong> ${event.name}</li>
        </ul>
        
        <p>If you have any questions or need to make further changes, please call us at <strong>(555) 555-0199</strong>.</p>
        
        <p>Best regards,<br>
        The Sunset Glow Lighting Team</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
}