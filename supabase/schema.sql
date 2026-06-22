-- ============================================
-- ANFASSC — Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ---- PROFILES (extends Supabase auth.users) ----
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'admin', 'super_admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, role)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', 'Member'), 'member');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ---- MEMBERSHIPS ----
CREATE TABLE memberships (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('standard', 'premium', 'vip')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('active', 'expired', 'pending', 'suspended')),
  membership_number TEXT UNIQUE NOT NULL,
  start_date DATE NOT NULL,
  expiry_date DATE NOT NULL,
  paystack_reference TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-generate membership number
CREATE OR REPLACE FUNCTION generate_membership_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.membership_number := 'ANFASSC-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(NEXTVAL('membership_seq')::TEXT, 5, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE membership_seq START 1;

CREATE TRIGGER set_membership_number
  BEFORE INSERT ON memberships
  FOR EACH ROW EXECUTE FUNCTION generate_membership_number();

-- ---- PRODUCTS ----
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price INTEGER NOT NULL, -- in kobo (₦1 = 100 kobo)
  category TEXT NOT NULL CHECK (category IN ('jersey', 'polo', 'cap', 'scarf', 'bundle', 'other')),
  images TEXT[] DEFAULT '{}',
  stock INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  sizes TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---- ORDERS ----
CREATE TABLE orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  items JSONB NOT NULL,
  total INTEGER NOT NULL, -- in kobo
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled')),
  paystack_reference TEXT UNIQUE,
  shipping_address JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---- GALLERY ALBUMS ----
CREATE TABLE gallery_albums (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  cover_image TEXT,
  event_date DATE,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE gallery_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  album_id UUID REFERENCES gallery_albums(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT,
  caption TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---- TRAVEL PACKAGES ----
CREATE TABLE travel_packages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  tournament TEXT NOT NULL,
  destination TEXT NOT NULL,
  departure_date DATE NOT NULL,
  return_date DATE NOT NULL,
  price INTEGER NOT NULL, -- in kobo
  includes TEXT[] DEFAULT '{}',
  spots_total INTEGER NOT NULL,
  spots_remaining INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed', 'sold_out')),
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---- CONTACT MESSAGES ----
CREATE TABLE contact_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---- NEWSLETTER SUBSCRIBERS ----
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE travel_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update their own
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

-- Memberships: users see their own, admins see all
CREATE POLICY "Users can view own membership" ON memberships FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all memberships" ON memberships FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

-- Products: everyone can read active products
CREATE POLICY "Anyone can view active products" ON products FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Admins can manage products" ON products FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

-- Orders: users see own orders
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can manage orders" ON orders FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

-- Gallery: published albums are public
CREATE POLICY "Anyone can view published albums" ON gallery_albums FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Anyone can view published gallery images" ON gallery_images FOR SELECT USING (
  EXISTS (SELECT 1 FROM gallery_albums WHERE id = album_id AND is_published = TRUE)
);
CREATE POLICY "Admins can manage gallery" ON gallery_albums FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

-- Travel: everyone can read
CREATE POLICY "Anyone can view travel packages" ON travel_packages FOR SELECT USING (TRUE);
CREATE POLICY "Admins can manage travel" ON travel_packages FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

-- Contact: only admins can read messages; anyone can insert
CREATE POLICY "Anyone can submit contact message" ON contact_messages FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Admins can view messages" ON contact_messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

-- Newsletter: anyone can subscribe
CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscribers FOR INSERT WITH CHECK (TRUE);

-- ============================================
-- SEED DATA (optional — remove in production)
-- ============================================
INSERT INTO products (name, slug, description, price, category, stock, is_featured, sizes) VALUES
  ('ANFASSC Official Home Jersey 2025', 'anfassc-home-jersey-2025', 'Premium quality supporters jersey in Nigerian green and white', 1500000, 'jersey', 50, TRUE, ARRAY['S','M','L','XL','XXL']),
  ('AFCON Morocco 2025 Special Edition Polo', 'afcon-morocco-2025-polo', 'Commemorative edition polo from the AFCON 2025 campaign', 1200000, 'polo', 30, TRUE, ARRAY['S','M','L','XL']),
  ('ANFASSC Official Supporters Cap', 'anfassc-supporters-cap', 'Embroidered crest on premium fitted cap', 550000, 'cap', 100, FALSE, ARRAY['One Size']),
  ('ANFASSC Membership Welcome Pack', 'anfassc-welcome-pack', 'Complete set: Jersey + ID Card + Scarf + Pin Badge', 2500000, 'bundle', 20, TRUE, ARRAY['S','M','L','XL','XXL']);
