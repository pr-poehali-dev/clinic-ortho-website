import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toast, SectionHeader, SaveBtn, FieldLabel, Spinner } from "./adminShared";
import { CONTENT_API, Service, blankService } from "./adminTypes";

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
