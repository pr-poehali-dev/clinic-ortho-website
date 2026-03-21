import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// ─── API endpoints ────────────────────────────────────────────────────────────
const SETTINGS_API = "https://functions.poehali.dev/fb6d8843-3150-4c51-a87f-cbb7f6143e7e";
const CONTENT_API  = "https://functions.poehali.dev/e3850f3d-bba8-4c1c-8dbb-bf8d3f7bdd34";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  description: string;
  img: string;
  imgPosition: string;
  imgHeight: string;
  imgMarginTop: string;
  sort_order: number;
  is_active: boolean;
}

interface Service {
  id: number;
  slug: string;
  icon: string;
  title: string;
  short: string;
  desc: string;
  items: string[];
  color: string;
  sort_order: number;
  is_active: boolean;
}

interface PriceItem {
  id: number;
  name: string;
  price: string;
}

interface PriceSection {
  id: number;
  title: string;
  icon: string;
  sort_order?: number;
  items: PriceItem[];
}

// ─── Site-settings sections config (existing) ─────────────────────────────────
const SETTINGS_SECTIONS = [
  {
    id: "contacts",
    title: "Контакты",
    icon: "Phone",
    fields: [
      { key: "contacts.phone",           label: "Телефон" },
      { key: "contacts.email",           label: "Email" },
      { key: "contacts.address",         label: "Адрес" },
      { key: "contacts.hours_weekday",   label: "Часы работы: Пн–Пт" },
      { key: "contacts.hours_saturday",  label: "Часы работы: Суббота" },
      { key: "contacts.hours_sunday",    label: "Часы работы: Воскресенье" },
    ],
  },
  {
    id: "home",
    title: "Главная",
    icon: "Home",
    fields: [
      { key: "home.hero_title",    label: "Заголовок",    multiline: true },
      { key: "home.hero_subtitle", label: "Подзаголовок", multiline: true },
    ],
  },
  {
    id: "about",
    title: "О клинике",
    icon: "Building2",
    fields: [
      { key: "about.clinic_name", label: "Название клиники" },
      { key: "about.tagline",     label: "Слоган" },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Toast({ message, type }: { message: string; type: "ok" | "err" }) {
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium shadow-lg transition-all ${type === "ok" ? "bg-clinic-teal text-white" : "bg-red-500 text-white"}`}>
      <Icon name={type === "ok" ? "CheckCircle" : "AlertCircle"} size={16} />
      {message}
    </div>
  );
}

function SectionHeader({ title, icon, action }: { title: string; icon: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <Icon name={icon} size={22} className="text-clinic-teal" />
        <h2 className="font-display text-3xl text-clinic-text">{title}</h2>
      </div>
      {action}
    </div>
  );
}

function SaveBtn({ saving, saved, onClick }: { saving: boolean; saved: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className="flex items-center gap-2 bg-clinic-teal text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-opacity-90 transition-all disabled:opacity-60"
    >
      <Icon name={saved ? "CheckCircle" : "Save"} size={15} />
      {saving ? "Сохраняем..." : saved ? "Сохранено!" : "Сохранить"}
    </button>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-sm font-medium text-clinic-text mb-1.5 block">{children}</label>;
}

function Spinner() {
  return (
    <div className="flex items-center justify-center py-20 text-clinic-text-muted text-sm gap-3">
      <svg className="animate-spin h-5 w-5 text-clinic-teal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
      Загрузка...
    </div>
  );
}

// ─── Blank record factories ───────────────────────────────────────────────────
const blankDoctor = (): Omit<Doctor, "id"> => ({
  name: "", specialty: "", experience: "", description: "",
  img: "", imgPosition: "center top", imgHeight: "24rem", imgMarginTop: "0",
  sort_order: 0, is_active: true,
});

const blankService = (): Omit<Service, "id"> => ({
  slug: "", icon: "", title: "", short: "", desc: "",
  items: [], color: "bg-blue-50 text-blue-600",
  sort_order: 0, is_active: true,
});

// ─── Doctors panel ────────────────────────────────────────────────────────────
function DoctorsPanel({ password }: { password: string }) {
  const [doctors, setDoctors]   = useState<Doctor[]>([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState<Doctor | Omit<Doctor, "id"> | null>(null);
  const [isNew, setIsNew]       = useState(false);
  const [saving, setSaving]     = useState(false);
  const [toast, setToast]       = useState<{ message: string; type: "ok" | "err" } | null>(null);

  const showToast = (message: string, type: "ok" | "err") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch(`${CONTENT_API}?section=doctors`);
      const data = await res.json();
      setDoctors(data);
    } catch {
      showToast("Не удалось загрузить врачей", "err");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      const isExisting = "id" in selected;
      const body = isExisting
        ? { section: "doctors", ...(selected as Doctor) }
        : { section: "doctors", ...(selected as Omit<Doctor, "id">) };

      const res = await fetch(CONTENT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Password": password },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error();
      showToast("Сохранено!", "ok");
      await load();
      if (!isExisting) { setSelected(null); setIsNew(false); }
    } catch {
      showToast("Ошибка при сохранении", "err");
    } finally {
      setSaving(false);
    }
  };

  const set = (field: string, value: string | number | boolean) =>
    setSelected((prev) => prev ? { ...prev, [field]: value } : prev);

  if (loading) return <Spinner />;

  if (selected) {
    const doc = selected as Doctor;
    return (
      <div>
        {toast && <Toast {...toast} />}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => { setSelected(null); setIsNew(false); }}
            className="flex items-center gap-1.5 text-sm text-clinic-text-muted hover:text-clinic-text transition-colors"
          >
            <Icon name="ChevronLeft" size={16} /> Назад
          </button>
          <span className="text-clinic-text-muted">/</span>
          <span className="text-sm font-medium text-clinic-text">{isNew ? "Новый врач" : doc.name}</span>
        </div>

        <div className="bg-white rounded-2xl border border-border p-6 space-y-5 max-w-2xl">
          {/* is_active toggle for existing */}
          {"id" in selected && (
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <div
                onClick={() => set("is_active", !doc.is_active)}
                className={`w-10 h-6 rounded-full transition-colors relative ${doc.is_active ? "bg-clinic-teal" : "bg-gray-300"}`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${doc.is_active ? "left-5" : "left-1"}`} />
              </div>
              <span className="text-sm font-medium text-clinic-text">
                {doc.is_active ? "Активен (отображается на сайте)" : "Скрыт"}
              </span>
            </label>
          )}

          <div><FieldLabel>Имя</FieldLabel><Input value={doc.name ?? ""} onChange={(e) => set("name", e.target.value)} placeholder="Фамилия Имя Отчество" /></div>
          <div><FieldLabel>Специальность</FieldLabel><Input value={doc.specialty ?? ""} onChange={(e) => set("specialty", e.target.value)} placeholder="Врач травматолог-ортопед" /></div>
          <div><FieldLabel>Опыт / теги (через « · »)</FieldLabel><Input value={doc.experience ?? ""} onChange={(e) => set("experience", e.target.value)} placeholder="Травматология · Ортопедия · УЗИ суставов" /></div>
          <div><FieldLabel>Описание</FieldLabel><Textarea value={doc.description ?? ""} onChange={(e) => set("description", e.target.value)} rows={5} placeholder="Краткое описание врача..." /></div>
          <div><FieldLabel>URL фотографии</FieldLabel><Input value={doc.img ?? ""} onChange={(e) => set("img", e.target.value)} placeholder="https://..." /></div>

          <div className="grid grid-cols-2 gap-4">
            <div><FieldLabel>Позиция фото (object-position)</FieldLabel><Input value={doc.imgPosition ?? ""} onChange={(e) => set("imgPosition", e.target.value)} placeholder="center top" /></div>
            <div><FieldLabel>Высота фото</FieldLabel><Input value={doc.imgHeight ?? ""} onChange={(e) => set("imgHeight", e.target.value)} placeholder="24rem" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><FieldLabel>Отступ фото сверху (marginTop)</FieldLabel><Input value={doc.imgMarginTop ?? ""} onChange={(e) => set("imgMarginTop", e.target.value)} placeholder="0" /></div>
            <div><FieldLabel>Порядок сортировки</FieldLabel><Input type="number" value={doc.sort_order ?? 0} onChange={(e) => set("sort_order", Number(e.target.value))} /></div>
          </div>

          <div className="pt-2">
            <SaveBtn saving={saving} saved={false} onClick={handleSave} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {toast && <Toast {...toast} />}
      <SectionHeader
        title="Врачи"
        icon="Users"
        action={
          <button
            onClick={() => { setSelected(blankDoctor()); setIsNew(true); }}
            className="flex items-center gap-2 bg-clinic-teal text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-opacity-90 transition-all"
          >
            <Icon name="Plus" size={15} /> Добавить врача
          </button>
        }
      />
      <div className="space-y-3 max-w-2xl">
        {doctors.length === 0 && (
          <div className="bg-white rounded-2xl border border-border p-8 text-center text-clinic-text-muted text-sm">Врачи не найдены</div>
        )}
        {doctors.map((doc) => (
          <button
            key={doc.id}
            onClick={() => { setSelected(doc); setIsNew(false); }}
            className="w-full bg-white rounded-2xl border border-border p-4 flex items-center gap-4 hover:border-clinic-teal hover:shadow-sm transition-all text-left"
          >
            {doc.img ? (
              <img src={doc.img} alt={doc.name} className="w-12 h-12 rounded-xl object-cover shrink-0" style={{ objectPosition: doc.imgPosition ?? "center top" }} />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-clinic-teal-light flex items-center justify-center text-clinic-teal font-display font-medium text-lg shrink-0">
                {doc.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-clinic-text text-sm truncate">{doc.name}</p>
              <p className="text-xs text-clinic-text-muted truncate">{doc.specialty}</p>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full shrink-0 ${doc.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
              {doc.is_active ? "Активен" : "Скрыт"}
            </span>
            <Icon name="ChevronRight" size={16} className="text-clinic-text-muted shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Services panel ───────────────────────────────────────────────────────────
function ServicesPanel({ password }: { password: string }) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState<Service | Omit<Service, "id"> | null>(null);
  const [isNew, setIsNew]       = useState(false);
  const [saving, setSaving]     = useState(false);
  const [toast, setToast]       = useState<{ message: string; type: "ok" | "err" } | null>(null);

  const showToast = (message: string, type: "ok" | "err") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch(`${CONTENT_API}?section=services`);
      const data = await res.json();
      setServices(data);
    } catch {
      showToast("Не удалось загрузить услуги", "err");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      const isExisting = "id" in selected;
      const body = isExisting
        ? { section: "services", ...(selected as Service) }
        : { section: "services", ...(selected as Omit<Service, "id">) };

      const res = await fetch(CONTENT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Password": password },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error();
      showToast("Сохранено!", "ok");
      await load();
      if (!isExisting) { setSelected(null); setIsNew(false); }
    } catch {
      showToast("Ошибка при сохранении", "err");
    } finally {
      setSaving(false);
    }
  };

  const set = (field: string, value: string | number | boolean | string[]) =>
    setSelected((prev) => prev ? { ...prev, [field]: value } : prev);

  if (loading) return <Spinner />;

  if (selected) {
    const svc = selected as Service;
    const itemsText = Array.isArray(svc.items) ? svc.items.join("\n") : "";

    return (
      <div>
        {toast && <Toast {...toast} />}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => { setSelected(null); setIsNew(false); }}
            className="flex items-center gap-1.5 text-sm text-clinic-text-muted hover:text-clinic-text transition-colors"
          >
            <Icon name="ChevronLeft" size={16} /> Назад
          </button>
          <span className="text-clinic-text-muted">/</span>
          <span className="text-sm font-medium text-clinic-text">{isNew ? "Новая услуга" : svc.title}</span>
        </div>

        <div className="bg-white rounded-2xl border border-border p-6 space-y-5 max-w-2xl">
          {"id" in selected && (
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <div
                onClick={() => set("is_active", !svc.is_active)}
                className={`w-10 h-6 rounded-full transition-colors relative ${svc.is_active ? "bg-clinic-teal" : "bg-gray-300"}`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${svc.is_active ? "left-5" : "left-1"}`} />
              </div>
              <span className="text-sm font-medium text-clinic-text">
                {svc.is_active ? "Активна (отображается на сайте)" : "Скрыта"}
              </span>
            </label>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div><FieldLabel>Slug (URL-часть)</FieldLabel><Input value={svc.slug ?? ""} onChange={(e) => set("slug", e.target.value)} placeholder="orthopedics" /></div>
            <div><FieldLabel>Иконка (Lucide)</FieldLabel><Input value={svc.icon ?? ""} onChange={(e) => set("icon", e.target.value)} placeholder="Bone" /></div>
          </div>
          <div><FieldLabel>Название</FieldLabel><Input value={svc.title ?? ""} onChange={(e) => set("title", e.target.value)} placeholder="Ортопедия" /></div>
          <div><FieldLabel>Краткое описание (карточка)</FieldLabel><Textarea value={svc.short ?? ""} onChange={(e) => set("short", e.target.value)} rows={2} /></div>
          <div><FieldLabel>Полное описание</FieldLabel><Textarea value={svc.desc ?? ""} onChange={(e) => set("desc", e.target.value)} rows={4} /></div>
          <div>
            <FieldLabel>Пункты услуги (каждый с новой строки)</FieldLabel>
            <Textarea
              value={itemsText}
              onChange={(e) => set("items", e.target.value.split("\n").filter((l) => l.trim() !== ""))}
              rows={6}
              placeholder={"Лечение артроза и артрита\nЛечение остеохондроза"}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FieldLabel>CSS-класс цвета</FieldLabel>
              <Input value={svc.color ?? ""} onChange={(e) => set("color", e.target.value)} placeholder="bg-blue-50 text-blue-600" />
              <p className="text-xs text-clinic-text-muted mt-1">Пример: bg-blue-50 text-blue-600</p>
            </div>
            <div><FieldLabel>Порядок сортировки</FieldLabel><Input type="number" value={svc.sort_order ?? 0} onChange={(e) => set("sort_order", Number(e.target.value))} /></div>
          </div>

          <div className="pt-2">
            <SaveBtn saving={saving} saved={false} onClick={handleSave} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {toast && <Toast {...toast} />}
      <SectionHeader
        title="Услуги"
        icon="Stethoscope"
        action={
          <button
            onClick={() => { setSelected(blankService()); setIsNew(true); }}
            className="flex items-center gap-2 bg-clinic-teal text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-opacity-90 transition-all"
          >
            <Icon name="Plus" size={15} /> Добавить услугу
          </button>
        }
      />
      <div className="space-y-3 max-w-2xl">
        {services.length === 0 && (
          <div className="bg-white rounded-2xl border border-border p-8 text-center text-clinic-text-muted text-sm">Услуги не найдены</div>
        )}
        {services.map((svc) => (
          <button
            key={svc.id}
            onClick={() => { setSelected(svc); setIsNew(false); }}
            className="w-full bg-white rounded-2xl border border-border p-4 flex items-center gap-4 hover:border-clinic-teal hover:shadow-sm transition-all text-left"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${svc.color}`}>
              <Icon name={svc.icon} size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-clinic-text text-sm truncate">{svc.title}</p>
              <p className="text-xs text-clinic-text-muted truncate">{svc.short}</p>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full shrink-0 ${svc.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
              {svc.is_active ? "Активна" : "Скрыта"}
            </span>
            <Icon name="ChevronRight" size={16} className="text-clinic-text-muted shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Prices panel ─────────────────────────────────────────────────────────────
function PricesPanel({ password }: { password: string }) {
  const [sections, setSections]         = useState<PriceSection[]>([]);
  const [loading, setLoading]           = useState(true);
  const [toast, setToast]               = useState<{ message: string; type: "ok" | "err" } | null>(null);
  // new section form
  const [addingSection, setAddingSection] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newSectionIcon, setNewSectionIcon]   = useState("");
  const [savingSection, setSavingSection]     = useState(false);
  // new item forms: keyed by section_id
  const [addingItem, setAddingItem]           = useState<Record<number, boolean>>({});
  const [newItemName, setNewItemName]         = useState<Record<number, string>>({});
  const [newItemPrice, setNewItemPrice]       = useState<Record<number, string>>({});
  const [savingItem, setSavingItem]           = useState<Record<number, boolean>>({});
  // inline edit: keyed by item.id
  const [editItem, setEditItem]               = useState<Record<number, { name: string; price: string }>>({});
  const [savingEditItem, setSavingEditItem]   = useState<Record<number, boolean>>({});
  // section edit
  const [editSection, setEditSection]         = useState<Record<number, { title: string; icon: string }>>({});
  const [savingEditSection, setSavingEditSection] = useState<Record<number, boolean>>({});

  const showToast = (message: string, type: "ok" | "err") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch(`${CONTENT_API}?section=prices`);
      const data = await res.json();
      setSections(data);
    } catch {
      showToast("Не удалось загрузить прайс", "err");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const contentPost = async (body: Record<string, unknown>) => {
    const res = await fetch(CONTENT_API, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Admin-Password": password },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error();
  };

  // add section
  const handleAddSection = async () => {
    if (!newSectionTitle.trim()) return;
    setSavingSection(true);
    try {
      await contentPost({ section: "prices", action: "add_section", title: newSectionTitle.trim(), icon: newSectionIcon.trim() || "Tag" });
      showToast("Раздел добавлен", "ok");
      setNewSectionTitle(""); setNewSectionIcon(""); setAddingSection(false);
      await load();
    } catch {
      showToast("Ошибка при добавлении раздела", "err");
    } finally {
      setSavingSection(false);
    }
  };

  // update section title/icon
  const handleSaveSection = async (sec: PriceSection) => {
    const draft = editSection[sec.id];
    if (!draft) return;
    setSavingEditSection((p) => ({ ...p, [sec.id]: true }));
    try {
      await contentPost({ section: "prices", action: "update_section", id: sec.id, title: draft.title, icon: draft.icon });
      showToast("Раздел обновлён", "ok");
      setEditSection((p) => { const n = { ...p }; delete n[sec.id]; return n; });
      await load();
    } catch {
      showToast("Ошибка при сохранении", "err");
    } finally {
      setSavingEditSection((p) => ({ ...p, [sec.id]: false }));
    }
  };

  // add item
  const handleAddItem = async (sectionId: number) => {
    const name  = newItemName[sectionId]?.trim();
    const price = newItemPrice[sectionId]?.trim();
    if (!name || !price) return;
    setSavingItem((p) => ({ ...p, [sectionId]: true }));
    try {
      await contentPost({ section: "prices", action: "add_item", section_id: sectionId, name, price });
      showToast("Позиция добавлена", "ok");
      setNewItemName((p)  => ({ ...p, [sectionId]: "" }));
      setNewItemPrice((p) => ({ ...p, [sectionId]: "" }));
      setAddingItem((p)   => ({ ...p, [sectionId]: false }));
      await load();
    } catch {
      showToast("Ошибка при добавлении", "err");
    } finally {
      setSavingItem((p) => ({ ...p, [sectionId]: false }));
    }
  };

  // update item inline
  const handleSaveItem = async (item: PriceItem) => {
    const draft = editItem[item.id];
    if (!draft) return;
    setSavingEditItem((p) => ({ ...p, [item.id]: true }));
    try {
      await contentPost({ section: "prices", action: "update_item", id: item.id, name: draft.name, price: draft.price });
      showToast("Позиция обновлена", "ok");
      setEditItem((p) => { const n = { ...p }; delete n[item.id]; return n; });
      await load();
    } catch {
      showToast("Ошибка при сохранении", "err");
    } finally {
      setSavingEditItem((p) => ({ ...p, [item.id]: false }));
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      {toast && <Toast {...toast} />}
      <SectionHeader
        title="Цены"
        icon="CircleDollarSign"
        action={
          <button
            onClick={() => setAddingSection((v) => !v)}
            className="flex items-center gap-2 bg-clinic-teal text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-opacity-90 transition-all"
          >
            <Icon name="Plus" size={15} /> Добавить раздел
          </button>
        }
      />

      {/* Add section form */}
      {addingSection && (
        <div className="bg-white rounded-2xl border border-clinic-teal p-5 mb-5 max-w-2xl space-y-3">
          <p className="text-sm font-semibold text-clinic-text">Новый раздел</p>
          <div className="grid grid-cols-2 gap-3">
            <div><FieldLabel>Название</FieldLabel><Input value={newSectionTitle} onChange={(e) => setNewSectionTitle(e.target.value)} placeholder="Консультации" /></div>
            <div><FieldLabel>Иконка (Lucide)</FieldLabel><Input value={newSectionIcon} onChange={(e) => setNewSectionIcon(e.target.value)} placeholder="Stethoscope" /></div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddSection}
              disabled={savingSection || !newSectionTitle.trim()}
              className="flex items-center gap-2 bg-clinic-teal text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-opacity-90 disabled:opacity-60"
            >
              <Icon name="Check" size={14} /> {savingSection ? "Сохраняем..." : "Добавить"}
            </button>
            <button onClick={() => setAddingSection(false)} className="px-4 py-2 rounded-xl text-sm text-clinic-text-muted hover:bg-secondary transition-all">Отмена</button>
          </div>
        </div>
      )}

      <div className="space-y-6 max-w-3xl">
        {sections.map((sec) => {
          const secDraft    = editSection[sec.id];
          const isSavingSec = savingEditSection[sec.id];

          return (
            <div key={sec.id} className="bg-white rounded-2xl border border-border overflow-hidden">
              {/* Section header row */}
              <div className="px-5 py-3 border-b border-border bg-clinic-beige flex items-center gap-3">
                {secDraft ? (
                  <>
                    <Input
                      className="h-8 text-sm font-medium"
                      value={secDraft.title}
                      onChange={(e) => setEditSection((p) => ({ ...p, [sec.id]: { ...secDraft, title: e.target.value } }))}
                      placeholder="Название раздела"
                    />
                    <Input
                      className="h-8 text-sm w-36"
                      value={secDraft.icon}
                      onChange={(e) => setEditSection((p) => ({ ...p, [sec.id]: { ...secDraft, icon: e.target.value } }))}
                      placeholder="Иконка"
                    />
                    <button
                      onClick={() => handleSaveSection(sec)}
                      disabled={isSavingSec}
                      className="flex items-center gap-1.5 bg-clinic-teal text-white text-xs px-3 py-1.5 rounded-lg hover:bg-opacity-90 disabled:opacity-60 shrink-0"
                    >
                      <Icon name="Check" size={12} /> {isSavingSec ? "..." : "Сохранить"}
                    </button>
                    <button
                      onClick={() => setEditSection((p) => { const n = { ...p }; delete n[sec.id]; return n; })}
                      className="text-xs text-clinic-text-muted hover:text-clinic-text shrink-0"
                    >
                      Отмена
                    </button>
                  </>
                ) : (
                  <>
                    <Icon name={sec.icon || "Tag"} size={16} className="text-clinic-teal shrink-0" />
                    <span className="font-display text-base text-clinic-text flex-1">{sec.title}</span>
                    <button
                      onClick={() => setEditSection((p) => ({ ...p, [sec.id]: { title: sec.title, icon: sec.icon } }))}
                      className="flex items-center gap-1.5 text-xs text-clinic-teal hover:underline shrink-0"
                    >
                      <Icon name="Pencil" size={12} /> Изменить
                    </button>
                  </>
                )}
              </div>

              {/* Items */}
              <div className="divide-y divide-border">
                {sec.items.map((item) => {
                  const draft      = editItem[item.id];
                  const isSavingIt = savingEditItem[item.id];
                  return (
                    <div key={item.id} className="flex items-center gap-3 px-5 py-3 hover:bg-secondary/30 transition-colors">
                      {draft ? (
                        <>
                          <Input
                            className="h-8 text-sm flex-1"
                            value={draft.name}
                            onChange={(e) => setEditItem((p) => ({ ...p, [item.id]: { ...draft, name: e.target.value } }))}
                          />
                          <Input
                            className="h-8 text-sm w-28 shrink-0"
                            value={draft.price}
                            onChange={(e) => setEditItem((p) => ({ ...p, [item.id]: { ...draft, price: e.target.value } }))}
                            placeholder="1 500"
                          />
                          <button
                            onClick={() => handleSaveItem(item)}
                            disabled={isSavingIt}
                            className="flex items-center gap-1 bg-clinic-teal text-white text-xs px-2.5 py-1.5 rounded-lg hover:bg-opacity-90 disabled:opacity-60 shrink-0"
                          >
                            <Icon name="Check" size={12} /> {isSavingIt ? "..." : "Ок"}
                          </button>
                          <button
                            onClick={() => setEditItem((p) => { const n = { ...p }; delete n[item.id]; return n; })}
                            className="text-xs text-clinic-text-muted hover:text-clinic-text shrink-0"
                          >
                            <Icon name="X" size={14} />
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="text-sm text-clinic-text flex-1">{item.name}</span>
                          <span className="text-sm font-semibold text-clinic-teal whitespace-nowrap shrink-0">{item.price} ₽</span>
                          <button
                            onClick={() => setEditItem((p) => ({ ...p, [item.id]: { name: item.name, price: item.price } }))}
                            className="text-clinic-text-muted hover:text-clinic-teal transition-colors shrink-0"
                            title="Редактировать"
                          >
                            <Icon name="Pencil" size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  );
                })}

                {/* Add item row */}
                {addingItem[sec.id] ? (
                  <div className="flex items-center gap-3 px-5 py-3 bg-clinic-beige">
                    <Input
                      className="h-8 text-sm flex-1"
                      value={newItemName[sec.id] ?? ""}
                      onChange={(e) => setNewItemName((p) => ({ ...p, [sec.id]: e.target.value }))}
                      placeholder="Название позиции"
                      autoFocus
                    />
                    <Input
                      className="h-8 text-sm w-28 shrink-0"
                      value={newItemPrice[sec.id] ?? ""}
                      onChange={(e) => setNewItemPrice((p) => ({ ...p, [sec.id]: e.target.value }))}
                      placeholder="1 500"
                    />
                    <button
                      onClick={() => handleAddItem(sec.id)}
                      disabled={savingItem[sec.id] || !newItemName[sec.id]?.trim() || !newItemPrice[sec.id]?.trim()}
                      className="flex items-center gap-1 bg-clinic-teal text-white text-xs px-2.5 py-1.5 rounded-lg hover:bg-opacity-90 disabled:opacity-60 shrink-0"
                    >
                      <Icon name="Check" size={12} /> {savingItem[sec.id] ? "..." : "Ок"}
                    </button>
                    <button
                      onClick={() => setAddingItem((p) => ({ ...p, [sec.id]: false }))}
                      className="text-clinic-text-muted hover:text-clinic-text shrink-0"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="px-5 py-2.5">
                    <button
                      onClick={() => setAddingItem((p) => ({ ...p, [sec.id]: true }))}
                      className="flex items-center gap-1.5 text-xs text-clinic-teal hover:underline"
                    >
                      <Icon name="Plus" size={13} /> Добавить позицию
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Settings panel (existing logic) ─────────────────────────────────────────
function SettingsPanel({
  sectionId,
  settings,
  onUpdate,
  onSave,
  saving,
  saved,
  loading,
}: {
  sectionId: string;
  settings: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
  onSave: () => void;
  saving: boolean;
  saved: boolean;
  loading: boolean;
}) {
  const section = SETTINGS_SECTIONS.find((s) => s.id === sectionId)!;

  return (
    <div>
      <SectionHeader
        title={section.title}
        icon={section.icon}
        action={<SaveBtn saving={saving} saved={saved} onClick={onSave} />}
      />
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-white rounded-2xl border border-border p-6 space-y-5 max-w-2xl">
          {section.fields.map((field) => (
            <div key={field.key}>
              <FieldLabel>{field.label}</FieldLabel>
              {field.multiline ? (
                <Textarea value={settings[field.key] ?? ""} onChange={(e) => onUpdate(field.key, e.target.value)} rows={3} />
              ) : (
                <Input value={settings[field.key] ?? ""} onChange={(e) => onUpdate(field.key, e.target.value)} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Sidebar nav item list ────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "contacts", title: "Контакты",  icon: "Phone",            group: "settings" },
  { id: "home",     title: "Главная",   icon: "Home",             group: "settings" },
  { id: "about",    title: "О клинике", icon: "Building2",        group: "settings" },
  { id: "doctors",  title: "Врачи",     icon: "Users",            group: "content"  },
  { id: "services", title: "Услуги",    icon: "Stethoscope",      group: "content"  },
  { id: "prices",   title: "Цены",      icon: "CircleDollarSign", group: "content"  },
];

// ─── Root component ───────────────────────────────────────────────────────────
export default function Admin() {
  const [password, setPassword]       = useState("");
  const [authed, setAuthed]           = useState(false);
  const [authError, setAuthError]     = useState("");
  const [settings, setSettings]       = useState<Record<string, string>>({});
  const [activeSection, setActiveSection] = useState("contacts");
  const [saving, setSaving]           = useState(false);
  const [saved, setSaved]             = useState(false);
  const [loading, setLoading]         = useState(false);

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
          {/* Group label: settings */}
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

          {/* Group label: content */}
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
