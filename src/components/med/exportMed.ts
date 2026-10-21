import * as XLSX from "xlsx";
import { MONTH_NAMES } from "@/components/dds/api";
import { MedRow } from "./medApi";

export function exportMed(month: string, days: number, items: MedRow[]) {
  const [y, m] = month.split("-").map(Number);
  const dl = Array.from({ length: days }, (_, i) => i + 1);
  const aoa: (string | number)[][] = [
    ["Препарат", "Цена уп.", "Шт в уп.", "Цена 1 шт", "Остаток на 1-е", "Приход", ...dl, "Потрачено шт", "Потрачено ₽", "Остаток"],
  ];
  items.forEach((r) => {
    aoa.push([
      r.name, Number(r.pack_price), r.pack_qty, Number(r.unit_price), r.start, r.total_in,
      ...dl.map((d) => r.out_days[String(d)] || ""),
      r.total_out, Number(r.spent_sum), r.end,
    ]);
  });
  aoa.push(["Итого", "", "", "", "", "", ...dl.map(() => ""), items.reduce((s, r) => s + r.total_out, 0), items.reduce((s, r) => s + Number(r.spent_sum), 0), ""]);
  const ws = XLSX.utils.aoa_to_sheet(aoa);
  ws["!cols"] = [{ wch: 30 }, { wch: 10 }, { wch: 8 }, { wch: 10 }, { wch: 10 }, { wch: 8 }, ...dl.map(() => ({ wch: 4 })), { wch: 12 }, { wch: 12 }, { wch: 9 }];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, `${MONTH_NAMES[m - 1]} ${y}`);
  XLSX.writeFile(wb, `Медрасходка ${MONTH_NAMES[m - 1]} ${y}.xlsx`);
}
