"""API для управления контентом сайта: врачи, услуги, цены"""
import json
import os
import psycopg2

SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "t_p48876731_clinic_ortho_website")
CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Admin-Password",
}


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def ok(data):
    return {"statusCode": 200, "headers": CORS, "body": json.dumps(data, ensure_ascii=False, default=str)}


def err(msg, code=400):
    return {"statusCode": code, "headers": CORS, "body": json.dumps({"error": msg}, ensure_ascii=False)}


def check_auth(event, conn):
    password = event.get("headers", {}).get("X-Admin-Password", "")
    cur = conn.cursor()
    cur.execute(f"SELECT value FROM {SCHEMA}.site_settings WHERE key = 'admin.password'")
    row = cur.fetchone()
    return row and row[0] == password


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")
    params = event.get("queryStringParameters") or {}
    body = json.loads(event.get("body") or "{}") if method in ("POST", "PUT", "DELETE") else {}

    # Раздел передаётся через ?section=doctors или в теле запроса
    section = params.get("section", body.get("section", ""))

    conn = get_conn()

    # ─── ВРАЧИ ───────────────────────────────────────────────────────────────
    if section == "doctors":
        if method == "GET":
            cur = conn.cursor()
            cur.execute(f"SELECT id, name, specialty, experience, description, img, img_position, img_height, img_margin_top, sort_order, is_active FROM {SCHEMA}.doctors WHERE is_active = true ORDER BY sort_order")
            rows = cur.fetchall()
            conn.close()
            cols = ["id", "name", "specialty", "experience", "description", "img", "imgPosition", "imgHeight", "imgMarginTop", "sort_order", "is_active"]
            return ok([dict(zip(cols, r)) for r in rows])

        if not check_auth(event, conn):
            conn.close()
            return err("Нет доступа", 403)

        if method == "POST":
            cur = conn.cursor()
            cur.execute(
                f"INSERT INTO {SCHEMA}.doctors (name, specialty, experience, description, img, img_position, img_height, img_margin_top, sort_order) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING id",
                (body.get("name"), body.get("specialty"), body.get("experience"), body.get("description"), body.get("img"), body.get("imgPosition", "center top"), body.get("imgHeight", ""), body.get("imgMarginTop", ""), body.get("sort_order", 0))
            )
            new_id = cur.fetchone()[0]
            conn.commit()
            conn.close()
            return ok({"id": new_id})

        if method == "PUT":
            doc_id = body.get("id")
            cur = conn.cursor()
            cur.execute(
                f"UPDATE {SCHEMA}.doctors SET name=%s, specialty=%s, experience=%s, description=%s, img=%s, img_position=%s, img_height=%s, img_margin_top=%s, sort_order=%s, is_active=%s WHERE id=%s",
                (body.get("name"), body.get("specialty"), body.get("experience"), body.get("description"), body.get("img"), body.get("imgPosition", "center top"), body.get("imgHeight", ""), body.get("imgMarginTop", ""), body.get("sort_order", 0), body.get("is_active", True), doc_id)
            )
            conn.commit()
            conn.close()
            return ok({"ok": True})

        if method == "DELETE":
            doc_id = body.get("id")
            if not doc_id:
                conn.close()
                return err("id обязателен")
            cur = conn.cursor()
            cur.execute(f"DELETE FROM {SCHEMA}.doctors WHERE id=%s", (doc_id,))
            conn.commit()
            conn.close()
            return ok({"ok": True})

    # ─── УСЛУГИ ──────────────────────────────────────────────────────────────
    elif section == "services":
        if method == "GET":
            cur = conn.cursor()
            cur.execute(f"SELECT id, slug, icon, title, short_desc, full_desc, items, color, sort_order, is_active FROM {SCHEMA}.services WHERE is_active=true ORDER BY sort_order")
            rows = cur.fetchall()
            conn.close()
            cols = ["id", "slug", "icon", "title", "short", "desc", "items", "color", "sort_order", "is_active"]
            result = []
            for r in rows:
                d = dict(zip(cols, r))
                d["items"] = d["items"] if isinstance(d["items"], list) else json.loads(d["items"])
                result.append(d)
            return ok(result)

        if not check_auth(event, conn):
            conn.close()
            return err("Нет доступа", 403)

        if method == "POST":
            cur = conn.cursor()
            items = json.dumps(body.get("items", []), ensure_ascii=False)
            cur.execute(
                f"INSERT INTO {SCHEMA}.services (slug, icon, title, short_desc, full_desc, items, color, sort_order) VALUES (%s,%s,%s,%s,%s,%s,%s,%s) RETURNING id",
                (body.get("slug"), body.get("icon"), body.get("title"), body.get("short"), body.get("desc"), items, body.get("color", "bg-blue-50 text-blue-600"), body.get("sort_order", 0))
            )
            new_id = cur.fetchone()[0]
            conn.commit()
            conn.close()
            return ok({"id": new_id})

        if method == "PUT":
            cur = conn.cursor()
            items = json.dumps(body.get("items", []), ensure_ascii=False)
            cur.execute(
                f"UPDATE {SCHEMA}.services SET slug=%s, icon=%s, title=%s, short_desc=%s, full_desc=%s, items=%s, color=%s, sort_order=%s, is_active=%s WHERE id=%s",
                (body.get("slug"), body.get("icon"), body.get("title"), body.get("short"), body.get("desc"), items, body.get("color"), body.get("sort_order", 0), body.get("is_active", True), body.get("id"))
            )
            conn.commit()
            conn.close()
            return ok({"ok": True})

    # ─── ЦЕНЫ ────────────────────────────────────────────────────────────────
    elif section == "prices":
        if method == "GET":
            cur = conn.cursor()
            cur.execute(f"SELECT id, title, icon, sort_order FROM {SCHEMA}.price_sections WHERE is_active=true ORDER BY sort_order")
            sections = cur.fetchall()
            result = []
            for s in sections:
                cur.execute(f"SELECT id, name, price, sort_order, description FROM {SCHEMA}.price_items WHERE section_id=%s AND hidden=false ORDER BY sort_order", (s[0],))
                items = [{"id": r[0], "name": r[1], "price": r[2], "sort_order": r[3], "description": r[4]} for r in cur.fetchall()]
                result.append({"id": s[0], "title": s[1], "icon": s[2], "sort_order": s[3], "items": items})
            conn.close()
            return ok(result)

        if not check_auth(event, conn):
            conn.close()
            return err("Нет доступа", 403)

        if method == "POST":
            action = body.get("action")
            cur = conn.cursor()

            if action == "add_section":
                cur.execute(f"INSERT INTO {SCHEMA}.price_sections (title, icon, sort_order) VALUES (%s,%s,%s) RETURNING id", (body.get("title"), body.get("icon", "Tag"), body.get("sort_order", 0)))
                new_id = cur.fetchone()[0]
                conn.commit()
                conn.close()
                return ok({"id": new_id})

            if action == "add_item":
                cur.execute(f"INSERT INTO {SCHEMA}.price_items (section_id, name, price, sort_order, description) VALUES (%s,%s,%s,%s,%s) RETURNING id", (body.get("section_id"), body.get("name"), body.get("price"), body.get("sort_order", 0), body.get("description", "")))
                new_id = cur.fetchone()[0]
                conn.commit()
                conn.close()
                return ok({"id": new_id})

            if action == "update_item":
                cur.execute(f"UPDATE {SCHEMA}.price_items SET name=%s, price=%s, description=%s WHERE id=%s", (body.get("name"), body.get("price"), body.get("description", ""), body.get("id")))
                conn.commit()
                conn.close()
                return ok({"ok": True})

            if action == "delete_item":
                cur.execute(f"DELETE FROM {SCHEMA}.price_items WHERE id=%s", (body.get("id"),))
                conn.commit()
                conn.close()
                return ok({"ok": True})

            if action == "update_section":
                cur.execute(f"UPDATE {SCHEMA}.price_sections SET title=%s, icon=%s WHERE id=%s", (body.get("title"), body.get("icon"), body.get("id")))
                conn.commit()
                conn.close()
                return ok({"ok": True})

            conn.close()
            return err("Неизвестное действие")

    conn.close()
    return err("Раздел не найден", 404)