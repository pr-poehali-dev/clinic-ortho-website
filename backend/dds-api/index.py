"""API учёта ДДС (движение денежных средств): счета, статьи, операции, отчёты. Доступ по паролю X-Dds-Password."""
import json
import os
import hmac
from datetime import date
from decimal import Decimal
import psycopg2

SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "t_p48876731_clinic_ortho_website")
CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Dds-Password",
    "Access-Control-Max-Age": "86400",
}


def resp(data, code=200):
    return {
        "statusCode": code,
        "headers": {**CORS, "Content-Type": "application/json"},
        "body": json.dumps(data, ensure_ascii=False, default=lambda o: float(o) if isinstance(o, Decimal) else str(o)),
    }


def esc(v) -> str:
    return "'" + str(v).replace("'", "''") + "'"


def to_int(v):
    if v in (None, "", "null"):
        return None
    return int(v)


def to_date(v) -> str:
    return date.fromisoformat(str(v)[:10]).isoformat()


def to_amount(v) -> Decimal:
    a = Decimal(str(v).replace(",", ".").replace(" ", ""))
    if a <= 0:
        raise ValueError("amount")
    return a.quantize(Decimal("0.01"))


def rows(cur, sql):
    cur.execute(sql)
    cols = [c[0] for c in cur.description]
    return [dict(zip(cols, r)) for r in cur.fetchall()]


