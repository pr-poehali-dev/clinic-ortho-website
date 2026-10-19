import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";
import DdsLogin from "@/components/dds/DdsLogin";
import DdsHeader from "@/components/dds/DdsHeader";
import DdsTable from "@/components/dds/DdsTable";
import EntryDialog from "@/components/dds/EntryDialog";
import MorningDialog from "@/components/dds/MorningDialog";
import CategoriesDialog from "@/components/dds/CategoriesDialog";
import useDdsSession from "@/components/dds/useDdsSession";
import { exportMonth } from "@/components/dds/exportExcel";
import {
  AuthError,
  Category,
  DayRow,
  Entry,
  EntryType,
  MONTH_NAMES,
  canWrite,
  ddsRequest,
  isFull,
  pad,
} from "@/components/dds/api";

const START = "2026-10-01";

const shiftMonth = (ym: string, delta: number) => {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
};

export default function Dds() {
  const { session, login, logout, expire, minutesLeft } = useDdsSession();
  const [today, setToday] = useState("");
  const [month, setMonth] = useState("");
  const [days, setDays] = useState<DayRow[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [cell, setCell] = useState<{ date: string; type: EntryType | null } | null>(null);
  const [morningDay, setMorningDay] = useState<DayRow | null>(null);
  const [catsOpen, setCatsOpen] = useState(false);

  const handleErr = useCallback(
    (e: unknown) => {
      if (e instanceof AuthError) expire();
      toast.error(e instanceof Error ? e.message : "Ошибка");
    },
    [expire],
  );

  const loadCategories = useCallback(async () => {
    try {
      setCategories(await ddsRequest<Category[]>("GET", { action: "categories" }));
    } catch (e) {
      handleErr(e);
    }
  }, [handleErr]);

  const loadMonth = useCallback(
    async (ym: string) => {
      setLoading(true);
      try {
        const data = await ddsRequest<{ days: DayRow[]; entries: Entry[] }>("GET", { action: "month", month: ym });
        setDays(data.days);
        setEntries(data.entries);
      } catch (e) {
        handleErr(e);
      } finally {
        setLoading(false);
      }
    },
    [handleErr],
  );

  useEffect(() => {
    if (!session) return;
    ddsRequest<{ today: string }>("GET", { action: "me" })
      .then((r) => {
        setToday(r.today);
        setMonth((prev) => prev || (r.today < START ? START.slice(0, 7) : r.today.slice(0, 7)));
      })
      .catch(handleErr);
    loadCategories();
  }, [session, handleErr, loadCategories]);

  useEffect(() => {
    if (session && month) loadMonth(month);
  }, [session, month, loadMonth]);

  if (!session) return <DdsLogin title="ДДС клиники" onLogin={login} />;

  const role = session.role;
  const writer = canWrite(role);
  const full = isFull(role);
  const canEditDate = (d: string) => d >= START && (full || (role === "edit" && d === today));
  const [y, m] = month ? month.split("-").map(Number) : [0, 0];
  const reload = () => loadMonth(month);

  return (
    <div className="h-[100dvh] flex flex-col bg-slate-50">
      <DdsHeader session={session} minutesLeft={minutesLeft} onLogout={logout} current="table" />

      <div className="px-3 sm:px-5 py-2.5 flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1">
          <Button size="icon" variant="outline" className="h-9 w-9" disabled={!month || month <= START.slice(0, 7)} onClick={() => setMonth(shiftMonth(month, -1))}>
            <Icon name="ChevronLeft" size={18} />
          </Button>
          <div className="min-w-[130px] text-center font-semibold text-slate-900">{month && `${MONTH_NAMES[m - 1]} ${y}`}</div>
          <Button size="icon" variant="outline" className="h-9 w-9" disabled={!month} onClick={() => setMonth(shiftMonth(month, 1))}>
            <Icon name="ChevronRight" size={18} />
          </Button>
        </div>
        {loading && <Icon name="Loader2" size={16} className="animate-spin text-slate-400" />}
        <div className="ml-auto flex gap-2 flex-wrap">
          {writer && today >= START && (
            <Button size="sm" onClick={() => setCell({ date: today, type: null })}>
              <Icon name="Plus" size={16} className="mr-1" />
              Операция
            </Button>
          )}
          {full && (
            <Button size="sm" variant="outline" onClick={() => setCatsOpen(true)}>
              <Icon name="Tags" size={16} className="sm:mr-1" />
              <span className="hidden sm:inline">Статьи</span>
            </Button>
          )}
          <Button size="sm" variant="outline" disabled={!days.length} onClick={() => exportMonth(month, days, entries, categories)}>
            <Icon name="FileSpreadsheet" size={16} className="sm:mr-1" />
            <span className="hidden sm:inline">Excel</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 min-h-0 px-2 sm:px-5 pb-2 sm:pb-4">
        {days.length === 0 && !loading ? (
          <div className="h-full flex items-center justify-center text-slate-500 text-sm">Учёт ведётся с 01.10.2026</div>
        ) : (
          <DdsTable
            days={days}
            entries={entries}
            categories={categories}
            today={today}
            canWrite={writer}
            isOwner={role === "owner"}
            onCell={(date, type) => setCell({ date, type })}
            onMorning={setMorningDay}
          />
        )}
      </div>

      <div className="px-3 sm:px-5 pb-2 text-[11px] text-slate-500 flex flex-wrap gap-x-4 gap-y-1">
        <span className="inline-flex items-center gap-1"><Icon name="Sigma" size={11} />— считается по формуле</span>
        <span className="inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" />— есть комментарий</span>
        {role === "owner" && <span className="inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-violet-500" />— остаток внесён вручную</span>}
        {role === "edit" && <span>Вносить можно только за сегодня</span>}
      </div>

      <EntryDialog
        open={!!cell}
        onClose={() => setCell(null)}
        date={cell?.date || today}
        type={cell?.type ?? null}
        entries={entries}
        categories={categories}
        canEditDate={canEditDate}
        canPickDate={full}
        minDate={START}
        onChanged={reload}
        onCategoriesChanged={loadCategories}
        onError={handleErr}
      />
      <MorningDialog day={morningDay} isStart={morningDay?.date === START} onClose={() => setMorningDay(null)} onChanged={reload} onError={handleErr} />
      <CategoriesDialog open={catsOpen} onClose={() => setCatsOpen(false)} categories={categories} onChanged={loadCategories} onError={handleErr} />
    </div>
  );
}
