import Icon from "@/components/ui/icon";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";

export default function Requisites() {
  return (
    <>
      <SEO
        title="Реквизиты организации — Ваш Ортопед"
        description="Реквизиты ООО Адеп: ИНН, КПП, ОГРН, расчётный счёт, юридический адрес."
        canonical="/requisites"
      />

      <section className="bg-clinic-beige py-10 border-b border-border">
        <div className="container">
          <Link to="/contacts" className="inline-flex items-center gap-1 text-sm text-clinic-teal hover:underline mb-4">
            <Icon name="ChevronLeft" size={15} />
            Назад к контактам
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-clinic-teal-light flex items-center justify-center">
              <Icon name="Building2" size={20} className="text-clinic-teal" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-clinic-text">Реквизиты организации</h1>
          </div>
        </div>
      </section>

      <section className="container py-10">
        <div className="bg-white rounded-2xl border border-border p-7 max-w-2xl">
          <div className="flex justify-center mb-8">
            <img
              src="https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/bucket/ff359cef-7f64-488d-80fb-6c9a3385399b.png"
              alt="Логотип Ваш Ортопед"
              className="w-32 h-32 object-contain"
            />
          </div>

          <ul className="space-y-5">
            {[
              { label: "Название организации", value: 'Общество с ограниченной ответственностью "Адеп"' },
              { label: "Юридический адрес", value: "630124, Россия, Новосибирская область, г. Новосибирск, ул. Есенина, д. 67, офис 5" },
              { label: "Генеральный директор", value: "Буланбаев Бекболот Ардинатович" },
              { label: "ИНН", value: "5405011289" },
              { label: "КПП", value: "540501001" },
              { label: "Расчётный счёт", value: "40702810910001730371" },
              { label: "ОГРН", value: "1245400043118" },
              { label: "ОКПО", value: "54572037" },
            ].map((item) => (
              <li key={item.label} className="flex flex-col gap-1 border-b border-border pb-5 last:border-0 last:pb-0">
                <div className="text-xs text-clinic-text-muted">{item.label}</div>
                <div className="text-clinic-text font-medium">{item.value}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
