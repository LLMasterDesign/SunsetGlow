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
    const { date, duration = 4 } = JSON.parse(event.body);
    
    if (!date) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Date is required' })
      };
    }

    // Check for existing bookings on this date
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const { data: existingBookings, error } = await supabase
      .from('calendly_bookings')
      .select('start_time, end_time, status')
      .gte('start_time', startOfDay.toISOString())
      .lte('start_time', endOfDay.toISOString())
      .in('status', ['scheduled', 'rescheduled']);

    if (error) {
      console.error('Database error:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to check availability' })
      };
    }

    // Generate available time slots
    const availableSlots = generateAvailableSlots(date, duration, existingBookings || []);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        date,
        available: availableSlots.length > 0,
        slots: availableSlots,
        existingBookings: existingBookings?.length || 0
      })
    };

  } catch (error) {
    console.error('Availability check error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: 'Failed to check availability'
      })
    };
  }
};

function generateAvailableSlots(date, duration, existingBookings) {
  const slots = [];
  const startHour = 8; // 8 AM
  const endHour = 17; // 5 PM
  const slotDuration = duration; // hours
  
  // Convert existing bookings to time ranges
  const bookedRanges = existingBookings.map(booking => ({
    start: new Date(booking.start_time),
    end: new Date(booking.end_time)
  }));

  // Generate time slots
  for (let hour = startHour; hour <= endHour - slotDuration; hour += 1) {
    const slotStart = new Date(date);
    slotStart.setHours(hour, 0, 0, 0);
    
    const slotEnd = new Date(slotStart);
    slotEnd.setHours(hour + slotDuration, 0, 0, 0);

    // Check if this slot conflicts with existing bookings
    const isAvailable = !bookedRanges.some(range => 
      (slotStart < range.end && slotEnd > range.start)
    );

    if (isAvailable) {
      slots.push({
        start: slotStart.toISOString(),
        end: slotEnd.toISOString(),
        display: formatTimeSlot(slotStart, slotEnd)
      });
    }
  }

  return slots;
}

function formatTimeSlot(start, end) {
  const startTime = start.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  
  const endTime = end.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  
  return `${startTime} - ${endTime}`;
}