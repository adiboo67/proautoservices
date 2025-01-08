-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table users
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE,
  full_name TEXT,
  role TEXT CHECK (role IN ('admin', 'secretary', 'mechanic'))
);

-- Table vehicles
CREATE TABLE IF NOT EXISTS vehicles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_name TEXT NOT NULL,
  phone TEXT,
  brand_model TEXT NOT NULL,
  mileage INTEGER NOT NULL,
  work_type TEXT NOT NULL,
  entry_date DATE NOT NULL,
  exit_date DATE NOT NULL,
  status TEXT CHECK (status IN ('pending', 'in_progress', 'done', 'validated')),
  mechanic_id UUID REFERENCES users,
  observations TEXT,
  photos TEXT[], -- Array of photo URLs
  client_signature TEXT  -- Base64 signature data or signature URL
);

-- Table appointments
CREATE TABLE IF NOT EXISTS appointments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  vehicle TEXT NOT NULL,
  service TEXT NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  notes TEXT
);
