import Icon from "@/components/ui/icon";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";

export default function License() {
  return (
    <>
      <SEO
        title="Лицензия — Ваш Ортопед"
        description="Лицензия на медицинскую деятельность ООО Адеп. Регистрационный номер Л041-01125-54/03712480."
        canonical="/license"
      />

      <section className="bg-clinic-beige py-10 border-b border-border">
        <div className="container">
          <Link to="/contacts" className="inline-flex items-center gap-1 text-sm text-clinic-teal hover:underline mb-4">
            <Icon name="ChevronLeft" size={15} />
            Назад к контактам
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-clinic-teal-light flex items-center justify-center">
              <Icon name="FileCheck" size={20} className="text-clinic-teal" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-clinic-text">Лицензия</h1>
          </div>
          <p className="text-clinic-text-muted text-sm">Выписка из реестра лицензий по состоянию на 10:21 10.11.2025 г.</p>
          <p className="text-clinic-text-muted text-xs">(сформирована на интернет-портале Росздравнадзора)</p>
        </div>
      </section>

      <section className="container py-10">
        <div className="bg-white rounded-2xl border border-border p-7 max-w-2xl">
          <ul className="space-y-5">
            {[
              { num: "1", label: "Статус лицензии", value: <span className="text-green-600 font-semibold">Действует</span> },
              { num: "2", label: "Регистрационный номер лицензии", value: "Л041-01125-54/03712480" },
              { num: "3", label: "Дата предоставления лицензии", value: "10.11.2025" },
              { num: "4", label: "Лицензирующий орган", value: "Министерство здравоохранения Новосибирской области" },
              {
                num: "5",
                label: "Наименование организации",
                value: (
                  <div className="space-y-1 text-sm">
                    <p><span className="text-clinic-text-muted">Полное наименование:</span> Общество с ограниченной ответственностью «Адеп»</p>
                    <p><span className="text-clinic-text-muted">Сокращённое наименование:</span> ООО «Адеп»</p>
                    <p><span className="text-clinic-text-muted">ОПФ:</span> Общество с ограниченной ответственностью</p>
                    <p><span className="text-clinic-text-muted">Адрес места нахождения:</span> 630124, Россия, Новосибирская область, г. Новосибирск, ул. Есенина, д. 67, офис 5</p>
                    <p><span className="text-clinic-text-muted">ОГРН:</span> 1245400043118</p>
                  </div>
                ),
              },
              { num: "6", label: "ИНН", value: "5405011289" },
              { num: "7", label: "Лицензируемый вид деятельности", value: "Медицинская деятельность (за исключением указанной деятельности, осуществляемой медицинскими организациями и другими организациями, входящими в частную систему здравоохранения, на территории инновационного центра «Сколково»)" },
              { num: "8", label: "Адрес осуществления деятельности", value: "630124, Новосибирская область, г. Новосибирск, ул. Есенина, д. 67, этаж 1" },
            ].map((item) => (
              <li key={item.num} className="flex gap-4 border-b border-border pb-5 last:border-0 last:pb-0">
                <div className="w-7 h-7 rounded-full bg-clinic-teal-light flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-clinic-teal">{item.num}</span>
                </div>
                <div>
                  <div className="text-xs text-clinic-text-muted mb-1">{item.label}</div>
                  <div className="text-clinic-text font-medium text-sm">{item.value}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
