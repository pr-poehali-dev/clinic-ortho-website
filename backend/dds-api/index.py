"""API учёта ДДС клиники: вход сотрудников (2 часа), права, операции по кассе, расчёт таблицы по формулам."""
import json
import os
import hmac
import hashlib
import secrets
from datetime import date, datetime, timedelta, timezone
from decimal import Decimal
import psycopg2

SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "t_p48876731_clinic_ortho_website")
START = date(2026, 10, 1)
TZ = timezone(timedelta(hours=7))
SESSION_HOURS = 2
CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Auth-Token",
    "Access-Control-Max-Age": "86400",
}
ENTRY_TYPES = ("in_check", "in_cash", "in_transfer", "in_bank", "topup", "expense", "collection", "bank_deposit")
ROLES = ("view", "edit", "full")
ZERO = Decimal("0")


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


def to_date(v) -> date:
    return date.fromisoformat(str(v)[:10])


def to_money(v) -> Decimal:
    return Decimal(str(v if v not in (None, "") else 0).replace(",", ".").replace(" ", "")).quantize(Decimal("0.01"))


def to_amount(v) -> Decimal:
    a = to_money(v)
    if a <= 0:
        raise ValueError("amount")
    return a


def today() -> date:
    return datetime.now(TZ).date()


def rows(cur, sql):
    cur.execute(sql)
    cols = [c[0] for c in cur.description]
    return [dict(zip(cols, r)) for r in cur.fetchall()]


def hash_password(password: str) -> str:
    salt = secrets.token_hex(16)
    h = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), 120000).hex()
    return f"{salt}${h}"


def check_password(password: str, stored: str) -> bool:
    salt, h = stored.split("$", 1)
    calc = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), 120000).hex()
    return hmac.compare_digest(calc, h)


def get_session(cur, token):
    if not token:
        return None
    cur.execute(f"""
        SELECT s.user_id, EXTRACT(EPOCH FROM (s.expires_at - now()))::int, u.name, u.is_active, u.role
        FROM {SCHEMA}.dds_sessions s LEFT JOIN {SCHEMA}.dds_users u ON u.id = s.user_id
        WHERE s.token = {esc(token)} AND s.expires_at > now()
    """)
    r = cur.fetchone()
    if not r:
        return None
    if r[0] is None:
        return {"role": "owner", "user_id": None, "name": "Владелец", "left": r[1]}
    if not r[3]:
        return None
    return {"role": r[4], "user_id": r[0], "name": r[2], "left": r[1]}


def is_full(sess) -> bool:
    return sess["role"] in ("owner", "full")


def can_write(sess) -> bool:
    return sess["role"] in ("owner", "full", "edit")


def can_write_date(sess, d: date) -> bool:
    if d < START:
        return False
    if is_full(sess):
        return True
    return sess["role"] == "edit" and d == today()


def entry_snapshot(cur, eid):
    r = rows(cur, f"SELECT id, op_date, entry_type, amount, category_id, comment, is_archived FROM {SCHEMA}.dds_entries WHERE id={eid}")
    return r[0] if r else None


def log_history(cur, eid, action, who):
    snap = entry_snapshot(cur, eid)
    payload = json.dumps(snap, ensure_ascii=False, default=lambda o: float(o) if isinstance(o, Decimal) else str(o))
    cur.execute(f"INSERT INTO {SCHEMA}.dds_entry_history (entry_id, action, snapshot, changed_by) VALUES ({eid}, {esc(action)}, {esc(payload)}, {esc(who)})")


