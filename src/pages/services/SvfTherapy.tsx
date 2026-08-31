import SEO from "@/components/SEO";
import Icon from "@/components/ui/icon";

const TYPES = [
  { title: "SVF при артрозе коленного сустава", desc: "Гонартроз 1–3 стадии. Снижение боли на 60–80%, восстановление хряща без эндопротезирования" },
  { title: "SVF при коксартрозе", desc: "Артроз тазобедренного сустава — уходит боль в паху и бедре, возвращается свобода движений" },
  { title: "SVF при артрозе плеча и голеностопа", desc: "Плечевой, голеностопный и локтевой суставы — восстановление подвижности без операции" },
  { title: "SVF при тендинопатиях и после операций", desc: "Хронические поражения сухожилий и ускорение восстановления хряща после артроскопии" },
];

const INDICATIONS = [
  "Артроз коленного сустава (гонартроз)",
  "Артроз тазобедренного сустава (коксартроз)",
  "Артроз плечевого, голеностопного, локтевого суставов",
  "Хронические тендинопатии и энтезопатии",
  "Дегенеративные повреждения менисков",
  "Асептический некроз головки бедренной кости",
];

export default function SvfTherapy() {
  return (
    <>
      <SEO
        title="SVF-терапия в Новосибирске — стромально-васкулярная фракция суставов"
        description="SVF-терапия в клинике «Ваш Ортопед» в Новосибирске: клеточное лечение артроза коленного и тазобедренного суставов собственными клетками. Альтернатива эндопротезированию. Запись онлайн."
        canonical="/services/svf-therapy"
        breadcrumbs={[
          { name: "Главная", url: "/" },
          { name: "SVF-терапия", url: "/services/svf-therapy" },
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "MedicalTherapy",
          "name": "SVF-терапия (стромально-васкулярная фракция)",
          "description": "Клеточное лечение артроза коленного и тазобедренного суставов стромально-васкулярной фракцией в Новосибирске",
          "medicineSystem": "WesternConventional",
          "recognizingAuthority": { "@type": "Organization", "name": "Ваш Ортопед" },
        }}
      />

      <section className="bg-clinic-beige py-8 border-b border-border">
        <div className="container">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="Dna" size={18} className="text-clinic-teal shrink-0" />
            <h1 className="font-display text-2xl md:text-4xl text-clinic-text">SVF-терапия в Новосибирске</h1>
          </div>
          <p className="text-clinic-text-muted text-sm md:text-base max-w-2xl ml-9">
            Клеточное лечение артроза собственными клетками — во многих случаях альтернатива замене сустава
          </p>
        </div>
      </section>

      <section className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            <div>
              <h2 className="font-display text-2xl text-clinic-text mb-4">SVF-терапия в клинике «Ваш Ортопед»</h2>
              <p className="text-clinic-text-muted leading-relaxed mb-3">
                SVF-терапия (стромально-васкулярная фракция) — метод регенеративной медицины, при котором в повреждённый сустав вводят концентрат регенеративных клеток, полученный из собственной жировой ткани пациента. В отличие от обезболивающих, которые лишь маскируют симптомы, SVF подавляет хроническое воспаление в суставе и запускает восстановление хряща.
              </p>
              <p className="text-clinic-text-muted leading-relaxed">
                Используется исключительно аутологичный материал, поэтому риск отторжения полностью исключён. В клинике «Ваш Ортопед» в Новосибирске процедуру проводят врачи травматологи-ортопеды, введение выполняется под контролем УЗИ. Мы не назначаем SVF всем подряд: сначала врач оценивает стадию артроза и честно говорит, будет ли метод эффективен в вашем случае.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-clinic-text mb-4">Виды процедур SVF</h2>
              <div className="space-y-3">
                {TYPES.map((t) => (
                  <div key={t.title} className="bg-white border border-border rounded-xl p-4">
                    <h3 className="font-semibold text-clinic-text mb-1">{t.title}</h3>
                    <p className="text-sm text-clinic-text-muted">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl text-clinic-text mb-4">Показания к SVF-терапии</h2>
              <ul className="space-y-2">
                {INDICATIONS.map((i) => (
                  <li key={i} className="flex items-start gap-3 text-clinic-text-muted text-sm">
                    <Icon name="CheckCircle" size={16} className="text-clinic-teal mt-0.5 shrink-0" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-clinic-teal-light rounded-2xl p-6">
              <h2 className="font-display text-xl text-clinic-text mb-2">Как проходит процедура SVF</h2>
              <p className="text-sm text-clinic-text-muted leading-relaxed">
                Процедура амбулаторная и занимает около 1,5–2 часов. Под местной анестезией через микропрокол берётся небольшой объём жировой ткани, затем материал обрабатывается в закрытой стерильной системе, и полученный концентрат вводится в сустав под контролем УЗИ. Госпитализация не требуется — через 30–40 минут вы уходите домой. Достаточно одной процедуры: первое улучшение наступает через 3–4 недели, максимальный эффект развивается к 6 месяцам и сохраняется от 18 месяцев до нескольких лет.
              </p>
            </div>
          </div>

          <div>
            <div className="bg-white border border-border rounded-2xl p-5 sticky top-24">
              <h3 className="font-display text-lg text-clinic-text mb-4">Записаться на SVF</h3>
              <p className="text-sm text-clinic-text-muted mb-4">SVF-терапия назначается после осмотра и УЗИ. Запишитесь — определим стадию и план лечения.</p>
              <a
                href="https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089&utm_source=site&utm_medium=organic&utm_campaign=svf-therapy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-clinic-teal text-white px-5 py-3 rounded-xl font-medium text-sm hover:bg-opacity-90 transition-all"
              >
                <Icon name="CalendarDays" size={15} /> Записаться онлайн
              </a>
              <a href="tel:+79994649194" className="w-full flex items-center justify-center gap-2 border border-clinic-teal text-clinic-teal px-5 py-3 rounded-xl font-medium text-sm hover:bg-clinic-teal-light transition-all mt-2">
                <Icon name="Phone" size={15} /> +7 999 464 91 94
              </a>
              <p className="text-xs text-clinic-text-muted mt-3 text-center">г. Новосибирск, ул. Есенина, 67</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