def balances(cur, until=None):
    cond = f" AND t.op_date <= {esc(until)}" if until else ""
    return rows(cur, f"""
        SELECT a.id, a.name, a.opening_balance,
          a.opening_balance
          + COALESCE((SELECT SUM(CASE WHEN t.kind='income' THEN t.amount WHEN t.kind IN ('expense','transfer') THEN -t.amount END)
                      FROM {SCHEMA}.dds_transactions t WHERE t.account_id=a.id AND NOT t.is_archived{cond}),0)
          + COALESCE((SELECT SUM(t.amount) FROM {SCHEMA}.dds_transactions t
                      WHERE t.to_account_id=a.id AND t.kind='transfer' AND NOT t.is_archived{cond}),0) AS balance
        FROM {SCHEMA}.dds_accounts a WHERE a.is_active ORDER BY a.sort_order, a.id
    """)


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    headers = {k.lower(): v for k, v in (event.get("headers") or {}).items()}
    expected = os.environ.get("DDS_PASSWORD", "")
    given = headers.get("x-dds-password", "")
    if not expected or not hmac.compare_digest(given.encode(), expected.encode()):
        return resp({"error": "Неверный пароль"}, 403)

    method = event.get("httpMethod", "GET")
    params = event.get("queryStringParameters") or {}
    body = json.loads(event.get("body") or "{}") if method in ("POST", "PUT", "DELETE") else {}
    action = params.get("action") or body.get("action") or ""

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    conn.autocommit = True
    cur = conn.cursor()
    try:
        if action == "login":
            return resp({"ok": True})

        if action == "dictionaries":
            return resp({
                "accounts": rows(cur, f"SELECT id, name, opening_balance, sort_order, is_active FROM {SCHEMA}.dds_accounts ORDER BY sort_order, id"),
                "categories": rows(cur, f"SELECT id, name, kind, sort_order, is_active FROM {SCHEMA}.dds_categories ORDER BY kind, sort_order, id"),
            })

        if action == "transactions" and method == "GET":
            date_from = to_date(params["from"])
            date_to = to_date(params["to"])
            cond = f"t.op_date BETWEEN {esc(date_from)} AND {esc(date_to)} AND NOT t.is_archived"
            if params.get("account_id"):
                aid = to_int(params["account_id"])
                cond += f" AND (t.account_id={aid} OR t.to_account_id={aid})"
            if params.get("kind") in ("income", "expense", "transfer"):
                cond += f" AND t.kind={esc(params['kind'])}"
            if params.get("category_id"):
                cond += f" AND t.category_id={to_int(params['category_id'])}"
            return resp(rows(cur, f"""
                SELECT t.id, t.op_date, t.kind, t.amount, t.account_id, t.to_account_id, t.category_id, t.comment,
                       a.name AS account_name, ta.name AS to_account_name, c.name AS category_name
                FROM {SCHEMA}.dds_transactions t
                JOIN {SCHEMA}.dds_accounts a ON a.id=t.account_id
                LEFT JOIN {SCHEMA}.dds_accounts ta ON ta.id=t.to_account_id
                LEFT JOIN {SCHEMA}.dds_categories c ON c.id=t.category_id
                WHERE {cond}
                ORDER BY t.op_date DESC, t.id DESC
            """))

        if action == "transaction" and method in ("POST", "PUT"):
            kind = body.get("kind")
            if kind not in ("income", "expense", "transfer"):
                return resp({"error": "Неверный тип операции"}, 400)
            op_date = to_date(body["op_date"])
            amount = to_amount(body["amount"])
            account_id = to_int(body.get("account_id"))
            to_account_id = to_int(body.get("to_account_id")) if kind == "transfer" else None
            category_id = to_int(body.get("category_id")) if kind != "transfer" else None
            if not account_id:
                return resp({"error": "Укажите счёт"}, 400)
            if kind == "transfer" and (not to_account_id or to_account_id == account_id):
                return resp({"error": "Укажите другой счёт для перевода"}, 400)
            if kind != "transfer" and not category_id:
                return resp({"error": "Укажите статью"}, 400)
            comment = str(body.get("comment") or "")[:500]
            to_acc_sql = str(to_account_id) if to_account_id else "NULL"
            cat_sql = str(category_id) if category_id else "NULL"
            if method == "POST":
                cur.execute(f"""INSERT INTO {SCHEMA}.dds_transactions (op_date, kind, amount, account_id, to_account_id, category_id, comment)
                    VALUES ({esc(op_date)}, {esc(kind)}, {amount}, {account_id}, {to_acc_sql}, {cat_sql}, {esc(comment)}) RETURNING id""")
                return resp({"id": cur.fetchone()[0]})
            tid = to_int(body.get("id"))
            cur.execute(f"""UPDATE {SCHEMA}.dds_transactions SET op_date={esc(op_date)}, kind={esc(kind)}, amount={amount},
                account_id={account_id}, to_account_id={to_acc_sql}, category_id={cat_sql}, comment={esc(comment)} WHERE id={tid}""")
            return resp({"id": tid})

        if action == "transaction" and method == "DELETE":
            tid = to_int(body.get("id"))
            cur.execute(f"UPDATE {SCHEMA}.dds_transactions SET is_archived=true WHERE id={tid}")
            return resp({"ok": True})

        if action == "account" and method in ("POST", "PUT"):
            name = str(body.get("name") or "").strip()[:100]
            if not name:
                return resp({"error": "Укажите название"}, 400)
            opening = Decimal(str(body.get("opening_balance") or 0).replace(",", ".").replace(" ", "")).quantize(Decimal("0.01"))
            active = "true" if body.get("is_active", True) else "false"
            if method == "POST":
                cur.execute(f"INSERT INTO {SCHEMA}.dds_accounts (name, opening_balance, sort_order) VALUES ({esc(name)}, {opening}, (SELECT COALESCE(MAX(sort_order),0)+1 FROM {SCHEMA}.dds_accounts)) RETURNING id")
                return resp({"id": cur.fetchone()[0]})
            aid = to_int(body.get("id"))
            cur.execute(f"UPDATE {SCHEMA}.dds_accounts SET name={esc(name)}, opening_balance={opening}, is_active={active} WHERE id={aid}")
            return resp({"id": aid})

        if action == "category" and method in ("POST", "PUT"):
            name = str(body.get("name") or "").strip()[:150]
            kind = body.get("kind")
            if not name or kind not in ("income", "expense"):
                return resp({"error": "Укажите название и тип"}, 400)
            active = "true" if body.get("is_active", True) else "false"
            if method == "POST":
                cur.execute(f"INSERT INTO {SCHEMA}.dds_categories (name, kind, sort_order) VALUES ({esc(name)}, {esc(kind)}, (SELECT COALESCE(MAX(sort_order),0)+1 FROM {SCHEMA}.dds_categories WHERE kind={esc(kind)})) RETURNING id")
                return resp({"id": cur.fetchone()[0]})
            cid = to_int(body.get("id"))
            cur.execute(f"UPDATE {SCHEMA}.dds_categories SET name={esc(name)}, is_active={active} WHERE id={cid}")
            return resp({"id": cid})

        if action == "report":
            date_from = to_date(params["from"])
            date_to = to_date(params["to"])
            period = f"t.op_date BETWEEN {esc(date_from)} AND {esc(date_to)} AND NOT t.is_archived"
            by_category = rows(cur, f"""
                SELECT c.id, c.name, c.kind, SUM(t.amount) AS total
                FROM {SCHEMA}.dds_transactions t JOIN {SCHEMA}.dds_categories c ON c.id=t.category_id
                WHERE {period} AND t.kind IN ('income','expense')
                GROUP BY c.id, c.name, c.kind, c.sort_order ORDER BY c.kind DESC, total DESC
            """)
            by_month = rows(cur, f"""
                SELECT to_char(t.op_date,'YYYY-MM') AS month,
                  COALESCE(SUM(CASE WHEN t.kind='income' THEN t.amount END),0) AS income,
                  COALESCE(SUM(CASE WHEN t.kind='expense' THEN t.amount END),0) AS expense
                FROM {SCHEMA}.dds_transactions t WHERE {period} AND t.kind IN ('income','expense')
                GROUP BY 1 ORDER BY 1
            """)
            cur.execute(f"SELECT (DATE {esc(date_from)} - 1)::text")
            day_before = cur.fetchone()[0]
            return resp({
                "by_category": by_category,
                "by_month": by_month,
                "balances_start": balances(cur, day_before),
                "balances_end": balances(cur, date_to),
                "balances_now": balances(cur),
            })

        return resp({"error": "Неизвестное действие"}, 400)
    except (KeyError, ValueError, ArithmeticError):
        return resp({"error": "Проверьте правильность заполнения полей"}, 400)
    finally:
        cur.close()
        conn.close()
