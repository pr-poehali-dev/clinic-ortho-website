"""Чтение и сохранение настроек сайта через БД"""
import json
import os
import psycopg2


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def handler(event: dict, context) -> dict:
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    method = event.get("httpMethod", "GET")

    if method == "GET":
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("SELECT key, value FROM site_settings ORDER BY key")
        rows = cur.fetchall()
        conn.close()
        settings = {row[0]: row[1] for row in rows}
        return {"statusCode": 200, "headers": cors, "body": json.dumps(settings, ensure_ascii=False)}

    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        password = body.get("password", "")
        updates = body.get("settings", {})

        conn = get_conn()
        cur = conn.cursor()
        cur.execute("SELECT value FROM site_settings WHERE key = 'admin.password'")
        row = cur.fetchone()
        if not row or row[0] != password:
            conn.close()
            return {"statusCode": 403, "headers": cors, "body": json.dumps({"error": "Неверный пароль"})}

        for key, value in updates.items():
            if key == "admin.password":
                continue
            cur.execute(
                "INSERT INTO site_settings (key, value, updated_at) VALUES (%s, %s, NOW()) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()",
                (key, value)
            )
        conn.commit()
        conn.close()
        return {"statusCode": 200, "headers": cors, "body": json.dumps({"ok": True})}

    return {"statusCode": 405, "headers": cors, "body": ""}
