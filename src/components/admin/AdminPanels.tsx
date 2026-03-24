import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toast, SectionHeader, SaveBtn, FieldLabel, Spinner } from "./adminShared";
import {
  CONTENT_API,
  SETTINGS_SECTIONS,
  Doctor,
  Service,
  PriceItem,
  PriceSection,
  blankDoctor,
  blankService,
} from "./adminTypes";

// ─── Doctors panel ────────────────────────────────────────────────────────────
export function DoctorsPanel({ password }: { password: string }) {
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

          <div><FieldLabel>ФИО</FieldLabel><Input value={doc.name ?? ""} onChange={(e) => set("name", e.target.value)} placeholder="Иванов Иван Иванович" /></div>
          <div><FieldLabel>Специальность</FieldLabel><Input value={doc.specialty ?? ""} onChange={(e) => set("specialty", e.target.value)} placeholder="Травматолог-ортопед" /></div>
          <div><FieldLabel>Опыт работы</FieldLabel><Input value={doc.experience ?? ""} onChange={(e) => set("experience", e.target.value)} placeholder="15 лет" /></div>
          <div><FieldLabel>Описание</FieldLabel><Textarea value={doc.description ?? ""} onChange={(e) => set("description", e.target.value)} rows={4} /></div>
          <div><FieldLabel>URL фото</FieldLabel><Input value={doc.img ?? ""} onChange={(e) => set("img", e.target.value)} placeholder="https://..." /></div>
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
export function ServicesPanel({ password }: { password: string }) {
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
export function PricesPanel({ password }: { password: string }) {
  const [sections, setSections]         = useState<PriceSection[]>([]);
  const [loading, setLoading]           = useState(true);
  const [toast, setToast]               = useState<{ message: string; type: "ok" | "err" } | null>(null);
  const [addingSection, setAddingSection] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newSectionIcon, setNewSectionIcon]   = useState("");
  const [savingSection, setSavingSection]     = useState(false);
  const [addingItem, setAddingItem]           = useState<Record<number, boolean>>({});
  const [newItemName, setNewItemName]         = useState<Record<number, string>>({});
  const [newItemPrice, setNewItemPrice]       = useState<Record<number, string>>({});
  const [savingItem, setSavingItem]           = useState<Record<number, boolean>>({});
  const [editItem, setEditItem]               = useState<Record<number, { name: string; price: string }>>({});
  const [savingEditItem, setSavingEditItem]   = useState<Record<number, boolean>>({});
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
                            className="flex items-center gap-1 text-xs text-clinic-teal hover:underline shrink-0"
                          >
                            <Icon name="Pencil" size={12} /> Изменить
                          </button>
                        </>
                      )}
                    </div>
                  );
                })}

                {addingItem[sec.id] ? (
                  <div className="flex items-center gap-3 px-5 py-3">
                    <Input
                      className="h-8 text-sm flex-1"
                      value={newItemName[sec.id] ?? ""}
                      onChange={(e) => setNewItemName((p) => ({ ...p, [sec.id]: e.target.value }))}
                      placeholder="Название услуги"
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

// ─── Settings panel ───────────────────────────────────────────────────────────
export function SettingsPanel({
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
