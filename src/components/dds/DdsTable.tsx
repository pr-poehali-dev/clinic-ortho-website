import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import { Category, DayRow, Entry, EntryType, WEEKDAYS, money } from "./api";
import { RowDef, SECTIONS, rowTotal } from "./rows";

interface Props {
  days: DayRow[];
  entries: Entry[];
  categories: Category[];
  today: string;
  canWrite: boolean;
  isOwner: boolean;
  onCell: (date: string, type: EntryType) => void;
  onMorning: (day: DayRow) => void;
}

const TONE: Record<string, string> = {
  accent: "bg-amber-50",
  warn: "bg-orange-100/70",
  info: "bg-sky-50",
  dark: "bg-indigo-900 text-white",
};

const dayTint = (date: string, today: string) =>
  !today ? "" : date < today ? "bg-slate-500/[0.09]" : date > today ? "bg-emerald-500/[0.08]" : "";

const short = (n: number) =>
  new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(Math.round(n)).replace(/\s/g, "\u2009");

function Num({ v, strong, full, dark }: { v: number; strong?: boolean; full?: boolean; dark?: boolean }) {
  const n = Number(v) || 0;
  if (n === 0) return <span className={`relative ${dark ? "text-indigo-300/60" : "text-slate-300"}`}>0</span>;
  return (
    <span title={money(n)} className={`relative ${n < 0 ? (dark ? "text-red-300" : "text-red-600") : ""} ${strong ? "font-semibold" : ""}`}>
      {full ? money(n) : short(n)}
    </span>
  );
}

