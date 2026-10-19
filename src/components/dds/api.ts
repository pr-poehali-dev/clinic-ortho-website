export const DDS_API = "https://functions.poehali.dev/6369a466-1774-4378-b4f7-3446ce03b198";

export type Kind = "income" | "expense" | "transfer";

export interface Account {
  id: number;
  name: string;
  opening_balance: number;
  sort_order: number;
  is_active: boolean;
}

export interface Category {
  id: number;
  name: string;
  kind: "income" | "expense";
  sort_order: number;
  is_active: boolean;
}

export interface Transaction {
  id: number;
  op_date: string;
  kind: Kind;
  amount: number;
  account_id: number;
  to_account_id: number | null;
  category_id: number | null;
  comment: string;
  account_name: string;
  to_account_name: string | null;
  category_name: string | null;
}

export interface Balance {
  id: number;
  name: string;
  opening_balance: number;
  balance: number;
}

export interface Report {
  by_category: { id: number; name: string; kind: "income" | "expense"; total: number }[];
  by_month: { month: string; income: number; expense: number }[];
  balances_start: Balance[];
  balances_end: Balance[];
  balances_now: Balance[];
}

const PASS_KEY = "dds_password";

export const getPassword = () => sessionStorage.getItem(PASS_KEY) || "";
export const setPassword = (p: string) => sessionStorage.setItem(PASS_KEY, p);
export const clearPassword = () => sessionStorage.removeItem(PASS_KEY);

export class AuthError extends Error {}

export async function ddsRequest<T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  params: Record<string, string | number | undefined>,
  body?: unknown,
  password = getPassword(),
): Promise<T> {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "") qs.set(k, String(v));
  });
  const res = await fetch(`${DDS_API}?${qs.toString()}`, {
    method,
    headers: { "Content-Type": "application/json", "X-Dds-Password": password },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 403) throw new AuthError(data.error || "Неверный пароль");
  if (!res.ok) throw new Error(data.error || "Ошибка сервера");
  return data as T;
}

export const money = (n: number) =>
  new Intl.NumberFormat("ru-RU", { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(Number(n) || 0) + " ₽";

export const fmtDate = (d: string) => {
  const [y, m, day] = d.slice(0, 10).split("-");
  return `${day}.${m}.${y}`;
};

const pad = (n: number) => String(n).padStart(2, "0");
export const isoDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const monthRange = (offset = 0) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() + offset, 1);
  const end = new Date(now.getFullYear(), now.getMonth() + offset + 1, 0);
  return { from: isoDate(start), to: isoDate(end) };
};

export const MONTHS = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
export const monthLabel = (ym: string) => {
  const [y, m] = ym.split("-");
  return `${MONTHS[Number(m) - 1]} ${y.slice(2)}`;
};

export const KIND_LABEL: Record<Kind, string> = {
  income: "Поступление",
  expense: "Выплата",
  transfer: "Перевод",
};

export function downloadCsv(filename: string, rows: (string | number)[][]) {
  const csv = rows
    .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(";"))
    .join("\r\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
