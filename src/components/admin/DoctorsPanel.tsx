import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toast, SectionHeader, SaveBtn, FieldLabel, Spinner } from "./adminShared";
import { CONTENT_API, Doctor, blankDoctor } from "./adminTypes";

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
