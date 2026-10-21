import Icon from "@/components/ui/icon";
import { WEEKDAYS, pad } from "@/components/dds/api";
import NumCell from "./NumCell";
import { MedRow, rub } from "./medApi";

interface Props {
  month: string;
  days: number;
  items: MedRow[];
  mode: "out" | "in";
  today: string;
  editable: boolean;
  onCell: (row: MedRow, day: number, qty: number) => Promise<void>;
  onPrice: (row: MedRow, field: "pack_price" | "pack_qty", v: number) => Promise<void>;
  onOpenItem: (row: MedRow) => void;
}

const th = "px-1.5 py-2 text-[11px] font-semibold text-slate-600 border-b border-r bg-slate-100 whitespace-nowrap";
const td = "border-b border-r text-center text-sm tabular-nums";

export default function MedTable({ month, days, items, mode, today, editable, onCell, onPrice, onOpenItem }: Props) {
  const [y, m] = month.split("-").map(Number);
  const dayList = Array.from({ length: days }, (_, i) => i + 1);
  const totalSpent = items.reduce((s, r) => s + Number(r.spent_sum), 0);
  const totalOut = items.reduce((s, r) => s + r.total_out, 0);

  return (
    <div className="h-full overflow-auto rounded-xl border bg-white">
      <table className="border-separate border-spacing-0 min-w-max">
        <thead className="sticky top-0 z-20">
          <tr>
            <th className={`${th} sticky left-0 z-30 text-left min-w-[190px] sm:min-w-[230px]`}>Препарат</th>
            <th className={th}>Цена уп.</th>
            <th className={th}>Шт в уп.</th>
            <th className={th}>Цена 1 шт</th>
            <th className={`${th} bg-sky-50`}>Остаток<br />на 1-е</th>
            <th className={`${th} bg-emerald-50`}>Приход</th>
            {dayList.map((d) => {
              const date = `${y}-${pad(m)}-${pad(d)}`;
              const wd = new Date(y, m - 1, d).getDay();
              const isToday = date === today;
              return (
                <th key={d} className={`${th} w-11 ${isToday ? "!bg-clinic-teal !text-white" : wd === 0 ? "bg-rose-50" : ""}`}>
                  <div>{d}</div>
                  <div className="font-normal opacity-70">{WEEKDAYS[wd]}</div>
                </th>
              );
            })}
            <th className={`${th} bg-amber-50`}>Потрачено<br />шт</th>
            <th className={`${th} bg-amber-50`}>Потрачено<br />₽</th>
            <th className={`${th} bg-sky-50 sticky right-0 z-30 border-l`}>Остаток</th>
          </tr>
        </thead>
        <tbody>
          {items.map((r) => {
            const low = !r.exclude_control && r.min_stock > 0 && r.end < r.min_stock;
            const neg = r.end < 0;
            const src = mode === "out" ? r.out_days : r.in_days;
            return (
              <tr key={r.id} className={`group ${r.exclude_control ? "opacity-50" : ""}`}>
                <td className="sticky left-0 z-10 bg-white group-hover:bg-slate-50 border-b border-r px-2 py-1 text-sm">
                  <button type="button" onClick={() => onOpenItem(r)} className="text-left w-full hover:text-clinic-teal leading-tight">
                    {r.name}
                    {r.exclude_control && <span className="ml-1 text-[10px] text-slate-400">(вне контроля)</span>}
                  </button>
                </td>
                <td className={td}>
                  <NumCell value={Number(r.pack_price)} editable={editable} decimals format={(v) => rub(v)} placeholder="—" onSave={(v) => onPrice(r, "pack_price", v)} />
                </td>
                <td className={td}>
                  <NumCell value={r.pack_qty} editable={editable} onSave={(v) => onPrice(r, "pack_qty", v)} />
                </td>
                <td className={`${td} px-1.5 text-slate-500`}>{Number(r.unit_price) ? rub(r.unit_price) : "—"}</td>
                <td className={`${td} px-1.5 bg-sky-50/50`}>{r.start}</td>
                <td className={`${td} px-1.5 bg-emerald-50/60 text-emerald-700 font-medium`}>{r.total_in || ""}</td>
                {dayList.map((d) => {
                  const date = `${y}-${pad(m)}-${pad(d)}`;
                  return (
                    <td key={d} className={`${td} ${date === today ? "bg-clinic-teal/5" : ""} ${mode === "in" ? "text-emerald-700" : ""}`}>
                      <NumCell value={src[String(d)]} editable={editable} onSave={(v) => onCell(r, d, v)} />
                    </td>
                  );
                })}
                <td className={`${td} px-1.5 bg-amber-50/60 font-medium`}>{r.total_out || ""}</td>
                <td className={`${td} px-1.5 bg-amber-50/60 whitespace-nowrap`}>{Number(r.spent_sum) ? rub(r.spent_sum) : ""}</td>
                <td
                  className={`${td} px-2 sticky right-0 z-10 border-l font-semibold ${
                    neg ? "bg-rose-100 text-rose-700" : low ? "bg-orange-100 text-orange-700" : "bg-sky-50 text-slate-900"
                  }`}
                >
                  <span className="inline-flex items-center gap-1">
                    {(low || neg) && <Icon name="TriangleAlert" size={12} />}
                    {r.end}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot className="sticky bottom-0 z-20">
          <tr>
            <td className="sticky left-0 z-30 bg-slate-100 border-t px-2 py-2 text-sm font-semibold">Итого за месяц</td>
            <td colSpan={5 + days} className="bg-slate-100 border-t" />
            <td className="bg-amber-100 border-t text-center text-sm font-semibold tabular-nums">{totalOut}</td>
            <td className="bg-amber-100 border-t text-center text-sm font-semibold tabular-nums whitespace-nowrap px-2">{rub(totalSpent)}</td>
            <td className="bg-slate-100 border-t sticky right-0 z-30" />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
