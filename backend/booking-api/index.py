"""
API для онлайн-записи пациентов: специалисты, расписание, запись, отмена.
"""
import json
import os
import uuid
from datetime import datetime, date, time, timedelta
import psycopg2

SCHEMA = "t_p48876731_clinic_ortho_website"
CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-User-Id, X-Auth-Token",
}


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")
    path = event.get("path", "/")
    params = event.get("queryStringParameters") or {}

    # GET /specialists
    if method == "GET" and path.endswith("/specialists"):
        return get_specialists()

    # GET /slots?specialist_id=1&date=2026-04-10
    if method == "GET" and path.endswith("/slots"):
        return get_slots(params)

    # GET /schedule?from=2026-04-08&to=2026-04-22  (расписание для выбора дат)
    if method == "GET" and path.endswith("/schedule"):
        return get_schedule(params)

    # POST /book
    if method == "POST" and path.endswith("/book"):
        body = json.loads(event.get("body") or "{}")
        return book_appointment(body)

    # POST /cancel
    if method == "POST" and path.endswith("/cancel"):
        body = json.loads(event.get("body") or "{}")
        return cancel_appointment(body)

    # GET /appointments?specialist_id=1&date=2026-04-10 (для админки)
    if method == "GET" and path.endswith("/appointments"):
        return get_appointments(params)

    # POST /admin/schedule  — добавить рабочий день
    if method == "POST" and path.endswith("/admin/schedule"):
        body = json.loads(event.get("body") or "{}")
        return admin_add_schedule(body)

    # POST /admin/block  — заблокировать слот
    if method == "POST" and path.endswith("/admin/block"):
        body = json.loads(event.get("body") or "{}")
        return admin_block_slot(body)

    # POST /admin/unblock  — разблокировать слот
    if method == "POST" and path.endswith("/admin/unblock"):
        body = json.loads(event.get("body") or "{}")
        return admin_unblock_slot(body)

    # PUT /admin/appointment — изменить статус записи
    if method == "PUT" and path.endswith("/admin/appointment"):
        body = json.loads(event.get("body") or "{}")
        return admin_update_appointment(body)

    return {"statusCode": 404, "headers": CORS, "body": json.dumps({"error": "Not found"})}


def get_specialists():
    conn = get_conn()
    cur = conn.cursor()
    cur.execute(f"""
        SELECT id, name, specialty, specialty_type, is_active
        FROM {SCHEMA}.booking_specialists
        WHERE is_active = true
        ORDER BY id
    """)
    rows = cur.fetchall()
    conn.close()
    specialists = [
        {"id": r[0], "name": r[1], "specialty": r[2], "specialty_type": r[3], "is_active": r[4]}
        for r in rows
    ]
    return {"statusCode": 200, "headers": CORS, "body": json.dumps(specialists, ensure_ascii=False)}


def get_schedule(params):
    specialist_id = params.get("specialist_id")
    from_date = params.get("from", str(date.today()))
    to_date = params.get("to", str(date.today() + timedelta(days=13)))

    conn = get_conn()
    cur = conn.cursor()

    if specialist_id:
        cur.execute(f"""
            SELECT specialist_id, work_date, start_time, end_time
            FROM {SCHEMA}.booking_schedules
            WHERE specialist_id = {int(specialist_id)}
              AND work_date BETWEEN '{from_date}' AND '{to_date}'
              AND is_active = true
            ORDER BY work_date
        """)
    else:
        cur.execute(f"""
            SELECT specialist_id, work_date, start_time, end_time
            FROM {SCHEMA}.booking_schedules
            WHERE work_date BETWEEN '{from_date}' AND '{to_date}'
              AND is_active = true
            ORDER BY work_date, specialist_id
        """)

    rows = cur.fetchall()
    conn.close()
    schedule = [
        {
            "specialist_id": r[0],
            "work_date": str(r[1]),
            "start_time": str(r[2])[:5],
            "end_time": str(r[3])[:5],
        }
        for r in rows
    ]
    return {"statusCode": 200, "headers": CORS, "body": json.dumps(schedule, ensure_ascii=False)}


