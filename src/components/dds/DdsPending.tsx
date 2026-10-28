// Shown in the server HTML of the staff pages (the session lives in localStorage, so they render in the browser).
export default function DdsPending() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground text-center px-4">
      <p>Служебный раздел клиники «Ваш Ортопед» — учёт движения денежных средств и медицинских расходных материалов.</p>
      <p>Доступ только для сотрудников клиники. Загрузка...</p>
    </div>
  );
}
