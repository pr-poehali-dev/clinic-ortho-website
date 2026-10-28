import { useCallback, useEffect, useState } from "react";
import { Link } from "@/lib/router-compat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";
import DdsLogin from "@/components/dds/DdsLogin";
import DdsHeader from "@/components/dds/DdsHeader";
import useDdsSession from "@/components/dds/useDdsSession";
import { AuthError, DdsUser, MED_ROLE_LABEL, MedRole, ROLE_LABEL, ddsRequest } from "@/components/dds/api";

type UserRole = DdsUser["role"];

const ROLE_HINT: Record<UserRole, string> = {
  view: "Только смотрит таблицу и выгружает в Excel",
  edit: "Вносит приходы, расходы, инкассацию — только за сегодня",
  full: "Вносит и исправляет за любые дни, правит статьи расходов",
};

function RoleSelect({ value, onChange }: { value: UserRole; onChange: (r: UserRole) => void }) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as UserRole)}>
      <SelectTrigger className="w-full sm:w-44">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {(["view", "edit", "full"] as UserRole[]).map((r) => (
          <SelectItem key={r} value={r}>
            {ROLE_LABEL[r]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function MedRoleSelect({ value, onChange }: { value: MedRole; onChange: (r: MedRole) => void }) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as MedRole)}>
      <SelectTrigger className="w-full sm:w-56">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {(["none", "view", "edit"] as MedRole[]).map((r) => (
          <SelectItem key={r} value={r}>
            {MED_ROLE_LABEL[r]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default function DdsAccess() {
  const { session, login, logout, expire, minutesLeft } = useDdsSession();
  const [users, setUsers] = useState<DdsUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", login: "", password: "", role: "edit" as UserRole, med_role: "none" as MedRole });
  const [saving, setSaving] = useState(false);
  const [newPass, setNewPass] = useState<Record<number, string>>({});

  const handleErr = useCallback(
    (e: unknown) => {
      if (e instanceof AuthError) expire();
      toast.error(e instanceof Error ? e.message : "Ошибка");
    },
    [expire],
  );

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setUsers(await ddsRequest<DdsUser[]>("GET", { action: "users" }));
    } catch (e) {
      handleErr(e);
    } finally {
      setLoading(false);
    }
  }, [handleErr]);

  useEffect(() => {
    if (session?.role === "owner") load();
  }, [session, load]);

  if (!session) {
    return <DdsLogin title="Доступы ДДС" hint="Вход владельца: логин admin" onLogin={login} />;
  }

  if (session.role !== "owner") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-slate-700">Управлять доступами может только владелец.</p>
        <Button asChild>
          <Link to="/dds">Перейти к таблице</Link>
        </Button>
      </div>
    );
  }

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await ddsRequest("POST", { action: "users" }, form);
      toast.success(`Сотрудник добавлен. Логин: ${form.login.trim().toLowerCase()}`);
      setForm({ name: "", login: "", password: "", role: "edit", med_role: "none" });
      load();
    } catch (err) {
      handleErr(err);
    } finally {
      setSaving(false);
    }
  };

  const update = async (id: number, patch: Partial<DdsUser> & { password?: string }) => {
    try {
      await ddsRequest("PUT", { action: "users" }, { id, ...patch });
      toast.success("Сохранено");
      load();
    } catch (err) {
      handleErr(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <DdsHeader session={session} minutesLeft={minutesLeft} onLogout={logout} current="access" />
      <main className="max-w-4xl mx-auto p-3 sm:p-6 space-y-6">
        <section className="bg-white rounded-2xl border p-4 sm:p-6">
          <h2 className="text-lg font-semibold mb-4">Новый сотрудник</h2>
          <form onSubmit={create} className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Имя</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Иванова Мария" />
            </div>
            <div className="space-y-1.5">
              <Label>Логин</Label>
              <Input value={form.login} onChange={(e) => setForm({ ...form, login: e.target.value })} placeholder="maria" />
            </div>
            <div className="space-y-1.5">
              <Label>Пароль (от 6 символов)</Label>
              <Input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Права</Label>
              <RoleSelect value={form.role} onChange={(role) => setForm({ ...form, role })} />
              <p className="text-xs text-slate-500">{ROLE_HINT[form.role]}</p>
            </div>
            <div className="space-y-1.5">
              <Label>Медрасходка</Label>
              <MedRoleSelect value={form.med_role} onChange={(med_role) => setForm({ ...form, med_role })} />
              <p className="text-xs text-slate-500">Редактирование — вносит приход/расход, цены, добавляет препараты и нормы остатка</p>
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" disabled={saving || !form.name || !form.login || form.password.length < 6}>
                <Icon name="UserPlus" size={16} className="mr-1.5" />
                Добавить
              </Button>
            </div>
          </form>
        </section>

        <section className="bg-white rounded-2xl border p-4 sm:p-6">
          <h2 className="text-lg font-semibold mb-4">Сотрудники</h2>
          {loading && <p className="text-sm text-slate-500">Загрузка...</p>}
          {!loading && users.length === 0 && <p className="text-sm text-slate-500">Пока никого нет</p>}
          <div className="divide-y">
            {users.map((u) => (
              <div key={u.id} className={`py-4 flex flex-col sm:flex-row sm:items-center gap-3 ${u.is_active ? "" : "opacity-50"}`}>
                <div className="sm:w-48">
                  <div className="font-medium text-slate-900">{u.name}</div>
                  <div className="text-xs text-slate-500">логин: {u.login}</div>
                </div>
                <div className="flex flex-col gap-2">
                  <RoleSelect value={u.role} onChange={(role) => update(u.id, { role })} />
                  <MedRoleSelect value={u.med_role || "none"} onChange={(med_role) => update(u.id, { med_role })} />
                </div>
                <div className="flex gap-2 flex-1">
                  <Input
                    placeholder="Новый пароль"
                    value={newPass[u.id] || ""}
                    onChange={(e) => setNewPass({ ...newPass, [u.id]: e.target.value })}
                  />
                  <Button
                    variant="outline"
                    disabled={(newPass[u.id] || "").length < 6}
                    onClick={() => {
                      update(u.id, { password: newPass[u.id] });
                      setNewPass({ ...newPass, [u.id]: "" });
                    }}
                  >
                    Сменить
                  </Button>
                </div>
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <Switch checked={u.is_active} onCheckedChange={(v) => update(u.id, { is_active: v })} />
                  {u.is_active ? "Активен" : "Отключён"}
                </label>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