def get_slots(params):
    specialist_id = params.get("specialist_id")
    slot_date = params.get("date")

    if not specialist_id or not slot_date:
        return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "specialist_id and date required"})}

    conn = get_conn()
    cur = conn.cursor()

    # Получаем специалиста для определения длительности
    cur.execute(f"""
        SELECT specialty_type FROM {SCHEMA}.booking_specialists WHERE id = {int(specialist_id)}
    """)
    spec = cur.fetchone()
    if not spec:
        conn.close()
        return {"statusCode": 404, "headers": CORS, "body": json.dumps({"error": "Specialist not found"})}

    # Для массажиста — слоты по 10 минут, для врача — по 40 минут
    duration = 10 if spec[0] == "masseur" else 40

    # Получаем рабочие часы
    cur.execute(f"""
        SELECT start_time, end_time FROM {SCHEMA}.booking_schedules
        WHERE specialist_id = {int(specialist_id)} AND work_date = '{slot_date}' AND is_active = true
    """)
    schedule = cur.fetchone()
    if not schedule:
        conn.close()
        return {"statusCode": 200, "headers": CORS, "body": json.dumps({"slots": [], "duration": duration})}

    start_h, start_m = map(int, str(schedule[0])[:5].split(":"))
    end_h, end_m = map(int, str(schedule[1])[:5].split(":"))

    start_minutes = start_h * 60 + start_m
    end_minutes = end_h * 60 + end_m

    # Получаем занятые записи
    cur.execute(f"""
        SELECT appointment_time, duration_minutes FROM {SCHEMA}.booking_appointments
        WHERE specialist_id = {int(specialist_id)}
          AND appointment_date = '{slot_date}'
          AND status != 'cancelled'
    """)
    booked = cur.fetchall()
    booked_ranges = []
    for b in booked:
        t = str(b[0])[:5]
        bh, bm = map(int, t.split(":"))
        bstart = bh * 60 + bm
        booked_ranges.append((bstart, bstart + b[1]))

    # Получаем заблокированные слоты
    cur.execute(f"""
        SELECT block_time FROM {SCHEMA}.booking_blocked_slots
        WHERE specialist_id = {int(specialist_id)} AND block_date = '{slot_date}'
    """)
    blocked = [str(r[0])[:5] for r in cur.fetchall()]
    blocked_minutes = set()
    for bt in blocked:
        bh, bm = map(int, bt.split(":"))
        blocked_minutes.add(bh * 60 + bm)

    conn.close()

    # Генерируем слоты
    slots = []
    current = start_minutes
    while current + duration <= end_minutes:
        h = current // 60
        m = current % 60
        time_str = f"{h:02d}:{m:02d}"

        # Проверяем занятость
        is_busy = False
        if current in blocked_minutes:
            is_busy = True
        for bstart, bend in booked_ranges:
            if current < bend and current + duration > bstart:
                is_busy = True
                break

        slots.append({"time": time_str, "available": not is_busy})
        current += duration

    return {
        "statusCode": 200,
        "headers": CORS,
        "body": json.dumps({"slots": slots, "duration": duration}, ensure_ascii=False),
    }


def book_appointment(body):
    required = ["specialist_id", "date", "time", "patient_name", "patient_phone", "notify_channel"]
    for f in required:
        if not body.get(f):
            return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": f"Field '{f}' is required"})}

    conn = get_conn()
    cur = conn.cursor()

    spec_id = int(body["specialist_id"])
    appt_date = body["date"]
    appt_time = body["time"]

    # Определяем длительность
    cur.execute(f"SELECT specialty_type FROM {SCHEMA}.booking_specialists WHERE id = {spec_id}")
    spec = cur.fetchone()
    if not spec:
        conn.close()
        return {"statusCode": 404, "headers": CORS, "body": json.dumps({"error": "Specialist not found"})}

    duration = body.get("duration_minutes", 10 if spec[0] == "masseur" else 40)

    # Проверяем что слот свободен
    cur.execute(f"""
        SELECT id FROM {SCHEMA}.booking_appointments
        WHERE specialist_id = {spec_id}
          AND appointment_date = '{appt_date}'
          AND appointment_time = '{appt_time}'
          AND status != 'cancelled'
    """)
    if cur.fetchone():
        conn.close()
        return {"statusCode": 409, "headers": CORS, "body": json.dumps({"error": "Slot already booked"})}

    cancel_token = str(uuid.uuid4())
    patient_name = body["patient_name"].replace("'", "''")
    patient_phone = body["patient_phone"].replace("'", "''")
    patient_comment = (body.get("patient_comment") or "").replace("'", "''")
    notify_channel = body["notify_channel"]
    notify_contact = (body.get("notify_contact") or "").replace("'", "''")

    cur.execute(f"""
        INSERT INTO {SCHEMA}.booking_appointments
            (specialist_id, appointment_date, appointment_time, duration_minutes,
             patient_name, patient_phone, patient_comment, notify_channel, notify_contact, cancel_token)
        VALUES
            ({spec_id}, '{appt_date}', '{appt_time}', {int(duration)},
             '{patient_name}', '{patient_phone}', '{patient_comment}',
             '{notify_channel}', '{notify_contact}', '{cancel_token}')
        RETURNING id
    """)
    appt_id = cur.fetchone()[0]
    conn.commit()
    conn.close()

    return {
        "statusCode": 200,
        "headers": CORS,
        "body": json.dumps({
            "success": True,
            "appointment_id": appt_id,
            "cancel_token": cancel_token,
        }, ensure_ascii=False),
    }


