CREATE TABLE t_p48876731_clinic_ortho_website.dds_users (
  id SERIAL PRIMARY KEY,
  login VARCHAR(60) NOT NULL UNIQUE,
  name VARCHAR(150) NOT NULL,
  password_hash VARCHAR(200) NOT NULL,
  role VARCHAR(10) NOT NULL CHECK (role IN ('view','edit','full')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE t_p48876731_clinic_ortho_website.dds_sessions (
  token VARCHAR(80) PRIMARY KEY,
  user_id INT NULL REFERENCES t_p48876731_clinic_ortho_website.dds_users(id),
  role VARCHAR(10) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE t_p48876731_clinic_ortho_website.dds_entries (
  id SERIAL PRIMARY KEY,
  op_date DATE NOT NULL,
  entry_type VARCHAR(20) NOT NULL CHECK (entry_type IN ('in_check','in_cash','in_transfer','in_bank','topup','expense','collection','bank_deposit')),
  amount NUMERIC(14,2) NOT NULL CHECK (amount > 0),
  category_id INT NULL REFERENCES t_p48876731_clinic_ortho_website.dds_categories(id),
  comment TEXT NOT NULL DEFAULT '',
  is_archived BOOLEAN NOT NULL DEFAULT false,
  created_by VARCHAR(150) NOT NULL DEFAULT '',
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_by VARCHAR(150) NULL,
  updated_at TIMESTAMP NULL
);
CREATE INDEX idx_dds_entries_date ON t_p48876731_clinic_ortho_website.dds_entries(op_date);

CREATE TABLE t_p48876731_clinic_ortho_website.dds_entry_history (
  id SERIAL PRIMARY KEY,
  entry_id INT NOT NULL REFERENCES t_p48876731_clinic_ortho_website.dds_entries(id),
  action VARCHAR(10) NOT NULL,
  snapshot TEXT NOT NULL,
  changed_by VARCHAR(150) NOT NULL,
  changed_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE t_p48876731_clinic_ortho_website.dds_morning_balance (
  op_date DATE PRIMARY KEY,
  cash_check NUMERIC(14,2) NOT NULL DEFAULT 0,
  cash NUMERIC(14,2) NOT NULL DEFAULT 0,
  updated_by VARCHAR(150) NOT NULL DEFAULT '',
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

UPDATE t_p48876731_clinic_ortho_website.dds_categories SET is_active = false WHERE kind = 'income';
UPDATE t_p48876731_clinic_ortho_website.dds_categories SET name = 'Налоги и взносы' WHERE kind = 'expense' AND name = 'Налоги и взносы';