def build_month(cur, month: str):
    y, m = map(int, month.split("-"))
    first = date(y, m, 1)
    last = date(y + (m == 12), m % 12 + 1, 1) - timedelta(days=1)
    if last < START:
        return {"days": [], "entries": []}

    sums = {}
    for r in rows(cur, f"""
        SELECT op_date, entry_type, SUM(amount) AS total FROM {SCHEMA}.dds_entries
        WHERE NOT is_archived AND op_date BETWEEN {esc(START)} AND {esc(last)}
        GROUP BY op_date, entry_type
    """):
        sums.setdefault(r["op_date"], {})[r["entry_type"]] = Decimal(r["total"])

    overrides = {r["op_date"]: r for r in rows(cur, f"""
        SELECT op_date, cash_check, cash FROM {SCHEMA}.dds_morning_balance
        WHERE is_active AND op_date BETWEEN {esc(START)} AND {esc(last)}
    """)}

    eve_check = eve_cash = need_bank = ZERO
    days = []
    d = START
    while d <= last:
        s = sums.get(d, {})
        ov = overrides.get(d)
        m_check = Decimal(ov["cash_check"]) if ov else eve_check
        m_cash = Decimal(ov["cash"]) if ov else eve_cash
        in_check, in_cash = s.get("in_check", ZERO), s.get("in_cash", ZERO)
        in_transfer, in_bank = s.get("in_transfer", ZERO), s.get("in_bank", ZERO)
        topup, expense = s.get("topup", ZERO), s.get("expense", ZERO)
        collection, deposit = s.get("collection", ZERO), s.get("bank_deposit", ZERO)
        total_in_cash = in_check + in_cash + in_transfer
        need_bank = need_bank + in_check - deposit
        eve_check = m_check + in_check - deposit
        eve_cash = m_cash + in_cash + topup - expense - collection
        if d >= first:
            days.append({
                "date": d.isoformat(),
                "morning_check": m_check,
                "morning_cash": m_cash,
                "morning_total": m_check + m_cash,
                "morning_manual": bool(ov),
                "in_check": in_check,
                "in_cash": in_cash,
                "in_transfer": in_transfer,
                "total_in_cash": total_in_cash,
                "in_bank": in_bank,
                "total_in_day": total_in_cash + in_bank,
                "topup": topup,
                "cash_in_register": total_in_cash + topup,
                "expense": expense,
                "collection": collection,
                "need_bank": need_bank,
                "bank_deposit": deposit,
                "evening_check": eve_check,
                "evening_cash": eve_cash,
                "evening_total": eve_check + eve_cash,
            })
        d += timedelta(days=1)

    entries = rows(cur, f"""
        SELECT e.id, e.op_date, e.entry_type, e.amount, e.category_id, c.name AS category_name, e.comment,
               e.created_by, e.created_at, e.updated_by, e.updated_at
        FROM {SCHEMA}.dds_entries e LEFT JOIN {SCHEMA}.dds_categories c ON c.id = e.category_id
        WHERE NOT e.is_archived AND e.op_date BETWEEN {esc(max(first, START))} AND {esc(last)}
        ORDER BY e.op_date, e.id
    """)
    return {"days": days, "entries": entries}


def handle_login(cur, body):
    login = str(body.get("login") or "").strip().lower()
    password = str(body.get("password") or "")
    user_id, role, name = None, None, None
    owner_pass = os.environ.get("DDS_PASSWORD", "")
    if login == "admin":
        if owner_pass and hmac.compare_digest(password.encode(), owner_pass.encode()):
            role, name = "owner", "Владелец"
    else:
        cur.execute(f"SELECT id, password_hash, role, name FROM {SCHEMA}.dds_users WHERE login={esc(login)} AND is_active")
        r = cur.fetchone()
        if r and check_password(password, r[1]):
            user_id, role, name = r[0], r[2], r[3]
    if not role:
        return resp({"error": "Неверный логин или пароль"}, 403)
    token = secrets.token_urlsafe(32)
    uid = str(user_id) if user_id else "NULL"
    cur.execute(f"INSERT INTO {SCHEMA}.dds_sessions (token, user_id, role, expires_at) VALUES ({esc(token)}, {uid}, {esc(role)}, now() + interval '{SESSION_HOURS} hours')")
    return resp({"token": token, "role": role, "name": name, "seconds_left": SESSION_HOURS * 3600})


def handle_users(cur, method, body, sess):
    if sess["role"] != "owner":
        return resp({"error": "Нет доступа"}, 403)
    if method == "GET":
        return resp(rows(cur, f"SELECT id, login, name, role, is_active, created_at FROM {SCHEMA}.dds_users ORDER BY is_active DESC, name"))
    if method == "POST":
        login = str(body.get("login") or "").strip().lower()
        name = str(body.get("name") or "").strip()[:150]
        password = str(body.get("password") or "")
        role = body.get("role")
        if not login or login == "admin" or not name or len(password) < 6 or role not in ROLES:
            return resp({"error": "Заполните имя, логин (не admin), пароль от 6 символов и права"}, 400)
        cur.execute(f"SELECT 1 FROM {SCHEMA}.dds_users WHERE login={esc(login)}")
        if cur.fetchone():
            return resp({"error": "Такой логин уже занят"}, 400)
        cur.execute(f"INSERT INTO {SCHEMA}.dds_users (login, name, password_hash, role) VALUES ({esc(login)}, {esc(name)}, {esc(hash_password(password))}, {esc(role)}) RETURNING id")
        return resp({"id": cur.fetchone()[0]})
    if method == "PUT":
        uid = to_int(body.get("id"))
        sets = []
        if body.get("name"):
            sets.append(f"name={esc(str(body['name']).strip()[:150])}")
        if body.get("role") in ROLES:
            sets.append(f"role={esc(body['role'])}")
        if "is_active" in body:
            sets.append(f"is_active={'true' if body['is_active'] else 'false'}")
        if body.get("password"):
            if len(str(body["password"])) < 6:
                return resp({"error": "Пароль должен быть от 6 символов"}, 400)
            sets.append(f"password_hash={esc(hash_password(str(body['password'])))}")
        if sets:
            cur.execute(f"UPDATE {SCHEMA}.dds_users SET {', '.join(sets)} WHERE id={uid}")
        if body.get("password") or body.get("role") or body.get("is_active") is False:
            cur.execute(f"UPDATE {SCHEMA}.dds_sessions SET expires_at = now() WHERE user_id={uid} AND expires_at > now()")
        return resp({"id": uid})
    return resp({"error": "Неизвестное действие"}, 400)


