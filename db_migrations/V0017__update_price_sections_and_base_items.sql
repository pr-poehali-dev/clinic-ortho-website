-- Обновляем существующие разделы
UPDATE t_p48876731_clinic_ortho_website.price_sections SET title='Первичный прием', icon='Stethoscope', sort_order=1 WHERE id=1;
UPDATE t_p48876731_clinic_ortho_website.price_sections SET title='Повторный прием', icon='RefreshCw', sort_order=2 WHERE id=2;
UPDATE t_p48876731_clinic_ortho_website.price_sections SET title='PRP терапия', icon='Droplets', sort_order=3 WHERE id=3;
UPDATE t_p48876731_clinic_ortho_website.price_sections SET title='Гиалуроновые кислоты', icon='FlaskConical', sort_order=4 WHERE id=4;
UPDATE t_p48876731_clinic_ortho_website.price_sections SET title='Суставные инъекции', icon='Target', sort_order=5 WHERE id=5;
UPDATE t_p48876731_clinic_ortho_website.price_sections SET title='SWF-терапия, мини-операции', icon='Microscope', sort_order=6 WHERE id=6;
UPDATE t_p48876731_clinic_ortho_website.price_sections SET title='Пункции', icon='Activity', sort_order=7 WHERE id=7;
UPDATE t_p48876731_clinic_ortho_website.price_sections SET title='Травмпункт', icon='Bandage', sort_order=8 WHERE id=8;
UPDATE t_p48876731_clinic_ortho_website.price_sections SET title='Блокады', icon='Syringe', sort_order=9 WHERE id=9;

INSERT INTO t_p48876731_clinic_ortho_website.price_sections (title, icon, sort_order, is_active) VALUES
('Внутривенные инфузии (капельно)', 'Zap', 10, true),
('Внутривенные инфузии (струйно)', 'Zap', 11, true),
('Внутримышечные инъекции', 'Syringe', 12, true),
('Забор крови', 'Droplet', 13, true),
('УЗИ', 'ScanLine', 14, true);

-- Обновляем 2 существующих items под правильные разделы
UPDATE t_p48876731_clinic_ortho_website.price_items SET name='Прием (осмотр, консультация) врач травматолог-ортопед первичный', price='2200', sort_order=1, section_id=1 WHERE id=1;
UPDATE t_p48876731_clinic_ortho_website.price_items SET name='Прием (осмотр, консультация) врач травматолог-ортопед повторный', price='1500', sort_order=1, section_id=2 WHERE id=2;
