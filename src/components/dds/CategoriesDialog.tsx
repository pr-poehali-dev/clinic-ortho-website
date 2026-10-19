import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";
import { Category, ddsRequest } from "./api";

interface Props {
  open: boolean;
  onClose: () => void;
  categories: Category[];
  onChanged: () => void;
  onError: (e: unknown) => void;
}

export default function CategoriesDialog({ open, onClose, categories, onChanged, onError }: Props) {
  const [newName, setNewName] = useState("");
  const [editing, setEditing] = useState<Record<number, string>>({});

  const call = async (method: "POST" | "PUT", body: object, msg: string) => {
    try {
      await ddsRequest(method, { action: "categories" }, body);
      toast.success(msg);
      onChanged();
      return true;
    } catch (e) {
      onError(e);
      return false;
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Статьи расходов</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2">
          <Input placeholder="Новая статья" value={newName} onChange={(e) => setNewName(e.target.value)} />
          <Button
            disabled={!newName.trim()}
            onClick={async () => {
              if (await call("POST", { name: newName.trim() }, "Статья добавлена")) setNewName("");
            }}
          >
            <Icon name="Plus" size={16} />
          </Button>
        </div>
        <div className="divide-y border rounded-lg">
          {categories.map((c) => {
            const val = editing[c.id];
            return (
              <div key={c.id} className={`flex items-center gap-2 p-2 ${c.is_active ? "" : "opacity-50"}`}>
                {val !== undefined ? (
                  <>
                    <Input value={val} onChange={(e) => setEditing({ ...editing, [c.id]: e.target.value })} className="h-8" />
                    <button
                      className="p-1 text-clinic-teal"
                      onClick={async () => {
                        if (await call("PUT", { id: c.id, name: val }, "Сохранено")) {
                          const next = { ...editing };
                          delete next[c.id];
                          setEditing(next);
                        }
                      }}
                    >
                      <Icon name="Check" size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <span className="flex-1 text-sm">{c.name}</span>
                    <button className="p-1 text-slate-400 hover:text-slate-700" onClick={() => setEditing({ ...editing, [c.id]: c.name })}>
                      <Icon name="Pencil" size={15} />
                    </button>
                  </>
                )}
                <button
                  className={`p-1 ${c.is_active ? "text-slate-400 hover:text-red-600" : "text-slate-400 hover:text-clinic-teal"}`}
                  title={c.is_active ? "Удалить" : "Вернуть"}
                  onClick={() => call("PUT", { id: c.id, is_active: !c.is_active }, c.is_active ? "Статья удалена" : "Статья возвращена")}
                >
                  <Icon name={c.is_active ? "Trash2" : "RotateCcw"} size={15} />
                </button>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-slate-500">Удалённые статьи не пропадают из уже внесённых расходов — их можно вернуть.</p>
      </DialogContent>
    </Dialog>
  );
}
