import { DayRow, EntryType } from "./api";

export type RowKind = "formula" | "input" | "expense" | "morning";
export type TotalMode = "sum" | "first" | "last";

export interface RowDef {
  key: keyof DayRow;
  label: string;
  kind: RowKind;
  entryType?: EntryType;
  total: TotalMode;
  strong?: boolean;
  tone?: "accent" | "warn" | "info" | "dark";
}

export interface SectionDef {
  title: string;
  rows: RowDef[];
}

export const SECTIONS: SectionDef[] = [
  {
    title: "Утро",
    rows: [
      { key: "morning_check", label: "На утро нал с чеком", kind: "morning", total: "first" },
      { key: "morning_cash", label: "На утро нал", kind: "morning", total: "first" },
      { key: "morning_total", label: "Общий остаток нал в кассе", kind: "formula", total: "first", strong: true, tone: "warn" },
    ],
  },
  {
    title: "День",
    rows: [
      { key: "in_check", label: "Приход нал с чеком", kind: "input", entryType: "in_check", total: "sum" },
      { key: "in_cash", label: "Приход нал", kind: "input", entryType: "in_cash", total: "sum" },
      { key: "in_transfer", label: "Приход переводом", kind: "input", entryType: "in_transfer", total: "sum" },
      { key: "total_in_cash", label: "Итого приход нал", kind: "formula", total: "sum", strong: true, tone: "accent" },
      { key: "in_bank", label: "Приход безнал", kind: "input", entryType: "in_bank", total: "sum" },
      { key: "total_in_day", label: "Итого приход день", kind: "formula", total: "sum", strong: true, tone: "dark" },
      { key: "topup", label: "Иные пополнения", kind: "input", entryType: "topup", total: "sum" },
      { key: "cash_in_register", label: "Итого в кассе нал", kind: "formula", total: "sum", strong: true, tone: "accent" },
    ],
  },
  {
    title: "Расходы",
    rows: [{ key: "expense", label: "Расходы", kind: "expense", entryType: "expense", total: "sum", strong: true }],
  },
  {
    title: "Инкассация",
    rows: [
      { key: "collection", label: "Инкассация (директор)", kind: "input", entryType: "collection", total: "sum" },
      { key: "need_bank", label: "Необходимо положить в банк", kind: "formula", total: "last", strong: true, tone: "info" },
      { key: "bank_deposit", label: "Внесено в банк", kind: "input", entryType: "bank_deposit", total: "sum" },
    ],
  },
  {
    title: "Вечер",
    rows: [
      { key: "evening_check", label: "На вечер нал с чеком", kind: "formula", total: "last" },
      { key: "evening_cash", label: "На вечер нал", kind: "formula", total: "last" },
      { key: "evening_total", label: "Общий остаток нал в кассе", kind: "formula", total: "last", strong: true, tone: "warn" },
    ],
  },
];

export function rowTotal(days: DayRow[], row: RowDef): number {
  if (!days.length) return 0;
  if (row.total === "first") return Number(days[0][row.key]) || 0;
  if (row.total === "last") return Number(days[days.length - 1][row.key]) || 0;
  return days.reduce((s, d) => s + (Number(d[row.key]) || 0), 0);
}
