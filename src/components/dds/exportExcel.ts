import * as XLSX from "xlsx";
import { Category, DayRow, Entry, ENTRY_LABEL, MONTH_NAMES, fmtDate } from "./api";
import { SECTIONS, rowTotal } from "./rows";

export function exportMonth(month: string, days: DayRow[], entries: Entry[], categories: Category[]) {
  const [y, m] = month.split("-").map(Number);
  const header = ["", ...days.map((d) => Number(d.date.slice(8, 10))), "Итого за месяц"];
  const aoa: (string | number)[][] = [header];

  const catIds = Array.from(new Set(entries.filter((e) => e.entry_type === "expense").map((e) => e.category_id)));
  const catName = (id: number | null) => categories.find((c) => c.id === id)?.name || "Без статьи";

  SECTIONS.forEach((sec) => {
    aoa.push([sec.title.toUpperCase()]);
    sec.rows.forEach((r) => {
      aoa.push([r.label, ...days.map((d) => Number(d[r.key]) || 0), rowTotal(days, r)]);
      if (r.kind === "expense") {
        catIds.forEach((cid) => {
          const vals = days.map((d) =>
            entries
              .filter((e) => e.entry_type === "expense" && e.category_id === cid && e.op_date.slice(0, 10) === d.date)
              .reduce((s, e) => s + Number(e.amount), 0),
          );
          aoa.push([`   ${catName(cid)}`, ...vals, vals.reduce((a, b) => a + b, 0)]);
        });
      }
    });
  });

  const ws = XLSX.utils.aoa_to_sheet(aoa);
  ws["!cols"] = [{ wch: 30 }, ...days.map(() => ({ wch: 10 })), { wch: 14 }];
  ws["!freeze"] = { xSplit: 1, ySplit: 1 };

  const ops = [
    ["Дата", "Тип", "Статья", "Сумма", "Комментарий", "Внёс", "Изменил"],
    ...entries.map((e) => [
      fmtDate(e.op_date),
      ENTRY_LABEL[e.entry_type],
      e.category_name || "",
      Number(e.amount),
      e.comment,
      e.created_by,
      e.updated_by || "",
    ]),
  ];
  const ws2 = XLSX.utils.aoa_to_sheet(ops);
  ws2["!cols"] = [{ wch: 11 }, { wch: 22 }, { wch: 24 }, { wch: 12 }, { wch: 40 }, { wch: 18 }, { wch: 18 }];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "ДДС");
  XLSX.utils.book_append_sheet(wb, ws2, "Операции");
  XLSX.writeFile(wb, `ДДС ${MONTH_NAMES[m - 1]} ${y}.xlsx`);
}
