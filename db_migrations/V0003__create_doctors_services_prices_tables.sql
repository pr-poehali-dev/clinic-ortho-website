
CREATE TABLE t_p48876731_clinic_ortho_website.doctors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  experience TEXT NOT NULL,
  description TEXT NOT NULL,
  img TEXT NOT NULL,
  img_position TEXT DEFAULT 'center top',
  img_height TEXT DEFAULT '',
  img_margin_top TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE t_p48876731_clinic_ortho_website.services (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL,
  title TEXT NOT NULL,
  short_desc TEXT NOT NULL,
  full_desc TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  color TEXT NOT NULL DEFAULT 'bg-blue-50 text-blue-600',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE t_p48876731_clinic_ortho_website.price_sections (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  icon TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE t_p48876731_clinic_ortho_website.price_items (
  id SERIAL PRIMARY KEY,
  section_id INTEGER REFERENCES t_p48876731_clinic_ortho_website.price_sections(id),
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);
