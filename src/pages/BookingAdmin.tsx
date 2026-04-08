import { useState, useEffect, useCallback } from "react";
import { format, addDays, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const API = "https://functions.poehali.dev/ff479269-7374-4eb2-8b98-a7384c275ca2";
const ADMIN_PASSWORD = "ortho2025";

type Specialist = {
  id: number;
  name: string;
  specialty: string;
  specialty_type: string;
};

type Appointment = {
  id: number;
  specialist_name: string;
  specialty: string;
  date: string;
  time: string;
  duration: number;
  patient_name: string;
  patient_phone: string;
  comment: string;
  notify_channel: string;
  status: string;
  created_at: string;
  cancel_token: string;
};

type ScheduleEntry = {
  specialist_id: number;
  work_date: string;
  start_time: string;
  end_time: string;
};

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  confirmed: { label: "Подтверждена", color: "bg-green-100 text-green-700" },
  cancelled: { label: "Отменена", color: "bg-red-100 text-red-700" },
  completed: { label: "Завершена", color: "bg-gray-100 text-gray-600" },
};

const NOTIFY_LABELS: Record<string, string> = {
  telegram: "Telegram",
  max: "Макс",
  email: "Email",
};

export default function BookingAdmin() {
  const { toast } = useToast();
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");

  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);

  const [filterSpec, setFilterSpec] = useState("all");
  const [filterDate, setFilterDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [filterStatus, setFilterStatus] = useState("all");

  const [schedSpec, setSchedSpec] = useState("");
  const [schedDate, setSchedDate] = useState("");
  const [schedStart, setSchedStart] = useState("09:00");
  const [schedEnd, setSchedEnd] = useState("19:00");

  const loadData = useCallback(async () => {
    const [specsRes, apptRes, schedRes] = await Promise.all([
      fetch(`${API}/specialists`),
      fetch(`${API}/appointments?status=${filterStatus}`),
      fetch(`${API}/schedule`),
    ]);
    setSpecialists(await specsRes.json());
    setAppointments(await apptRes.json());
    setSchedule(await schedRes.json());
  }, [filterStatus]);

  useEffect(() => {
    if (authed) loadData();
  }, [authed, loadData]);

  const loadAppointments = useCallback(async () => {
    let url = `${API}/appointments?status=${filterStatus}`;
    if (filterSpec !== "all") url += `&specialist_id=${filterSpec}`;
    if (filterDate) url += `&date=${filterDate}`;
    const res = await fetch(url);
    setAppointments(await res.json());
  }, [filterSpec, filterDate, filterStatus]);

  useEffect(() => {
    if (authed) loadAppointments();
  }, [authed, loadAppointments]);

  const updateAppointment = async (id: number, status: string) => {
    await fetch(`${API}/admin/appointment`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    toast({ description: "Статус обновлён" });
    loadAppointments();
  };

  const addSchedule = async () => {
    if (!schedSpec || !schedDate) return;
    const res = await fetch(`${API}/admin/schedule`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        specialist_id: parseInt(schedSpec),
        work_date: schedDate,
        start_time: schedStart,
        end_time: schedEnd,
      }),
    });
    const data = await res.json();
    if (data.success) {
      toast({ description: "Рабочий день добавлен" });
      const schedRes = await fetch(`${API}/schedule`);
      setSchedule(await schedRes.json());
    }
  };

  const generateWeekSchedule = async () => {
    if (!schedSpec) return;
    const today = new Date();
    let added = 0;
    for (let i = 0; i < 14; i++) {
      const d = addDays(today, i);
      const dow = d.getDay();
      if (dow === 0 || dow === 6) continue;
      await fetch(`${API}/admin/schedule`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          specialist_id: parseInt(schedSpec),
          work_date: format(d, "yyyy-MM-dd"),
          start_time: schedStart,
          end_time: schedEnd,
        }),
      });
      added++;
    }
    toast({ description: `Добавлено ${added} рабочих дней` });
    const schedRes = await fetch(`${API}/schedule`);
    setSchedule(await schedRes.json());
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[hsl(var(--clinic-warm))] flex items-center justify-center p-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="font-display text-2xl text-center">Администрирование</CardTitle>
            <p className="text-center text-sm text-[hsl(var(--clinic-text-muted))]">Управление записью пациентов</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Пароль</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && password === ADMIN_PASSWORD && setAuthed(true)}
                className="mt-1"
                placeholder="Введите пароль"
              />
            </div>
            <Button
              className="w-full bg-[hsl(var(--clinic-teal))] text-white"
              onClick={() => {
                if (password === ADMIN_PASSWORD) setAuthed(true);
                else toast({ description: "Неверный пароль", variant: "destructive" });
              }}
            >
              Войти
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const specById = Object.fromEntries(specialists.map((s) => [s.id, s]));

  const scheduleBySpec: Record<number, ScheduleEntry[]> = {};
  schedule.forEach((s) => {
    if (!scheduleBySpec[s.specialist_id]) scheduleBySpec[s.specialist_id] = [];
    scheduleBySpec[s.specialist_id].push(s);
  });

  const today = format(new Date(), "yyyy-MM-dd");
  const todayAppts = appointments.filter((a) => a.date === today && a.status === "confirmed");
  const totalConfirmed = appointments.filter((a) => a.status === "confirmed").length;

  return (
    <div className="min-h-screen bg-[hsl(var(--clinic-warm))]">
      <div className="bg-white border-b border-[hsl(var(--border))]">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="CalendarDays" size={24} className="text-[hsl(var(--clinic-teal))]" />
            <h1 className="font-display text-xl text-[hsl(var(--clinic-text))]">Управление записью</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setAuthed(false)}>
            <Icon name="LogOut" size={16} className="mr-1" /> Выйти
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Сводка */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-[hsl(var(--clinic-text-muted))]">Записей сегодня</p>
              <p className="text-2xl font-bold text-[hsl(var(--clinic-teal))]">{todayAppts.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-[hsl(var(--clinic-text-muted))]">Активных записей</p>
              <p className="text-2xl font-bold text-[hsl(var(--clinic-text))]">{totalConfirmed}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-[hsl(var(--clinic-text-muted))]">Специалистов</p>
              <p className="text-2xl font-bold text-[hsl(var(--clinic-text))]">{specialists.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-[hsl(var(--clinic-text-muted))]">Рабочих дней</p>
              <p className="text-2xl font-bold text-[hsl(var(--clinic-text))]">{schedule.length}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="appointments">
          <TabsList className="mb-4">
            <TabsTrigger value="appointments">
              <Icon name="ClipboardList" size={15} className="mr-1" /> Записи
            </TabsTrigger>
            <TabsTrigger value="schedule">
              <Icon name="CalendarPlus" size={15} className="mr-1" /> Расписание
            </TabsTrigger>
          </TabsList>

          {/* Вкладка: Записи */}
          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <div className="flex flex-wrap gap-3 items-end">
                  <div>
                    <Label className="text-xs">Специалист</Label>
                    <Select value={filterSpec} onValueChange={setFilterSpec}>
                      <SelectTrigger className="w-48 mt-1">
                        <SelectValue placeholder="Все" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все специалисты</SelectItem>
                        {specialists.map((s) => (
                          <SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs">Дата</Label>
                    <Input
                      type="date"
                      value={filterDate}
                      onChange={(e) => setFilterDate(e.target.value)}
                      className="mt-1 w-40"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Статус</Label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-36 mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все</SelectItem>
                        <SelectItem value="confirmed">Активные</SelectItem>
                        <SelectItem value="cancelled">Отменённые</SelectItem>
                        <SelectItem value="completed">Завершённые</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline" size="sm" onClick={loadAppointments}>
                    <Icon name="RefreshCw" size={14} className="mr-1" /> Обновить
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {appointments.length === 0 ? (
                  <div className="text-center py-10 text-[hsl(var(--clinic-text-muted))]">
                    <Icon name="CalendarX" size={36} className="mx-auto mb-3 opacity-40" />
                    <p>Записей не найдено</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {appointments.map((appt) => (
                      <div key={appt.id} className="border border-[hsl(var(--border))] rounded-xl p-4 bg-white">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-[hsl(var(--clinic-text))]">{appt.patient_name}</span>
                              <span className="text-sm text-[hsl(var(--clinic-text-muted))]">{appt.patient_phone}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 text-sm text-[hsl(var(--clinic-text-muted))]">
                              <span className="flex items-center gap-1">
                                <Icon name="User" size={13} /> {appt.specialist_name}
                              </span>
                              <span className="flex items-center gap-1">
                                <Icon name="Calendar" size={13} />
                                {format(parseISO(appt.date), "d MMMM", { locale: ru })} в {appt.time}
                              </span>
                              <span className="flex items-center gap-1">
                                <Icon name="Clock" size={13} /> {appt.duration} мин
                              </span>
                              <span className="flex items-center gap-1">
                                <Icon name="Bell" size={13} /> {NOTIFY_LABELS[appt.notify_channel] || appt.notify_channel}
                              </span>
                            </div>
                            {appt.comment && (
                              <p className="text-sm text-[hsl(var(--clinic-text-muted))] mt-1 italic">"{appt.comment}"</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_LABELS[appt.status]?.color}`}>
                              {STATUS_LABELS[appt.status]?.label}
                            </span>
                            {appt.status === "confirmed" && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 text-xs"
                                  onClick={() => updateAppointment(appt.id, "completed")}
                                >
                                  <Icon name="CheckCircle" size={13} className="mr-1" /> Завершить
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 text-xs text-red-600 border-red-200 hover:bg-red-50"
                                  onClick={() => updateAppointment(appt.id, "cancelled")}
                                >
                                  <Icon name="X" size={13} className="mr-1" /> Отменить
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Вкладка: Расписание */}
          <TabsContent value="schedule">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Добавить рабочий день</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-xs">Специалист *</Label>
                    <Select value={schedSpec} onValueChange={setSchedSpec}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Выберите специалиста" />
                      </SelectTrigger>
                      <SelectContent>
                        {specialists.map((s) => (
                          <SelectItem key={s.id} value={String(s.id)}>
                            {s.name} — {s.specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs">Дата (или оставьте пустой для заполнения 2 недель)</Label>
                    <Input
                      type="date"
                      value={schedDate}
                      onChange={(e) => setSchedDate(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Label className="text-xs">Начало</Label>
                      <Input type="time" value={schedStart} onChange={(e) => setSchedStart(e.target.value)} className="mt-1" />
                    </div>
                    <div className="flex-1">
                      <Label className="text-xs">Конец</Label>
                      <Input type="time" value={schedEnd} onChange={(e) => setSchedEnd(e.target.value)} className="mt-1" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-[hsl(var(--clinic-teal))] text-white"
                      disabled={!schedSpec || !schedDate}
                      onClick={addSchedule}
                    >
                      <Icon name="Plus" size={15} className="mr-1" /> Добавить день
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      disabled={!schedSpec}
                      onClick={generateWeekSchedule}
                    >
                      <Icon name="CalendarRange" size={15} className="mr-1" /> Заполнить 2 недели
                    </Button>
                  </div>
                  <p className="text-xs text-[hsl(var(--clinic-text-muted))]">
                    "Заполнить 2 недели" добавит рабочие дни пн–пт на ближайшие 14 дней
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Текущее расписание</CardTitle>
                </CardHeader>
                <CardContent>
                  {specialists.map((spec) => {
                    const days = scheduleBySpec[spec.id] || [];
                    return (
                      <div key={spec.id} className="mb-4">
                        <p className="font-medium text-sm text-[hsl(var(--clinic-text))] mb-2 flex items-center gap-2">
                          <Badge variant="outline">{spec.specialty}</Badge>
                          {spec.name.split(" ")[0]} {spec.name.split(" ")[1]}
                        </p>
                        {days.length === 0 ? (
                          <p className="text-xs text-[hsl(var(--clinic-text-muted))] pl-2">Нет рабочих дней</p>
                        ) : (
                          <div className="flex flex-wrap gap-1">
                            {days.map((d) => (
                              <span
                                key={d.work_date}
                                className="text-xs px-2 py-1 bg-[hsl(var(--clinic-teal-light))] text-[hsl(var(--clinic-teal))] rounded-lg"
                              >
                                {format(parseISO(d.work_date), "d MMM", { locale: ru })}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
