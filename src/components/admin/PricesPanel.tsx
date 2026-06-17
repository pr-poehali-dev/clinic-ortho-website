import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Toast, SectionHeader, FieldLabel, Spinner } from "./adminShared";
import { CONTENT_API, PriceItem, PriceSection } from "./adminTypes";

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
  const [newItemDesc, setNewItemDesc]         = useState<Record<number, string>>({});
  const [savingItem, setSavingItem]           = useState<Record<number, boolean>>({});
  const [editItem, setEditItem]               = useState<Record<number, { name: string; price: string; description: string }>>({});
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
      await contentPost({ section: "prices", action: "add_section", title: newSectionTitle, icon: newSectionIcon });
      showToast("Раздел добавлен", "ok");
      setNewSectionTitle("");
      setNewSectionIcon("");
      setAddingSection(false);
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
    const description = newItemDesc[sectionId]?.trim() ?? "";
    if (!name || !price) return;
    setSavingItem((p) => ({ ...p, [sectionId]: true }));
    try {
      await contentPost({ section: "prices", action: "add_item", section_id: sectionId, name, price, description });
      showToast("Позиция добавлена", "ok");
      setNewItemName((p)  => ({ ...p, [sectionId]: "" }));
      setNewItemPrice((p) => ({ ...p, [sectionId]: "" }));
      setNewItemDesc((p)  => ({ ...p, [sectionId]: "" }));
      setAddingItem((p)   => ({ ...p, [sectionId]: false }));
      await load();
    } catch {
      showToast("Ошибка при добавлении", "err");
    } finally {
      setSavingItem((p) => ({ ...p, [sectionId]: false }));
    }
  };

  const handleDeleteItem = async (item: PriceItem) => {
    if (!confirm(`Удалить позицию «${item.name}»?`)) return;
    try {
      await contentPost({ section: "prices", action: "delete_item", id: item.id });
      showToast("Позиция удалена", "ok");
      await load();
    } catch {
      showToast("Ошибка при удалении", "err");
    }
  };

  const handleSaveItem = async (item: PriceItem) => {
    const draft = editItem[item.id];
    if (!draft) return;
    setSavingEditItem((p) => ({ ...p, [item.id]: true }));
    try {
      await contentPost({ section: "prices", action: "update_item", id: item.id, name: draft.name, price: draft.price, description: draft.description });
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
                    <div key={item.id} className="px-5 py-3 hover:bg-secondary/30 transition-colors">
                      {draft ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <Input
                              className="h-8 text-sm flex-1"
                              value={draft.name}
                              onChange={(e) => setEditItem((p) => ({ ...p, [item.id]: { ...draft, name: e.target.value } }))}
                              placeholder="Название"
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
                          </div>
                          <textarea
                            className="w-full text-xs text-clinic-text border border-border rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-clinic-teal"
                            rows={2}
                            placeholder="Описание (необязательно): состав чекапа, что входит, примечания..."
                            value={draft.description}
                            onChange={(e) => setEditItem((p) => ({ ...p, [item.id]: { ...draft, description: e.target.value } }))}
                          />
                        </div>
                      ) : (
                        <div className="flex items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <span className="text-sm text-clinic-text">{item.name}</span>
                            {item.description && (
                              <p className="text-xs text-clinic-text-muted mt-0.5 leading-relaxed">{item.description}</p>
                            )}
                          </div>
                          <span className="text-sm font-semibold text-clinic-teal whitespace-nowrap shrink-0 mt-0.5">{item.price} ₽</span>
                          <button
                            onClick={() => setEditItem((p) => ({ ...p, [item.id]: { name: item.name, price: item.price, description: item.description ?? "" } }))}
                            className="text-xs text-clinic-text-muted hover:text-clinic-teal transition-colors shrink-0 mt-0.5"
                          >
                            <Icon name="Pencil" size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item)}
                            className="text-xs text-clinic-text-muted hover:text-red-500 transition-colors shrink-0 mt-0.5"
                          >
                            <Icon name="Trash2" size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}

                {addingItem[sec.id] ? (
                  <div className="px-5 py-3 bg-clinic-teal-light/30 space-y-2">
                    <div className="flex items-center gap-2">
                      <Input
                        className="h-8 text-sm flex-1"
                        placeholder="Название услуги"
                        value={newItemName[sec.id] ?? ""}
                        onChange={(e) => setNewItemName((p) => ({ ...p, [sec.id]: e.target.value }))}
                      />
                      <Input
                        className="h-8 text-sm w-28 shrink-0"
                        placeholder="Цена"
                        value={newItemPrice[sec.id] ?? ""}
                        onChange={(e) => setNewItemPrice((p) => ({ ...p, [sec.id]: e.target.value }))}
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
                    <textarea
                      className="w-full text-xs text-clinic-text border border-border rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-clinic-teal bg-white"
                      rows={2}
                      placeholder="Описание (необязательно): состав чекапа, что входит, примечания..."
                      value={newItemDesc[sec.id] ?? ""}
                      onChange={(e) => setNewItemDesc((p) => ({ ...p, [sec.id]: e.target.value }))}
                    />
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