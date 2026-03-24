import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { SETTINGS_API, NAV_ITEMS } from "@/components/admin/adminTypes";
import { DoctorsPanel, ServicesPanel, PricesPanel, SettingsPanel } from "@/components/admin/AdminPanels";

export default function Admin() {
  const [password, setPassword]           = useState("");
  const [authed, setAuthed]               = useState(false);
  const [authError, setAuthError]         = useState("");
  const [settings, setSettings]           = useState<Record<string, string>>({});
  const [activeSection, setActiveSection] = useState("contacts");
  const [saving, setSaving]               = useState(false);
  const [saved, setSaved]                 = useState(false);
  const [loading, setLoading]             = useState(false);

  const loadSettings = async () => {
    setLoading(true);
    const res  = await fetch(SETTINGS_API);
    const data = await res.json();
    setSettings(data);
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError("");
    const res = await fetch(SETTINGS_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, settings: {} }),
    });
    if (res.ok) {
      setAuthed(true);
      await loadSettings();
    } else {
      setAuthError("Неверный пароль");
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await fetch(SETTINGS_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, settings }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const update = (key: string, value: string) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  // ── Login screen ─────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-clinic-beige flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-border p-8 w-full max-w-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-clinic-teal-light flex items-center justify-center">
              <Icon name="Lock" size={18} className="text-clinic-teal" />
            </div>
            <div>
              <h1 className="font-display text-2xl text-clinic-text">Админпанель</h1>
              <p className="text-xs text-clinic-text-muted">Управление сайтом</p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-clinic-text mb-1.5 block">Пароль</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                required
              />
              {authError && <p className="text-red-500 text-xs mt-1">{authError}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-clinic-teal text-white py-2.5 rounded-xl text-sm font-medium hover:bg-opacity-90 transition-all disabled:opacity-60"
            >
              {loading ? "Входим..." : "Войти"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Authenticated shell ───────────────────────────────────────────────────────
  const isSettingsSection = ["contacts", "home", "about"].includes(activeSection);

  return (
    <div className="min-h-screen bg-secondary flex">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-border flex flex-col shrink-0">
        <div className="p-4 border-b border-border">
          <p className="text-xs text-clinic-text-muted">Управление сайтом</p>
          <p className="font-display text-lg text-clinic-text">Админпанель</p>
        </div>

        <nav className="p-3 flex-1 space-y-0.5 overflow-y-auto">
          <p className="text-xs font-semibold text-clinic-text-muted uppercase tracking-wide px-3 pt-2 pb-1">Настройки</p>
          {NAV_ITEMS.filter((n) => n.group === "settings").map((n) => (
            <button
              key={n.id}
              onClick={() => setActiveSection(n.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                activeSection === n.id ? "bg-clinic-teal text-white" : "text-clinic-text hover:bg-secondary"
              }`}
            >
              <Icon name={n.icon} size={15} />
              {n.title}
            </button>
          ))}

          <p className="text-xs font-semibold text-clinic-text-muted uppercase tracking-wide px-3 pt-4 pb-1">Контент</p>
          {NAV_ITEMS.filter((n) => n.group === "content").map((n) => (
            <button
              key={n.id}
              onClick={() => setActiveSection(n.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                activeSection === n.id ? "bg-clinic-teal text-white" : "text-clinic-text hover:bg-secondary"
              }`}
            >
              <Icon name={n.icon} size={15} />
              {n.title}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-border">
          <button
            onClick={() => { setAuthed(false); setPassword(""); }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-clinic-text-muted hover:bg-secondary transition-all"
          >
            <Icon name="LogOut" size={14} />
            Выйти
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {isSettingsSection && (
          <SettingsPanel
            sectionId={activeSection}
            settings={settings}
            onUpdate={update}
            onSave={handleSave}
            saving={saving}
            saved={saved}
            loading={loading}
          />
        )}
        {activeSection === "doctors"  && <DoctorsPanel  password={password} />}
        {activeSection === "services" && <ServicesPanel password={password} />}
        {activeSection === "prices"   && <PricesPanel   password={password} />}
      </main>
    </div>
  );
}