def handle_categories(cur, method, body, sess):
    if method == "GET":
        return resp(rows(cur, f"SELECT id, name, is_active FROM {SCHEMA}.dds_categories WHERE kind='expense' ORDER BY is_active DESC, sort_order, name"))
    if method == "POST":
        if not can_write(sess):
            return resp({"error": "У вас только просмотр"}, 403)
        name = str(body.get("name") or "").strip()[:150]
        if not name:
            return resp({"error": "Укажите название статьи"}, 400)
        cur.execute(f"SELECT id FROM {SCHEMA}.dds_categories WHERE kind='expense' AND lower(name)=lower({esc(name)})")
        ex = cur.fetchone()
        if ex:
            cur.execute(f"UPDATE {SCHEMA}.dds_categories SET is_active=true WHERE id={ex[0]}")
            return resp({"id": ex[0]})
        cur.execute(f"INSERT INTO {SCHEMA}.dds_categories (name, kind, sort_order) VALUES ({esc(name)}, 'expense', (SELECT COALESCE(MAX(sort_order),0)+1 FROM {SCHEMA}.dds_categories WHERE kind='expense')) RETURNING id")
        return resp({"id": cur.fetchone()[0]})
    if method == "PUT":
        if not is_full(sess):
            return resp({"error": "Править статьи может только сотрудник с полным доступом"}, 403)
        cid = to_int(body.get("id"))
        sets = []
        if body.get("name"):
            sets.append(f"name={esc(str(body['name']).strip()[:150])}")
        if "is_active" in body:
            sets.append(f"is_active={'true' if body['is_active'] else 'false'}")
        if sets:
            cur.execute(f"UPDATE {SCHEMA}.dds_categories SET {', '.join(sets)} WHERE id={cid} AND kind='expense'")
        return resp({"id": cid})
    return resp({"error": "Неизвестное действие"}, 400)


def handle_morning(cur, body, sess):
    if sess["role"] != "owner":
        return resp({"error": "Остаток на утро может менять только владелец"}, 403)
    d = to_date(body["op_date"])
    if d < START:
        return resp({"error": "Учёт ведётся с 01.10.2026"}, 400)
    who = sess["name"]
    if body.get("reset"):
        cur.execute(f"UPDATE {SCHEMA}.dds_morning_balance SET is_active=false, updated_by={esc(who)}, updated_at=now() WHERE op_date={esc(d)}")
        return resp({"ok": True})
    cc, c = to_money(body.get("cash_check")), to_money(body.get("cash"))
    cur.execute(f"""INSERT INTO {SCHEMA}.dds_morning_balance (op_date, cash_check, cash, updated_by, updated_at, is_active)
        VALUES ({esc(d)}, {cc}, {c}, {esc(who)}, now(), true)
        ON CONFLICT (op_date) DO UPDATE SET cash_check=EXCLUDED.cash_check, cash=EXCLUDED.cash,
        updated_by=EXCLUDED.updated_by, updated_at=now(), is_active=true""")
    return resp({"ok": True})


