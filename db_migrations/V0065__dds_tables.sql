CREATE TABLE t_p48876731_clinic_ortho_website.dds_accounts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  opening_balance NUMERIC(14,2) NOT NULL DEFAULT 0,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE t_p48876731_clinic_ortho_website.dds_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  kind VARCHAR(10) NOT NULL CHECK (kind IN ('income','expense')),
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE t_p48876731_clinic_ortho_website.dds_transactions (
  id SERIAL PRIMARY KEY,
  op_date DATE NOT NULL,
  kind VARCHAR(10) NOT NULL CHECK (kind IN ('income','expense','transfer')),
  amount NUMERIC(14,2) NOT NULL CHECK (amount > 0),
  account_id INT NOT NULL REFERENCES t_p48876731_clinic_ortho_website.dds_accounts(id),
  to_account_id INT NULL REFERENCES t_p48876731_clinic_ortho_website.dds_accounts(id),
  category_id INT NULL REFERENCES t_p48876731_clinic_ortho_website.dds_categories(id),
  comment TEXT NOT NULL DEFAULT '',
  is_archived BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX idx_dds_tx_date ON t_p48876731_clinic_ortho_website.dds_transactions(op_date);

INSERT INTO t_p48876731_clinic_ortho_website.dds_accounts (name, sort_order) VALUES
('Касса (наличные)', 1), ('Расчётный счёт', 2), ('Эквайринг / терминал', 3);

INSERT INTO t_p48876731_clinic_ortho_website.dds_categories (name, kind, sort_order) VALUES
('Приёмы врачей', 'income', 1),
('Процедуры (PRP, SVF, УВТ)', 'income', 2),
('Блокады и инъекции', 'income', 3),
('Прочие поступления', 'income', 9),
('Зарплата', 'expense', 1),
('Аренда', 'expense', 2),
('Расходники и препараты', 'expense', 3),
('Реклама', 'expense', 4),
('Налоги и взносы', 'expense', 5),
('Коммунальные услуги и связь', 'expense', 6),
('Банковские комиссии', 'expense', 7),
('Прочие расходы', 'expense', 9);
