-- Sunset Glow Lighting Database Schema
-- Run this in your Supabase SQL editor

-- Form submissions table
CREATE TABLE IF NOT EXISTS form_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    alt_phone VARCHAR(20),
    preferred_contact VARCHAR(20),
    address TEXT NOT NULL,
    property_type VARCHAR(50),
    stories VARCHAR(10),
    roof_type VARCHAR(50),
    features TEXT,
    gate_code VARCHAR(100),
    parking_info TEXT,
    package VARCHAR(50) NOT NULL,
    color_preference VARCHAR(50) NOT NULL,
    additional_services TEXT,
    preferred_date DATE NOT NULL,
    alternate_date DATE,
    time_preference VARCHAR(20),
    removal_date DATE,
    home_presence VARCHAR(50),
    payment_method VARCHAR(50),
    billing_address TEXT,
    invoice_email VARCHAR(255),
    emergency_name VARCHAR(255),
    emergency_phone VARCHAR(20),
    emergency_relation VARCHAR(100),
    special_requests TEXT,
    referral_source VARCHAR(50),
    photo_consent BOOLEAN DEFAULT FALSE,
    terms_accepted BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'pending',
    calendly_event_uuid VARCHAR(255),
    scheduled_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Calendly bookings table
CREATE TABLE IF NOT EXISTS calendly_bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    calendly_event_uuid VARCHAR(255) UNIQUE NOT NULL,
    calendly_invitee_uuid VARCHAR(255) NOT NULL,
    event_name VARCHAR(255) NOT NULL,
    event_type VARCHAR(100),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    timezone VARCHAR(50),
    invitee_name VARCHAR(255) NOT NULL,
    invitee_email VARCHAR(255) NOT NULL,
    invitee_phone VARCHAR(20),
    status VARCHAR(20) DEFAULT 'scheduled',
    custom_answers JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_form_submissions_email ON form_submissions(email);
CREATE INDEX IF NOT EXISTS idx_form_submissions_status ON form_submissions(status);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_calendly_bookings_event_uuid ON calendly_bookings(calendly_event_uuid);
CREATE INDEX IF NOT EXISTS idx_calendly_bookings_invitee_email ON calendly_bookings(invitee_email);
CREATE INDEX IF NOT EXISTS idx_calendly_bookings_start_time ON calendly_bookings(start_time);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_form_submissions_updated_at 
    BEFORE UPDATE ON form_submissions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_calendly_bookings_updated_at 
    BEFORE UPDATE ON calendly_bookings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendly_bookings ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your needs)
-- For now, allow all operations (you may want to restrict this)
CREATE POLICY "Allow all operations on form_submissions" ON form_submissions
    FOR ALL USING (true);

CREATE POLICY "Allow all operations on calendly_bookings" ON calendly_bookings
    FOR ALL USING (true);