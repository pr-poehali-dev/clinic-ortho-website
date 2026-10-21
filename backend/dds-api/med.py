"""Учёт медрасходки: справочник препаратов, приход/расход по дням, остатки и стоимость."""
from datetime import date, timedelta
from decimal import Decimal

MED_START = date(2026, 10, 1)
MED_END = date(2027, 12, 31)
MED_ROLES = ("none", "view", "edit")


def med_can_view(sess) -> bool:
    return sess["role"] == "owner" or sess.get("med_role") in ("view", "edit")


def med_can_edit(sess) -> bool:
    return sess["role"] == "owner" or sess.get("med_role") == "edit"


def month_bounds(month: str):
    y, m = map(int, month.split("-"))
    first = date(y, m, 1)
    last = date(y + (m == 12), m % 12 + 1, 1) - timedelta(days=1)
    return first, last


def _items(cur, schema, rows, esc, active_only=True):
    cond = "WHERE is_active" if active_only else ""
    return rows(cur, f"""SELECT id, name, start_stock, pack_price, pack_qty, min_stock, exclude_control, is_active, sort_order
        FROM {schema}.med_items {cond} ORDER BY sort_order, id""")


def _balance_before(cur, schema, d: date):
    cur.execute(f"""SELECT item_id, COALESCE(SUM(CASE WHEN kind='in' THEN qty ELSE -qty END),0)
        FROM {schema}.med_moves WHERE op_date < '{d.isoformat()}' GROUP BY item_id""")
    return {r[0]: int(r[1]) for r in cur.fetchall()}


def med_month(cur, schema, rows, esc, month: str):
    first, last = month_bounds(month)
    items = _items(cur, schema, rows, esc)
    before = _balance_before(cur, schema, first)
    moves = rows(cur, f"""SELECT item_id, op_date, kind, qty FROM {schema}.med_moves
        WHERE op_date BETWEEN {esc(first)} AND {esc(last)}""")
    by_item = {}
    for mv in moves:
        by_item.setdefault(mv["item_id"], {"in": {}, "out": {}})[mv["kind"]][mv["op_date"].day] = int(mv["qty"])
    result = []
    for it in items:
        ins = by_item.get(it["id"], {}).get("in", {})
        outs = by_item.get(it["id"], {}).get("out", {})
        start = int(it["start_stock"]) + before.get(it["id"], 0)
        total_in, total_out = sum(ins.values()), sum(outs.values())
        pack_qty = max(int(it["pack_qty"] or 1), 1)
        unit = (Decimal(it["pack_price"]) / pack_qty).quantize(Decimal("0.01"))
        result.append({
            **it,
            "unit_price": unit,
            "start": start,
            "in_days": {str(k): v for k, v in ins.items()},
            "out_days": {str(k): v for k, v in outs.items()},
            "total_in": total_in,
            "total_out": total_out,
            "end": start + total_in - total_out,
            "spent_sum": unit * total_out,
        })
    return {"month": month, "days": last.day, "items": result, "start": MED_START.isoformat(), "end": MED_END.isoformat()}


def med_items_list(cur, schema, rows, esc):
    items = _items(cur, schema, rows, esc, active_only=False)
    bal = _balance_before(cur, schema, MED_END + timedelta(days=1))
    for it in items:
        pack_qty = max(int(it["pack_qty"] or 1), 1)
        it["stock"] = int(it["start_stock"]) + bal.get(it["id"], 0)
        it["unit_price"] = (Decimal(it["pack_price"]) / pack_qty).quantize(Decimal("0.01"))
    return items


def med_cell(cur, schema, esc, body, who):
    item_id = int(body["item_id"])
    d = date.fromisoformat(str(body["date"])[:10])
    kind = body.get("kind")
    if kind not in ("in", "out") or d < MED_START or d > MED_END:
        raise ValueError("cell")
    qty = int(body.get("qty") or 0)
    if qty < 0:
        raise ValueError("qty")
    if qty == 0:
        cur.execute(f"DELETE FROM {schema}.med_moves WHERE item_id={item_id} AND op_date={esc(d)} AND kind={esc(kind)}")
    else:
        cur.execute(f"""INSERT INTO {schema}.med_moves (item_id, op_date, kind, qty, updated_by, updated_at)
            VALUES ({item_id}, {esc(d)}, {esc(kind)}, {qty}, {esc(who)}, now())
            ON CONFLICT (item_id, op_date, kind) DO UPDATE SET qty=EXCLUDED.qty, updated_by=EXCLUDED.updated_by, updated_at=now()""")


def _num(v, kind=int):
    if v in (None, ""):
        return kind(0)
    return kind(str(v).replace(",", ".").replace(" ", ""))


def med_item_save(cur, schema, esc, method, body, who):
    if method == "POST":
        name = str(body.get("name") or "").strip()[:200]
        if not name:
            raise ValueError("name")
        cur.execute(f"SELECT id FROM {schema}.med_items WHERE lower(name)=lower({esc(name)})")
        ex = cur.fetchone()
        if ex:
            cur.execute(f"UPDATE {schema}.med_items SET is_active=true WHERE id={ex[0]}")
            return ex[0]
        price = Decimal(_num(body.get("pack_price"), Decimal)).quantize(Decimal("0.01"))
        pack_qty = max(_num(body.get("pack_qty")), 1)
        cur.execute(f"""INSERT INTO {schema}.med_items (name, start_stock, pack_price, pack_qty, min_stock, sort_order, created_by)
            VALUES ({esc(name)}, {_num(body.get('start_stock'))}, {price}, {pack_qty}, {max(_num(body.get('min_stock')), 0)},
            (SELECT COALESCE(MAX(sort_order),0)+1 FROM {schema}.med_items), {esc(who)}) RETURNING id""")
        return cur.fetchone()[0]
    iid = int(body["id"])
    sets = []
    if body.get("name"):
        sets.append(f"name={esc(str(body['name']).strip()[:200])}")
    if "pack_price" in body:
        sets.append(f"pack_price={Decimal(_num(body['pack_price'], Decimal)).quantize(Decimal('0.01'))}")
    if "pack_qty" in body:
        sets.append(f"pack_qty={max(_num(body['pack_qty']), 1)}")
    if "min_stock" in body:
        sets.append(f"min_stock={max(_num(body['min_stock']), 0)}")
    if "start_stock" in body:
        sets.append(f"start_stock={_num(body['start_stock'])}")
    for f in ("exclude_control", "is_active"):
        if f in body:
            sets.append(f"{f}={'true' if body[f] else 'false'}")
    if sets:
        cur.execute(f"UPDATE {schema}.med_items SET {', '.join(sets)} WHERE id={iid}")
    return iid