def cancel_appointment(body):
    token = body.get("cancel_token")
    if not token:
        return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "cancel_token required"})}

    token = token.replace("'", "''")
    conn = get_conn()
    cur = conn.cursor()
    cur.execute(f"""
        UPDATE {SCHEMA}.booking_appointments
        SET status = 'cancelled'
        WHERE cancel_token = '{token}' AND status = 'confirmed'
        RETURNING id
    """)
    row = cur.fetchone()
    conn.commit()
    conn.close()

    if not row:
        return {"statusCode": 404, "headers": CORS, "body": json.dumps({"error": "Appointment not found or already cancelled"})}

    return {"statusCode": 200, "headers": CORS, "body": json.dumps({"success": True})}


def get_appointments(params):
    specialist_id = params.get("specialist_id")
    appt_date = params.get("date")
    status = params.get("status", "confirmed")

    conn = get_conn()
    cur = conn.cursor()

    where = []
    if specialist_id:
        where.append(f"a.specialist_id = {int(specialist_id)}")
    if appt_date:
        where.append(f"a.appointment_date = '{appt_date}'")
    if status and status != "all":
        where.append(f"a.status = '{status}'")

    where_clause = "WHERE " + " AND ".join(where) if where else ""

    cur.execute(f"""
        SELECT a.id, s.name, s.specialty, a.appointment_date, a.appointment_time,
               a.duration_minutes, a.patient_name, a.patient_phone, a.patient_comment,
               a.notify_channel, a.status, a.created_at, a.cancel_token
        FROM {SCHEMA}.booking_appointments a
        JOIN {SCHEMA}.booking_specialists s ON s.id = a.specialist_id
        {where_clause}
        ORDER BY a.appointment_date, a.appointment_time
    """)
    rows = cur.fetchall()
    conn.close()

    appointments = [
        {
            "id": r[0],
            "specialist_name": r[1],
            "specialty": r[2],
            "date": str(r[3]),
            "time": str(r[4])[:5],
            "duration": r[5],
            "patient_name": r[6],
            "patient_phone": r[7],
            "comment": r[8],
            "notify_channel": r[9],
            "status": r[10],
            "created_at": str(r[11]),
            "cancel_token": r[12],
        }
        for r in rows
    ]
    return {"statusCode": 200, "headers": CORS, "body": json.dumps(appointments, ensure_ascii=False)}


def admin_add_schedule(body):
    specialist_id = body.get("specialist_id")
    work_date = body.get("work_date")
    start_time = body.get("start_time", "09:00")
    end_time = body.get("end_time", "19:00")

    if not specialist_id or not work_date:
        return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "specialist_id and work_date required"})}

    conn = get_conn()
    cur = conn.cursor()
    cur.execute(f"""
        INSERT INTO {SCHEMA}.booking_schedules (specialist_id, work_date, start_time, end_time)
        VALUES ({int(specialist_id)}, '{work_date}', '{start_time}', '{end_time}')
        ON CONFLICT (specialist_id, work_date)
        DO UPDATE SET start_time = '{start_time}', end_time = '{end_time}', is_active = true
        RETURNING id
    """)
    conn.commit()
    conn.close()
    return {"statusCode": 200, "headers": CORS, "body": json.dumps({"success": True})}


def admin_block_slot(body):
    specialist_id = body.get("specialist_id")
    block_date = body.get("block_date")
    block_time = body.get("block_time")
    reason = (body.get("reason") or "").replace("'", "''")

    if not specialist_id or not block_date or not block_time:
        return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "specialist_id, block_date, block_time required"})}

    conn = get_conn()
    cur = conn.cursor()
    cur.execute(f"""
        INSERT INTO {SCHEMA}.booking_blocked_slots (specialist_id, block_date, block_time, reason)
        VALUES ({int(specialist_id)}, '{block_date}', '{block_time}', '{reason}')
        RETURNING id
    """)
    conn.commit()
    conn.close()
    return {"statusCode": 200, "headers": CORS, "body": json.dumps({"success": True})}


def admin_unblock_slot(body):
    slot_id = body.get("id")
    if not slot_id:
        return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "id required"})}

    conn = get_conn()
    cur = conn.cursor()
    cur.execute(f"UPDATE {SCHEMA}.booking_blocked_slots SET reason = 'unblocked' WHERE id = {int(slot_id)}")
    conn.commit()
    conn.close()
    return {"statusCode": 200, "headers": CORS, "body": json.dumps({"success": True})}


def admin_update_appointment(body):
    appt_id = body.get("id")
    status = body.get("status")

    if not appt_id or not status:
        return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "id and status required"})}

    allowed = ("confirmed", "cancelled", "completed")
    if status not in allowed:
        return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "Invalid status"})}

    conn = get_conn()
    cur = conn.cursor()
    cur.execute(f"""
        UPDATE {SCHEMA}.booking_appointments SET status = '{status}' WHERE id = {int(appt_id)}
    """)
    conn.commit()
    conn.close()
    return {"statusCode": 200, "headers": CORS, "body": json.dumps({"success": True})}
