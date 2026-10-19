export const DDS_API = "https://functions.poehali.dev/6369a466-1774-4378-b4f7-3446ce03b198";

export type Role = "owner" | "full" | "edit" | "view";
export type EntryType =
  | "in_check"
  | "in_cash"
  | "in_transfer"
  | "in_bank"
  | "topup"
  | "expense"
  | "collection"
  | "bank_deposit";

export const ENTRY_LABEL: Record<EntryType, string> = {
  in_check: "Приход нал с чеком",
  in_cash: "Приход нал",
  in_transfer: "Приход переводом",
  in_bank: "Приход безнал",
  topup: "Иные пополнения",
  expense: "Расход",
  collection: "Инкассация (директор)",
  bank_deposit: "Внесено в банк",
};

export const ROLE_LABEL: Record<Role, string> = {
  owner: "Владелец",
  full: "Полный доступ",
  edit: "Внесение",
  view: "Только просмотр",
};

export interface Session {
  token: string;
  role: Role;
  name: string;
  expiresAt: number;
}

export interface DayRow {
  date: string;
  morning_check: number;
  morning_cash: number;
  morning_total: number;
  morning_manual: boolean;
  in_check: number;
  in_cash: number;
  in_transfer: number;
  total_in_cash: number;
  in_bank: number;
  total_in_day: number;
  topup: number;
  cash_in_register: number;
  expense: number;
  collection: number;
  need_bank: number;
  bank_deposit: number;
  evening_check: number;
  evening_cash: number;
  evening_total: number;
}

export interface Entry {
  id: number;
  op_date: string;
  entry_type: EntryType;
  amount: number;
  category_id: number | null;
  category_name: string | null;
  comment: string;
  created_by: string;
  created_at: string;
  updated_by: string | null;
  updated_at: string | null;
}

export interface Category {
  id: number;
  name: string;
  is_active: boolean;
}

export interface DdsUser {
  id: number;
  login: string;
  name: string;
  role: Exclude<Role, "owner">;
  is_active: boolean;
  created_at: string;
}

const KEY = "dds_session";

export function loadSession(): Session | null {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) || "null") as Session | null;
    if (!s || s.expiresAt <= Date.now()) {
      localStorage.removeItem(KEY);
      return null;
    }
    return s;
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(KEY);
}

export class AuthError extends Error {}
export class DuplicateError extends Error {}

export async function ddsRequest<T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  params: Record<string, string | number | undefined>,
  body?: unknown,
): Promise<T> {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "") qs.set(k, String(v));
  });
  const session = loadSession();
  const res = await fetch(`${DDS_API}?${qs.toString()}`, {
    method,
    headers: { "Content-Type": "application/json", "X-Auth-Token": session?.token || "" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) {
    clearSession();
    throw new AuthError(data.error || "Сессия истекла");
  }
  if (res.status === 409 && data.duplicate) throw new DuplicateError(data.error);
  if (!res.ok) throw new Error(data.error || "Ошибка сервера");
  return data as T;
}

export async function login(loginName: string, password: string): Promise<Session> {
  const data = await ddsRequest<{ token: string; role: Role; name: string; seconds_left: number }>(
    "POST",
    { action: "login" },
    { login: loginName, password },
  );
  const s: Session = {
    token: data.token,
    role: data.role,
    name: data.name,
    expiresAt: Date.now() + data.seconds_left * 1000,
  };
  localStorage.setItem(KEY, JSON.stringify(s));
  return s;
}

export async function logout() {
  try {
    await ddsRequest("POST", { action: "logout" }, {});
  } catch {
    /* empty */
  } finally {
    clearSession();
  }
}

export const money = (n: number) =>
  new Intl.NumberFormat("ru-RU", { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(Number(n) || 0);

export const pad = (n: number) => String(n).padStart(2, "0");

export const fmtDate = (d: string) => {
  const [y, m, day] = d.slice(0, 10).split("-");
  return `${day}.${m}.${y}`;
};

export const MONTH_NAMES = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];

export const WEEKDAYS = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];

export const isFull = (r: Role) => r === "owner" || r === "full";
export const canWrite = (r: Role) => r !== "view";
