import { ddsRequest, pad } from "@/components/dds/api";

export const MED_START = "2026-10";
export const MED_END = "2027-12";

export interface MedRow {
  id: number;
  name: string;
  pack_price: number;
  pack_qty: number;
  unit_price: number;
  min_stock: number;
  exclude_control: boolean;
  start: number;
  in_days: Record<string, number>;
  out_days: Record<string, number>;
  total_in: number;
  total_out: number;
  end: number;
  spent_sum: number;
}

export interface MedMonth {
  month: string;
  days: number;
  items: MedRow[];
}

export interface MedItem {
  id: number;
  name: string;
  pack_price: number;
  pack_qty: number;
  unit_price: number;
  min_stock: number;
  exclude_control: boolean;
  is_active: boolean;
  stock: number;
}

export const getMonth = (month: string) => ddsRequest<MedMonth>("GET", { action: "med_month", month });
export const getItems = () => ddsRequest<MedItem[]>("GET", { action: "med_items" });
export const saveCell = (item_id: number, date: string, kind: "in" | "out", qty: number) =>
  ddsRequest("POST", { action: "med_cell" }, { item_id, date, kind, qty });
export const createItem = (data: Record<string, unknown>) => ddsRequest<{ id: number }>("POST", { action: "med_items" }, data);
export const updateItem = (id: number, data: Record<string, unknown>) =>
  ddsRequest<{ id: number }>("PUT", { action: "med_items" }, { id, ...data });

export const shiftMonth = (ym: string, delta: number) => {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
};

export const rub = (n: number) =>
  new Intl.NumberFormat("ru-RU", { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(Number(n) || 0) + " ₽";

export const packsToOrder = (need: number, packQty: number) => Math.ceil(need / Math.max(packQty || 1, 1));
