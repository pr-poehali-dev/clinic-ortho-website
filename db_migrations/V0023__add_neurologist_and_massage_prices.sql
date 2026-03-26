-- Добавляем невролога в "Первичный прием" (section_id=1)
INSERT INTO t_p48876731_clinic_ortho_website.price_items (section_id, name, price, sort_order)
VALUES (1, 'Прием (осмотр, консультация) врач невролог первичный', '2 500', 2);

-- Создаём категорию "Массаж"
INSERT INTO t_p48876731_clinic_ortho_website.price_sections (title, icon, sort_order)
VALUES ('Массаж', 'Hand', 15);

-- Добавляем услуги массажа
INSERT INTO t_p48876731_clinic_ortho_website.price_items (section_id, name, price, sort_order)
SELECT id, 'Массаж верхней конечности - 15мин', '1 000', 1 FROM t_p48876731_clinic_ortho_website.price_sections WHERE title = 'Массаж';

INSERT INTO t_p48876731_clinic_ortho_website.price_items (section_id, name, price, sort_order)
SELECT id, 'Массаж воротниковой зоны - 15мин', '1 000', 2 FROM t_p48876731_clinic_ortho_website.price_sections WHERE title = 'Массаж';

INSERT INTO t_p48876731_clinic_ortho_website.price_items (section_id, name, price, sort_order)
SELECT id, 'Массаж головы - 10мин', '800', 3 FROM t_p48876731_clinic_ortho_website.price_sections WHERE title = 'Массаж';

INSERT INTO t_p48876731_clinic_ortho_website.price_items (section_id, name, price, sort_order)
SELECT id, 'Массаж кисти и предплечья - 10мин', '800', 4 FROM t_p48876731_clinic_ortho_website.price_sections WHERE title = 'Массаж';

INSERT INTO t_p48876731_clinic_ortho_website.price_items (section_id, name, price, sort_order)
SELECT id, 'Массаж коленного сустава - 10мин', '800', 5 FROM t_p48876731_clinic_ortho_website.price_sections WHERE title = 'Массаж';

INSERT INTO t_p48876731_clinic_ortho_website.price_items (section_id, name, price, sort_order)
SELECT id, 'Массаж локтевого сустава - 10мин', '800', 6 FROM t_p48876731_clinic_ortho_website.price_sections WHERE title = 'Массаж';

INSERT INTO t_p48876731_clinic_ortho_website.price_items (section_id, name, price, sort_order)
SELECT id, 'Массаж лучезапястного сустава - 10мин', '800', 7 FROM t_p48876731_clinic_ortho_website.price_sections WHERE title = 'Массаж';

INSERT INTO t_p48876731_clinic_ortho_website.price_items (section_id, name, price, sort_order)
SELECT id, 'Массаж нижней конечности - 15мин', '1 000', 8 FROM t_p48876731_clinic_ortho_website.price_sections WHERE title = 'Массаж';

INSERT INTO t_p48876731_clinic_ortho_website.price_items (section_id, name, price, sort_order)
SELECT id, 'Массаж области грудной клетки - 20мин', '1 200', 9 FROM t_p48876731_clinic_ortho_website.price_sections WHERE title = 'Массаж';

INSERT INTO t_p48876731_clinic_ortho_website.price_items (section_id, name, price, sort_order)
SELECT id, 'Массаж области позвоночника - 30мин', '1 500', 10 FROM t_p48876731_clinic_ortho_website.price_sections WHERE title = 'Массаж';

INSERT INTO t_p48876731_clinic_ortho_website.price_items (section_id, name, price, sort_order)
SELECT id, 'Массаж общий - 60мин', '3 000', 11 FROM t_p48876731_clinic_ortho_website.price_sections WHERE title = 'Массаж';

INSERT INTO t_p48876731_clinic_ortho_website.price_items (section_id, name, price, sort_order)
SELECT id, 'Массаж плечевого сустава - 10мин', '1 000', 12 FROM t_p48876731_clinic_ortho_website.price_sections WHERE title = 'Массаж';

INSERT INTO t_p48876731_clinic_ortho_website.price_items (section_id, name, price, sort_order)
SELECT id, 'Массаж пояснично-крестцовой области - 20мин', '1 200', 13 FROM t_p48876731_clinic_ortho_website.price_sections WHERE title = 'Массаж';

INSERT INTO t_p48876731_clinic_ortho_website.price_items (section_id, name, price, sort_order)
SELECT id, 'Массаж стопы и голени - 10мин', '800', 14 FROM t_p48876731_clinic_ortho_website.price_sections WHERE title = 'Массаж';

INSERT INTO t_p48876731_clinic_ortho_website.price_items (section_id, name, price, sort_order)
SELECT id, 'Массаж тазобедренного сустава - 10мин', '800', 15 FROM t_p48876731_clinic_ortho_website.price_sections WHERE title = 'Массаж';

INSERT INTO t_p48876731_clinic_ortho_website.price_items (section_id, name, price, sort_order)
SELECT id, 'Массаж шейно-грудного отдела позвоночника - 25мин', '1 500', 16 FROM t_p48876731_clinic_ortho_website.price_sections WHERE title = 'Массаж';

INSERT INTO t_p48876731_clinic_ortho_website.price_items (section_id, name, price, sort_order)
SELECT id, 'Массаж коленных суставов - 30мин', '1 500', 17 FROM t_p48876731_clinic_ortho_website.price_sections WHERE title = 'Массаж';
