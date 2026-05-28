-- Vendors
CREATE TABLE IF NOT EXISTS vendors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  website_url TEXT,
  description TEXT,
  is_stopped BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Plan Categories
CREATE TABLE IF NOT EXISTS plan_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE
);

INSERT INTO plan_categories (name, slug) VALUES
  ('Token Plan', 'token-plan'),
  ('Coding Plan', 'coding-plan'),
  ('Agent Plan', 'agent-plan'),
  ('会员包', 'membership');

-- Plans
CREATE TABLE IF NOT EXISTS plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES plan_categories(id),
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'on_sale' CHECK (status IN ('on_sale','limited','sold_out','stopped')),
  price_monthly NUMERIC(10,2) NOT NULL,
  price_yearly NUMERIC(10,2),
  currency TEXT NOT NULL DEFAULT 'CNY' CHECK (currency IN ('CNY','USD')),
  credits_5h NUMERIC,
  credits_weekly NUMERIC,
  credits_monthly NUMERIC,
  credits_unit TEXT NOT NULL DEFAULT '次',
  model_count INTEGER,
  features_json JSONB,
  promo_text TEXT,
  affiliate_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(vendor_id, slug)
);

-- Announcements
CREATE TABLE IF NOT EXISTS announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  date DATE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_plans_vendor ON plans(vendor_id);
CREATE INDEX idx_plans_category ON plans(category_id);
CREATE INDEX idx_plans_status ON plans(status);
CREATE INDEX idx_plans_price ON plans(price_monthly);

-- Enable RLS
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE plan_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read vendors" ON vendors FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON plan_categories FOR SELECT USING (true);
CREATE POLICY "Public read plans" ON plans FOR SELECT USING (true);
CREATE POLICY "Public read announcements" ON announcements FOR SELECT USING (true);
