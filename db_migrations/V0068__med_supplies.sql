ALTER TABLE t_p48876731_clinic_ortho_website.dds_users ADD COLUMN med_role VARCHAR(10) NOT NULL DEFAULT 'none';

CREATE TABLE t_p48876731_clinic_ortho_website.med_items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  start_stock INTEGER NOT NULL DEFAULT 0,
  pack_price NUMERIC(12,2) NOT NULL DEFAULT 0,
  pack_qty INTEGER NOT NULL DEFAULT 1,
  min_stock INTEGER NOT NULL DEFAULT 0,
  exclude_control BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_by VARCHAR(150),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE t_p48876731_clinic_ortho_website.med_moves (
  id SERIAL PRIMARY KEY,
  item_id INTEGER NOT NULL REFERENCES t_p48876731_clinic_ortho_website.med_items(id),
  op_date DATE NOT NULL,
  kind VARCHAR(10) NOT NULL,
  qty INTEGER NOT NULL DEFAULT 0,
  updated_by VARCHAR(150),
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  UNIQUE (item_id, op_date, kind)
);

CREATE INDEX med_moves_date_idx ON t_p48876731_clinic_ortho_website.med_moves (op_date);