def handle_entry(cur, method, params, body, sess):
    who = sess["name"]
    if method == "GET":
        eid = to_int(params.get("id"))
        return resp(rows(cur, f"SELECT action, snapshot, changed_by, changed_at FROM {SCHEMA}.dds_entry_history WHERE entry_id={eid} ORDER BY id"))
    if not can_write(sess):
        return resp({"error": "У вас только просмотр"}, 403)

    if method == "DELETE":
        eid = to_int(body.get("id"))
        old = entry_snapshot(cur, eid)
        if not old or old["is_archived"]:
            return resp({"error": "Операция не найдена"}, 404)
        if not can_write_date(sess, old["op_date"]):
            return resp({"error": "Этот день закрыт для изменений"}, 403)
        cur.execute(f"UPDATE {SCHEMA}.dds_entries SET is_archived=true, updated_by={esc(who)}, updated_at=now() WHERE id={eid}")
        log_history(cur, eid, "delete", who)
        return resp({"ok": True})

    etype = body.get("entry_type")
    if etype not in ENTRY_TYPES:
        return resp({"error": "Неверный тип операции"}, 400)
    d = to_date(body["op_date"])
    amount = to_amount(body["amount"])
    if not can_write_date(sess, d):
        msg = "Можно вносить только за сегодняшний день" if sess["role"] == "edit" else "Учёт ведётся с 01.10.2026"
        return resp({"error": msg}, 403)
    cat = to_int(body.get("category_id")) if etype == "expense" else None
    if etype == "expense" and not cat:
        return resp({"error": "Выберите статью расхода"}, 400)
    comment = str(body.get("comment") or "").strip()[:500]
    cat_sql = str(cat) if cat else "NULL"

    if method == "POST":
        if not body.get("force"):
            cur.execute(f"""SELECT COUNT(*) FROM {SCHEMA}.dds_entries WHERE NOT is_archived AND op_date={esc(d)}
                AND entry_type={esc(etype)} AND amount={amount} AND category_id IS NOT DISTINCT FROM {cat_sql}""")
            if cur.fetchone()[0] > 0:
                return resp({"duplicate": True, "error": "За этот день уже есть такая же операция на эту сумму"}, 409)
        cur.execute(f"""INSERT INTO {SCHEMA}.dds_entries (op_date, entry_type, amount, category_id, comment, created_by)
            VALUES ({esc(d)}, {esc(etype)}, {amount}, {cat_sql}, {esc(comment)}, {esc(who)}) RETURNING id""")
        eid = cur.fetchone()[0]
        log_history(cur, eid, "create", who)
        return resp({"id": eid})

    if method == "PUT":
        eid = to_int(body.get("id"))
        old = entry_snapshot(cur, eid)
        if not old or old["is_archived"]:
            return resp({"error": "Операция не найдена"}, 404)
        if not can_write_date(sess, old["op_date"]):
            return resp({"error": "Этот день закрыт для изменений"}, 403)
        cur.execute(f"""UPDATE {SCHEMA}.dds_entries SET op_date={esc(d)}, entry_type={esc(etype)}, amount={amount},
            category_id={cat_sql}, comment={esc(comment)}, updated_by={esc(who)}, updated_at=now() WHERE id={eid}""")
        log_history(cur, eid, "update", who)
        return resp({"id": eid})
    return resp({"error": "Неизвестное действие"}, 400)


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")
    params = event.get("queryStringParameters") or {}
    headers = {k.lower(): v for k, v in (event.get("headers") or {}).items()}
    body = json.loads(event.get("body") or "{}") if method in ("POST", "PUT", "DELETE") else {}
    action = params.get("action") or body.get("action") or ""

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    conn.autocommit = True
    cur = conn.cursor()
    try:
        if action == "login" and method == "POST":
            return handle_login(cur, body)

        token = headers.get("x-auth-token", "")
        sess = get_session(cur, token)
        if not sess:
            return resp({"error": "Сессия истекла, войдите заново"}, 401)

        if action == "me":
            return resp({"role": sess["role"], "name": sess["name"], "seconds_left": sess["left"],
                         "today": today().isoformat(), "start": START.isoformat()})
        if action == "logout":
            cur.execute(f"UPDATE {SCHEMA}.dds_sessions SET expires_at = now() WHERE token={esc(token)}")
            return resp({"ok": True})
        if action == "users":
            return handle_users(cur, method, body, sess)
        if action == "categories":
            return handle_categories(cur, method, body, sess)
        if action == "month":
            month = params.get("month") or today().strftime("%Y-%m")
            data = build_month(cur, month)
            data["month"] = month
            return resp(data)
        if action == "morning" and method in ("POST", "PUT"):
            return handle_morning(cur, body, sess)
        if action == "entry":
            return handle_entry(cur, method, params, body, sess)
        return resp({"error": "Неизвестное действие"}, 400)
    except (KeyError, ValueError, ArithmeticError, TypeError):
        return resp({"error": "Проверьте правильность заполнения полей"}, 400)
    finally:
        cur.close()
        conn.close()
