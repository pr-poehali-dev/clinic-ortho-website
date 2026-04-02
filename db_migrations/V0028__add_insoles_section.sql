INSERT INTO t_p48876731_clinic_ortho_website.price_sections (title, icon, sort_order, is_active)
VALUES ('Стельки-супинаторы', 'Footprints', 16, true);

INSERT INTO t_p48876731_clinic_ortho_website.price_items (section_id, name, price, sort_order)
VALUES (
  (SELECT id FROM t_p48876731_clinic_ortho_website.price_sections WHERE title = 'Стельки-супинаторы'),
  'Изготовление индивидуальных каркасных стелек-супинаторов с консультацией (формовка + рекомендации)',
  '4800',
  1
);
