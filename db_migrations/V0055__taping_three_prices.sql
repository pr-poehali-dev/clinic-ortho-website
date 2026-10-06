UPDATE t_p48876731_clinic_ortho_website.price_items SET price='550', sort_order=1 WHERE id=42;
INSERT INTO t_p48876731_clinic_ortho_website.price_items (section_id,name,price,sort_order)
SELECT section_id, name, v.p, v.o FROM t_p48876731_clinic_ortho_website.price_items, (VALUES ('720',2),('900',3)) AS v(p,o) WHERE id=42;
