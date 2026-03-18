import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const API_URL = "https://functions.poehali.dev/fb6d8843-3150-4c51-a87f-cbb7f6143e7e";

const SECTIONS = [
  {
    id: "contacts",
    title: "Контакты",
    icon: "Phone",
    fields: [
      { key: "contacts.phone", label: "Телефон" },
      { key: "contacts.email", label: "Email" },
      { key: "contacts.address", label: "Адрес" },
      { key: "contacts.hours_weekday", label: "Часы работы: Пн–Пт" },
      { key: "contacts.hours_saturday", label: "Часы работы: Суббота" },
      { key: "contacts.hours_sunday", label: "Часы работы: Воскресенье" },
    ],
  },
  {
    id: "home",
    title: "Главная страница",
    icon: "Home",
    fields: [
      { key: "home.hero_title", label: "Заголовок", multiline: true },
      { key: "home.hero_subtitle", label: "Подзаголовок", multiline: true },
    ],
  },
  {
    id: "about",
    title: "О клинике",
    icon: "Building2",
    fields: [
      { key: "about.clinic_name", label: "Название клиники" },
      { key: "about.tagline", label: "Слоган" },
    ],
  },
];

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [activeSection, setActiveSection] = useState("contacts");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadSettings = async () => {
    setLoading(true);
    const res = await fetch(API_URL);
    const data = await res.json();
    setSettings(data);
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError("");
    const res = await fetch(API_URL, {
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
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, settings }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const update = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

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

  const section = SECTIONS.find((s) => s.id === activeSection)!;

  return (
    <div className="min-h-screen bg-secondary flex">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-border flex flex-col shrink-0">
        <div className="p-4 border-b border-border">
          <p className="text-xs text-clinic-text-muted">Управление сайтом</p>
          <p className="font-display text-lg text-clinic-text">Админпанель</p>
        </div>
        <nav className="p-3 space-y-1 flex-1">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                activeSection === s.id
                  ? "bg-clinic-teal text-white"
                  : "text-clinic-text hover:bg-secondary"
              }`}
            >
              <Icon name={s.icon} size={15} />
              {s.title}
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

      {/* Content */}
      <main className="flex-1 p-8">
        <div className="max-w-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Icon name={section.icon} size={22} className="text-clinic-teal" />
              <h2 className="font-display text-3xl text-clinic-text">{section.title}</h2>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-clinic-teal text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-opacity-90 transition-all disabled:opacity-60"
            >
              <Icon name={saved ? "CheckCircle" : "Save"} size={15} />
              {saving ? "Сохраняем..." : saved ? "Сохранено!" : "Сохранить"}
            </button>
          </div>

          {loading ? (
            <div className="text-center py-20 text-clinic-text-muted text-sm">Загрузка...</div>
          ) : (
            <div className="bg-white rounded-2xl border border-border p-6 space-y-5">
              {section.fields.map((field) => (
                <div key={field.key}>
                  <label className="text-sm font-medium text-clinic-text mb-1.5 block">{field.label}</label>
                  {field.multiline ? (
                    <Textarea
                      value={settings[field.key] ?? ""}
                      onChange={(e) => update(field.key, e.target.value)}
                      rows={3}
                    />
                  ) : (
                    <Input
                      value={settings[field.key] ?? ""}
                      onChange={(e) => update(field.key, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
