import { useState, useEffect } from "react";
import { format, addDays, isBefore, startOfDay, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import SEO from "@/components/SEO";

const API = "https://functions.poehali.dev/ff479269-7374-4eb2-8b98-a7384c275ca2";

type Specialist = {
  id: number;
  name: string;
  specialty: string;
  specialty_type: string;
};

type Slot = {
  time: string;
  available: boolean;
};

type ScheduleEntry = {
  specialist_id: number;
  work_date: string;
};

type Step = "specialist" | "date" | "time" | "contact" | "success";

const NOTIFY_CHANNELS = [
  { value: "telegram", label: "Telegram", icon: "Send" },
  { value: "max", label: "Макс (VK)", icon: "MessageSquare" },
  { value: "email", label: "Email", icon: "Mail" },
];

export default function Booking() {
  const [step, setStep] = useState<Step>("specialist");
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotDuration, setSlotDuration] = useState(40);

  const [selectedSpec, setSelectedSpec] = useState<Specialist | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [notifyChannel, setNotifyChannel] = useState("email");
  const [notifyContact, setNotifyContact] = useState("");
  const [massageDuration, setMassageDuration] = useState(40);

  const [form, setForm] = useState({ name: "", phone: "", comment: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ appointment_id: number; cancel_token: string } | null>(null);

  const today = startOfDay(new Date());
  const maxDate = addDays(today, 13);

  useEffect(() => {
    fetch(`${API}/specialists`)
      .then((r) => r.json())
      .then(setSpecialists);
  }, []);

  useEffect(() => {
    if (!selectedSpec) return;
    const from = format(today, "yyyy-MM-dd");
    const to = format(maxDate, "yyyy-MM-dd");
    fetch(`${API}/schedule?specialist_id=${selectedSpec.id}&from=${from}&to=${to}`)
      .then((r) => r.json())
      .then(setSchedule);
  }, [selectedSpec]);

  useEffect(() => {
    if (!selectedSpec || !selectedDate) return;
    setSlots([]);
    fetch(`${API}/slots?specialist_id=${selectedSpec.id}&date=${selectedDate}`)
      .then((r) => r.json())
      .then((data) => {
        setSlots(data.slots || []);
        setSlotDuration(data.duration || 40);
        if (data.duration) setMassageDuration(data.duration);
      });
  }, [selectedSpec, selectedDate]);

  const workDates = new Set(schedule.map((s) => s.work_date));

  const getDatesInRange = () => {
    const dates: string[] = [];
    let cur = today;
    while (!isBefore(maxDate, cur)) {
      const str = format(cur, "yyyy-MM-dd");
      if (workDates.has(str)) dates.push(str);
      cur = addDays(cur, 1);
    }
    return dates;
  };

  const handleBook = async () => {
    if (!selectedSpec || !selectedDate || !selectedTime) return;
    setLoading(true);
    const body = {
      specialist_id: selectedSpec.id,
      date: selectedDate,
      time: selectedTime,
      patient_name: form.name,
      patient_phone: form.phone,
      patient_comment: form.comment,
      notify_channel: notifyChannel,
      notify_contact: notifyContact,
      duration_minutes: selectedSpec.specialty_type === "masseur" ? massageDuration : 40,
    };
    const res = await fetch(`${API}/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    setLoading(false);
    if (data.success) {
      setResult(data);
      setStep("success");
    } else {
      alert(data.error || "Ошибка записи, попробуйте другое время");
    }
  };

  const formatDate = (d: string) =>
    format(parseISO(d), "d MMMM, EEEE", { locale: ru });

  return (
    <>
      <SEO title="Онлайн-запись" description="Запишитесь к специалисту онлайн" />
      <div className="min-h-screen bg-[hsl(var(--clinic-warm))]">
        <div className="max-w-2xl mx-auto px-4 py-10">
          <h1 className="font-display text-3xl md:text-4xl text-[hsl(var(--clinic-text))] mb-2 text-center">
            Онлайн-запись
          </h1>
          <p className="text-center text-[hsl(var(--clinic-text-muted))] mb-8">
            Выберите специалиста, удобную дату и время
          </p>

          {/* Шаги */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {(["specialist", "date", "time", "contact"] as Step[]).map((s, i) => {
              const steps: Step[] = ["specialist", "date", "time", "contact", "success"];
              const cur = steps.indexOf(step);
              const idx = steps.indexOf(s);
              const done = cur > idx;
              const active = cur === idx;
              return (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      done
                        ? "bg-[hsl(var(--clinic-teal))] text-white"
                        : active
                        ? "bg-[hsl(var(--clinic-teal))] text-white"
                        : "bg-white border-2 border-[hsl(var(--border))] text-[hsl(var(--clinic-text-muted))]"
                    }`}
                  >
                    {done ? <Icon name="Check" size={14} /> : i + 1}
                  </div>
                  {i < 3 && <div className={`w-8 h-0.5 ${done ? "bg-[hsl(var(--clinic-teal))]" : "bg-[hsl(var(--border))]"}`} />}
                </div>
              );
            })}
          </div>

          {/* ШАГ 1: Выбор специалиста */}
          {step === "specialist" && (
            <div className="space-y-3 animate-fade-in">
              <h2 className="font-display text-xl text-[hsl(var(--clinic-text))] mb-4">Выберите специалиста</h2>
              {specialists.map((spec) => (
                <Card
                  key={spec.id}
                  className={`cursor-pointer border-2 transition-all hover:border-[hsl(var(--clinic-teal))] hover:shadow-md ${
                    selectedSpec?.id === spec.id ? "border-[hsl(var(--clinic-teal))] bg-[hsl(var(--clinic-teal-light))]" : "border-[hsl(var(--border))]"
                  }`}
                  onClick={() => setSelectedSpec(spec)}
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      spec.specialty_type === "masseur" ? "bg-blue-100" : "bg-[hsl(var(--clinic-teal-light))]"
                    }`}>
                      <Icon
                        name={spec.specialty_type === "masseur" ? "Hands" : "Stethoscope"}
                        fallback="User"
                        size={22}
                        className="text-[hsl(var(--clinic-teal))]"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[hsl(var(--clinic-text))]">{spec.name}</p>
                      <p className="text-sm text-[hsl(var(--clinic-text-muted))]">{spec.specialty}</p>
                    </div>
                    {selectedSpec?.id === spec.id && (
                      <Icon name="CheckCircle" size={20} className="text-[hsl(var(--clinic-teal))]" />
                    )}
                  </CardContent>
                </Card>
              ))}
              <Button
                className="w-full mt-4 bg-[hsl(var(--clinic-teal))] text-white hover:bg-[hsl(var(--clinic-teal))]/90"
                disabled={!selectedSpec}
                onClick={() => setStep("date")}
              >
                Далее
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </div>
          )}

          {/* ШАГ 2: Выбор даты */}
          {step === "date" && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <Button variant="ghost" size="sm" onClick={() => setStep("specialist")}>
                  <Icon name="ArrowLeft" size={16} className="mr-1" /> Назад
                </Button>
                <h2 className="font-display text-xl text-[hsl(var(--clinic-text))]">Выберите дату</h2>
              </div>
              <Card className="mb-3">
                <CardContent className="p-4">
                  <p className="text-sm text-[hsl(var(--clinic-text-muted))] mb-1">Специалист</p>
                  <p className="font-medium text-[hsl(var(--clinic-text))]">{selectedSpec?.name}</p>
                  <Badge variant="outline" className="mt-1">{selectedSpec?.specialty}</Badge>
                </CardContent>
              </Card>
              {getDatesInRange().length === 0 ? (
                <div className="text-center py-10 text-[hsl(var(--clinic-text-muted))]">
                  <Icon name="Calendar" size={40} className="mx-auto mb-3 opacity-40" />
                  <p>Нет доступных дат на ближайшие 2 недели</p>
                  <p className="text-sm mt-1">Обратитесь по телефону для записи</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {getDatesInRange().map((d) => (
                    <button
                      key={d}
                      className={`p-3 rounded-xl border-2 text-left transition-all hover:border-[hsl(var(--clinic-teal))] ${
                        selectedDate === d
                          ? "border-[hsl(var(--clinic-teal))] bg-[hsl(var(--clinic-teal-light))]"
                          : "border-[hsl(var(--border))] bg-white"
                      }`}
                      onClick={() => setSelectedDate(d)}
                    >
                      <p className="font-medium text-[hsl(var(--clinic-text))] capitalize">
                        {format(parseISO(d), "EEEE", { locale: ru })}
                      </p>
                      <p className="text-sm text-[hsl(var(--clinic-text-muted))]">
                        {format(parseISO(d), "d MMMM", { locale: ru })}
                      </p>
                    </button>
                  ))}
                </div>
              )}
              <Button
                className="w-full mt-4 bg-[hsl(var(--clinic-teal))] text-white hover:bg-[hsl(var(--clinic-teal))]/90"
                disabled={!selectedDate}
                onClick={() => setStep("time")}
              >
                Далее
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </div>
          )}

          {/* ШАГ 3: Выбор времени */}
          {step === "time" && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <Button variant="ghost" size="sm" onClick={() => setStep("date")}>
                  <Icon name="ArrowLeft" size={16} className="mr-1" /> Назад
                </Button>
                <h2 className="font-display text-xl text-[hsl(var(--clinic-text))]">Выберите время</h2>
              </div>
              <Card className="mb-4">
                <CardContent className="p-4 flex gap-4">
                  <div>
                    <p className="text-xs text-[hsl(var(--clinic-text-muted))]">Специалист</p>
                    <p className="font-medium text-sm">{selectedSpec?.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[hsl(var(--clinic-text-muted))]">Дата</p>
                    <p className="font-medium text-sm capitalize">{formatDate(selectedDate)}</p>
                  </div>
                </CardContent>
              </Card>

              {selectedSpec?.specialty_type === "masseur" && (
                <div className="mb-4">
                  <Label className="text-sm text-[hsl(var(--clinic-text-muted))] mb-2 block">
                    Длительность массажа
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {[10, 20, 30, 40, 60].map((d) => (
                      <button
                        key={d}
                        className={`px-3 py-1.5 rounded-lg border-2 text-sm transition-all ${
                          massageDuration === d
                            ? "border-[hsl(var(--clinic-teal))] bg-[hsl(var(--clinic-teal-light))] text-[hsl(var(--clinic-teal))]"
                            : "border-[hsl(var(--border))] bg-white text-[hsl(var(--clinic-text-muted))]"
                        }`}
                        onClick={() => setMassageDuration(d)}
                      >
                        {d} мин
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {slots.length === 0 ? (
                <div className="text-center py-10 text-[hsl(var(--clinic-text-muted))]">
                  <Icon name="Clock" size={40} className="mx-auto mb-3 opacity-40" />
                  <p>Загрузка слотов...</p>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-2">
                  {slots.map((slot) => (
                    <button
                      key={slot.time}
                      disabled={!slot.available}
                      className={`py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                        !slot.available
                          ? "border-transparent bg-gray-100 text-gray-300 cursor-not-allowed line-through"
                          : selectedTime === slot.time
                          ? "border-[hsl(var(--clinic-teal))] bg-[hsl(var(--clinic-teal))] text-white"
                          : "border-[hsl(var(--border))] bg-white text-[hsl(var(--clinic-text))] hover:border-[hsl(var(--clinic-teal))]"
                      }`}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              )}
              <Button
                className="w-full mt-4 bg-[hsl(var(--clinic-teal))] text-white hover:bg-[hsl(var(--clinic-teal))]/90"
                disabled={!selectedTime}
                onClick={() => setStep("contact")}
              >
                Далее
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </div>
          )}

          {/* ШАГ 4: Контакты и подтверждение */}
          {step === "contact" && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <Button variant="ghost" size="sm" onClick={() => setStep("time")}>
                  <Icon name="ArrowLeft" size={16} className="mr-1" /> Назад
                </Button>
                <h2 className="font-display text-xl text-[hsl(var(--clinic-text))]">Ваши данные</h2>
              </div>

              <Card className="mb-4">
                <CardContent className="p-4">
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-[hsl(var(--clinic-text-muted))] text-xs">Специалист</p>
                      <p className="font-medium">{selectedSpec?.name}</p>
                    </div>
                    <div>
                      <p className="text-[hsl(var(--clinic-text-muted))] text-xs">Дата</p>
                      <p className="font-medium capitalize">{format(parseISO(selectedDate), "d MMM", { locale: ru })}</p>
                    </div>
                    <div>
                      <p className="text-[hsl(var(--clinic-text-muted))] text-xs">Время</p>
                      <p className="font-medium">{selectedTime}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div>
                  <Label>Ваше имя *</Label>
                  <Input
                    placeholder="Иванов Иван Иванович"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Телефон *</Label>
                  <Input
                    placeholder="+7 (___) ___-__-__"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Способ уведомления</Label>
                  <div className="flex gap-2 mt-2">
                    {NOTIFY_CHANNELS.map((ch) => (
                      <button
                        key={ch.value}
                        className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border-2 transition-all ${
                          notifyChannel === ch.value
                            ? "border-[hsl(var(--clinic-teal))] bg-[hsl(var(--clinic-teal-light))]"
                            : "border-[hsl(var(--border))] bg-white"
                        }`}
                        onClick={() => setNotifyChannel(ch.value)}
                      >
                        <Icon name={ch.icon} fallback="Bell" size={18} className={notifyChannel === ch.value ? "text-[hsl(var(--clinic-teal))]" : "text-[hsl(var(--clinic-text-muted))]"} />
                        <span className={`text-xs font-medium ${notifyChannel === ch.value ? "text-[hsl(var(--clinic-teal))]" : "text-[hsl(var(--clinic-text-muted))]"}`}>
                          {ch.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                {notifyChannel !== "email" && (
                  <div>
                    <Label>
                      {notifyChannel === "telegram" ? "Ваш Telegram (username или номер)" : "Ваш номер телефона в Макс"}
                    </Label>
                    <Input
                      placeholder={notifyChannel === "telegram" ? "@username или +79..." : "+79..."}
                      value={notifyContact}
                      onChange={(e) => setNotifyContact(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                )}
                {notifyChannel === "email" && (
                  <div>
                    <Label>Email для уведомления</Label>
                    <Input
                      placeholder="your@email.ru"
                      value={notifyContact}
                      onChange={(e) => setNotifyContact(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                )}
                <div>
                  <Label>Комментарий (необязательно)</Label>
                  <Textarea
                    placeholder="Опишите жалобы или пожелания..."
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    className="mt-1 resize-none"
                    rows={3}
                  />
                </div>
                <Button
                  className="w-full bg-[hsl(var(--clinic-teal))] text-white hover:bg-[hsl(var(--clinic-teal))]/90 h-12"
                  disabled={!form.name || !form.phone || loading}
                  onClick={handleBook}
                >
                  {loading ? (
                    <Icon name="Loader2" size={18} className="animate-spin mr-2" />
                  ) : (
                    <Icon name="CalendarCheck" size={18} className="mr-2" />
                  )}
                  {loading ? "Записываемся..." : "Подтвердить запись"}
                </Button>
              </div>
            </div>
          )}

          {/* ШАГ 5: Успех */}
          {step === "success" && (
            <div className="text-center animate-fade-in-up py-6">
              <div className="w-20 h-20 rounded-full bg-[hsl(var(--clinic-teal-light))] flex items-center justify-center mx-auto mb-6">
                <Icon name="CalendarCheck" size={40} className="text-[hsl(var(--clinic-teal))]" />
              </div>
              <h2 className="font-display text-2xl text-[hsl(var(--clinic-text))] mb-2">Запись создана!</h2>
              <p className="text-[hsl(var(--clinic-text-muted))] mb-6">
                Ждём вас{" "}
                <span className="font-medium text-[hsl(var(--clinic-text))] capitalize">
                  {formatDate(selectedDate)}
                </span>{" "}
                в <span className="font-medium text-[hsl(var(--clinic-text))]">{selectedTime}</span>
              </p>
              <Card className="text-left mb-6">
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[hsl(var(--clinic-text-muted))]">Специалист</span>
                    <span className="font-medium">{selectedSpec?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[hsl(var(--clinic-text-muted))]">Дата и время</span>
                    <span className="font-medium capitalize">
                      {format(parseISO(selectedDate), "d MMMM", { locale: ru })}, {selectedTime}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[hsl(var(--clinic-text-muted))]">Пациент</span>
                    <span className="font-medium">{form.name}</span>
                  </div>
                </CardContent>
              </Card>
              <p className="text-xs text-[hsl(var(--clinic-text-muted))] mb-4">
                Номер записи: #{result?.appointment_id}
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setStep("specialist");
                  setSelectedSpec(null);
                  setSelectedDate("");
                  setSelectedTime("");
                  setForm({ name: "", phone: "", comment: "" });
                  setNotifyContact("");
                  setResult(null);
                }}
              >
                Записаться ещё раз
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}