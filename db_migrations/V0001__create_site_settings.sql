CREATE TABLE IF NOT EXISTS site_settings (
  key VARCHAR(255) PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO site_settings (key, value) VALUES
  ('contacts.phone', '+7 999 464 91 94'),
  ('contacts.address', 'г. Новосибирск, ул. Есенина, д. 67'),
  ('contacts.email', 'admin@vash-ortoped54.ru'),
  ('contacts.hours_weekday', '8:00 — 20:00'),
  ('contacts.hours_saturday', '9:00 — 17:00'),
  ('contacts.hours_sunday', 'Выходной'),
  ('home.hero_title', 'Лечение суставов и позвоночника в Новосибирске'),
  ('home.hero_subtitle', 'Клиника «Ваш Ортопед» — современные методы лечения опорно-двигательного аппарата. PRP-терапия, SVF-терапия, гиалуроновая кислота, блокады.'),
  ('about.clinic_name', 'Ваш Ортопед'),
  ('about.tagline', 'Клиника ортопедии и травматологии'),
  ('admin.password', 'admin2024')
ON CONFLICT (key) DO NOTHING;