export default function DdsTable({ days, entries, categories, today, canWrite, isOwner, onCell, onMorning }: Props) {
  const [expOpen, setExpOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const todayRef = useRef<HTMLTableCellElement>(null);

  useEffect(() => {
    const box = scrollRef.current;
    const cell = todayRef.current;
    if (box && cell) box.scrollLeft = Math.max(0, cell.offsetLeft - box.clientWidth / 2);
  }, [days]);

  const expenseByCat = useMemo(() => {
    const map = new Map<number | null, Map<string, number>>();
    entries
      .filter((e) => e.entry_type === "expense")
      .forEach((e) => {
        const byDay = map.get(e.category_id) || new Map<string, number>();
        const d = e.op_date.slice(0, 10);
        byDay.set(d, (byDay.get(d) || 0) + Number(e.amount));
        map.set(e.category_id, byDay);
      });
    return Array.from(map.entries()).map(([cid, byDay]) => ({
      id: cid,
      name: categories.find((c) => c.id === cid)?.name || "Без статьи",
      byDay,
      total: Array.from(byDay.values()).reduce((a, b) => a + b, 0),
    }));
  }, [entries, categories]);

  const commentsByDay = useMemo(() => {
    const s = new Set<string>();
    entries.forEach((e) => e.comment && s.add(`${e.op_date.slice(0, 10)}|${e.entry_type}`));
    return s;
  }, [entries]);

  const labelCls = "sticky left-0 z-20 text-left px-1.5 lg:px-2 py-[5px] lg:py-1.5 border-r border-b whitespace-nowrap overflow-hidden text-[11px] lg:text-xs leading-tight";
  const totalCls = "sticky right-0 z-20 px-1.5 lg:px-2 py-[5px] lg:py-1.5 border-l border-b text-right whitespace-nowrap tabular-nums text-[11px] lg:text-xs leading-tight";
  const cellCls = "px-[3px] py-[5px] lg:py-1.5 border-b border-r text-right whitespace-nowrap overflow-hidden tabular-nums text-[10.5px] lg:text-[11px] leading-tight";

  const renderRow = (r: RowDef) => {
    const bg = r.tone ? TONE[r.tone] : "bg-white";
    const clickable = (r.kind === "input" || r.kind === "expense") && canWrite;
    const morningClickable = r.kind === "morning" && isOwner;
    const dark = r.tone === "dark";
    const big = dark ? "!text-[13px] lg:!text-[15px] !py-1.5 lg:!py-2 !font-bold" : "";
    return (
      <tr key={r.key} className="group">
        <th className={`${labelCls} ${bg} ${big} ${r.strong ? "font-semibold" : "font-normal"} ${dark ? "" : "text-slate-800"}`}>
          <span className="inline-flex items-center gap-1">
            {r.kind === "expense" && (
              <button
                onClick={() => setExpOpen(!expOpen)}
                className="w-4 h-4 rounded border flex items-center justify-center text-slate-500 hover:bg-slate-100"
                aria-label="Раскрыть расходы"
              >
                <Icon name={expOpen ? "Minus" : "Plus"} size={12} />
              </button>
            )}
            <span className="max-w-[92px] lg:max-w-none truncate" title={r.label}>{r.label}</span>
            {r.kind === "formula" && <Icon name="Sigma" size={11} className={`${dark ? "text-indigo-300" : "text-slate-300"} shrink-0`} />}
          </span>
        </th>
        {days.map((d) => {
          const isToday = d.date === today;
          const hasComment = r.entryType && commentsByDay.has(`${d.date}|${r.entryType}`);
          const manual = r.kind === "morning" && d.morning_manual;
          const can = clickable || morningClickable;
          return (
            <td
              key={d.date}
              onClick={() => {
                if (r.kind === "morning") {
                  if (morningClickable) onMorning(d);
                } else if (r.entryType && (clickable || Number(d[r.key]) !== 0)) onCell(d.date, r.entryType);
              }}
              className={`${cellCls} ${dark ? "!py-1.5 lg:!py-2" : ""} ${dark ? `${bg} border-indigo-800` : isToday ? "bg-white" : bg} ${
                can || (r.entryType && Number(d[r.key]) !== 0) ? "cursor-pointer hover:bg-teal-50" : ""
              } relative`}
            >
              <span className={`pointer-events-none absolute inset-0 ${dark ? (isToday ? "bg-white/15" : "") : dayTint(d.date, today)}`} />
              <Num v={d[r.key] as number} strong={r.strong} dark={dark} />
              {hasComment && <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-amber-500" />}
              {manual && <span className="absolute top-0.5 left-0.5 w-1.5 h-1.5 rounded-full bg-violet-500" title="Внесено вручную" />}
            </td>
          );
        })}
        <td className={`${totalCls} ${big} ${r.tone ? TONE[r.tone] : "bg-slate-50"} font-semibold`}>
          <Num v={rowTotal(days, r)} strong full dark={dark} />
        </td>
      </tr>
    );
  };

  return (
    <div
      ref={scrollRef}
      className="overflow-auto h-full border rounded-xl bg-white [--dds-label:112px] [--dds-total:76px] [--dds-day:46px] lg:[--dds-label:214px] lg:[--dds-total:88px] lg:[--dds-day:48px]"
    >
      <table
        className="border-separate border-spacing-0 table-fixed w-full"
        style={{ minWidth: `calc(var(--dds-label) + var(--dds-total) + ${days.length} * var(--dds-day))` }}
      >
        <colgroup>
          <col style={{ width: "var(--dds-label)" }} />
          {days.map((d) => (
            <col key={d.date} />
          ))}
          <col style={{ width: "var(--dds-total)" }} />
        </colgroup>
        <thead>
          <tr>
            <th className={`${labelCls} top-0 z-30 bg-yellow-200 font-semibold`}>Дата</th>
            {days.map((d) => {
              const dt = new Date(d.date + "T00:00:00");
              const isToday = d.date === today;
              const weekend = dt.getDay() === 0 || dt.getDay() === 6;
              return (
                <th
                  key={d.date}
                  ref={isToday ? todayRef : undefined}
                  className={`sticky top-0 z-10 border-b border-r px-0.5 py-0.5 text-center ${
                    isToday ? "bg-clinic-teal text-white" : !today ? "bg-yellow-200 text-slate-800" : d.date < today ? "bg-slate-200 text-slate-500" : "bg-emerald-100 text-slate-800"
                  }`}
                >
                  <div className="text-xs font-semibold leading-none">{dt.getDate()}</div>
                  <div className={`text-[9px] leading-tight ${weekend && !isToday ? "text-red-600" : ""}`}>{WEEKDAYS[dt.getDay()]}</div>
                </th>
              );
            })}
            <th className={`${totalCls} top-0 z-30 bg-yellow-200 font-semibold text-center`}>Итого</th>
          </tr>
        </thead>
        <tbody>
          {SECTIONS.map((sec) => (
            <Fragment key={sec.title}>
              <tr>
                <th className={`${labelCls} bg-slate-100 text-xs uppercase tracking-wide text-slate-500 font-semibold`}>{sec.title}</th>
                <td colSpan={days.length} className="bg-slate-100 border-b" />
                <td className={`${totalCls} bg-slate-100`} />
              </tr>
              {sec.rows.map((r) => (
                <Fragment key={r.key}>
                  {renderRow(r)}
                  {r.kind === "expense" &&
                    expOpen &&
                    expenseByCat.map((c) => (
                      <tr key={`cat-${c.id}`}>
                        <th className={`${labelCls} bg-white font-normal text-slate-600 pl-6 lg:pl-8`}>
                          <span className="max-w-[110px] sm:max-w-[220px] truncate inline-block align-bottom">{c.name}</span>
                        </th>
                        {days.map((d) => (
                          <td
                            key={d.date}
                            onClick={() => (c.byDay.get(d.date) || canWrite) && onCell(d.date, "expense")}
                            className={`${cellCls} bg-white text-slate-600 cursor-pointer hover:bg-teal-50 relative`}
                          >
                            <span className={`pointer-events-none absolute inset-0 ${dayTint(d.date, today)}`} />
                            <Num v={c.byDay.get(d.date) || 0} />
                          </td>
                        ))}
                        <td className={`${totalCls} bg-slate-50 text-slate-600`}>
                          <Num v={c.total} full />
                        </td>
                      </tr>
                    ))}
                  {r.kind === "expense" && expOpen && expenseByCat.length === 0 && (
                    <tr>
                      <th className={`${labelCls} bg-white font-normal text-slate-400 pl-8 sm:pl-10`}>Расходов нет</th>
                      <td colSpan={days.length} className="border-b" />
                      <td className={`${totalCls} bg-slate-50`} />
                    </tr>
                  )}
                </Fragment>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}