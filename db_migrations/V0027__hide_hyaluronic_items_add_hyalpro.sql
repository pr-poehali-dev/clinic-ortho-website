-- Добавляем поле hidden в price_items
ALTER TABLE t_p48876731_clinic_ortho_website.price_items
ADD COLUMN IF NOT EXISTS hidden boolean NOT NULL DEFAULT false;

-- Скрываем все позиции в категории "Гиалуроновые кислоты" кроме Гиалджект
UPDATE t_p48876731_clinic_ortho_website.price_items
SET hidden = true
WHERE section_id = 4
  AND name != 'Внутрисуставное введение Гиалджект 1,5% 2мл';

-- Убеждаемся что Гиалджект виден и имеет sort_order = 1
UPDATE t_p48876731_clinic_ortho_website.price_items
SET hidden = false, sort_order = 1
WHERE section_id = 4 AND name = 'Внутрисуставное введение Гиалджект 1,5% 2мл';

-- Добавляем новую строку Гиалпро
INSERT INTO t_p48876731_clinic_ortho_website.price_items (section_id, name, price, sort_order, hidden)
VALUES (4, 'Внутрисуставное введение Гиалпро 40мг/2мл - 2,0 мл', '10000', 2, false);
