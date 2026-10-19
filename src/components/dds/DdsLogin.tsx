import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

interface Props {
  title: string;
  hint?: string;
  onLogin: (login: string, password: string) => Promise<void>;
}

export default function DdsLogin({ title, hint, onLogin }: Props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await onLogin(login.trim(), password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка входа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-white rounded-2xl shadow-sm border p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-clinic-teal/10 flex items-center justify-center">
            <Icon name="Wallet" size={20} className="text-clinic-teal" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
            {hint && <p className="text-xs text-slate-500">{hint}</p>}
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="dds-login">Логин</Label>
          <Input id="dds-login" value={login} onChange={(e) => setLogin(e.target.value)} autoComplete="username" autoFocus />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="dds-pass">Пароль</Label>
          <Input id="dds-pass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading || !login || !password}>
          {loading ? "Вход..." : "Войти"}
        </Button>
        <p className="text-xs text-slate-400 text-center">Вход действует 2 часа</p>
      </form>
    </div>
  );
}
