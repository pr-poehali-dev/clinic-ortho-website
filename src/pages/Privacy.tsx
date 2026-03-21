import Icon from "@/components/ui/icon";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <>
      <SEO
        title="Политика обработки персональных данных — Ваш Ортопед"
        description="Политика ООО Адеп в отношении обработки персональных данных пациентов."
        canonical="/privacy"
      />

      <section className="bg-clinic-beige py-10 border-b border-border">
        <div className="container">
          <Link to="/contacts" className="inline-flex items-center gap-1 text-sm text-clinic-teal hover:underline mb-4">
            <Icon name="ChevronLeft" size={15} />
            Назад к контактам
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-clinic-teal-light flex items-center justify-center">
              <Icon name="ShieldCheck" size={20} className="text-clinic-teal" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-clinic-text">Политика обработки персональных данных</h1>
          </div>
          <p className="text-clinic-text-muted text-sm">ООО «Адеп» — редакция от 21.03.2026 г.</p>
        </div>
      </section>

      <section className="container py-10">
        <div className="bg-white rounded-2xl border border-border p-7 max-w-3xl space-y-8 text-sm text-clinic-text leading-relaxed">

          <div>
            <h2 className="font-display text-xl text-clinic-text mb-3">1. Общие положения</h2>
            <p>Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных, предпринимаемые Обществом с ограниченной ответственностью «Адеп» (далее — Оператор).</p>
            <p className="mt-2">Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.</p>
          </div>

          <div>
            <h2 className="font-display text-xl text-clinic-text mb-3">2. Основные понятия</h2>
            <ul className="space-y-2">
              <li><span className="font-medium">Персональные данные</span> — любая информация, относящаяся прямо или косвенно к определённому или определяемому физическому лицу (субъекту персональных данных).</li>
              <li><span className="font-medium">Оператор</span> — ООО «Адеп», которое организует и осуществляет обработку персональных данных, а также определяет цели обработки персональных данных.</li>
              <li><span className="font-medium">Обработка персональных данных</span> — любое действие с персональными данными, включая сбор, запись, хранение, передачу и удаление.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl text-clinic-text mb-3">3. Оператор может обрабатывать следующие данные</h2>
            <ul className="list-disc list-inside space-y-1 text-clinic-text-muted">
              <li>Фамилия, имя, отчество</li>
              <li>Дата рождения</li>
              <li>Номер телефона</li>
              <li>Адрес электронной почты</li>
              <li>Сведения о состоянии здоровья (в рамках оказания медицинской помощи)</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl text-clinic-text mb-3">4. Цели обработки персональных данных</h2>
            <ul className="list-disc list-inside space-y-1 text-clinic-text-muted">
              <li>Оказание медицинских услуг и ведение медицинской документации</li>
              <li>Запись пациентов на приём</li>
              <li>Информирование об услугах клиники</li>
              <li>Исполнение договорных обязательств</li>
              <li>Соблюдение требований законодательства Российской Федерации</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl text-clinic-text mb-3">5. Правовые основания обработки</h2>
            <p>Обработка персональных данных осуществляется на основании:</p>
            <ul className="list-disc list-inside space-y-1 text-clinic-text-muted mt-2">
              <li>Согласия субъекта персональных данных</li>
              <li>Федерального закона от 21.11.2011 № 323-ФЗ «Об основах охраны здоровья граждан в РФ»</li>
              <li>Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных»</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl text-clinic-text mb-3">6. Порядок и условия обработки</h2>
            <p>Обработка персональных данных осуществляется с согласия субъекта персональных данных на обработку его персональных данных. Оператор не передаёт персональные данные третьим лицам, за исключением случаев, предусмотренных действующим законодательством РФ.</p>
            <p className="mt-2">Хранение персональных данных осуществляется в форме, позволяющей определить субъекта персональных данных не дольше, чем этого требуют цели обработки персональных данных.</p>
          </div>

          <div>
            <h2 className="font-display text-xl text-clinic-text mb-3">7. Права субъекта персональных данных</h2>
            <p>Субъект персональных данных имеет право:</p>
            <ul className="list-disc list-inside space-y-1 text-clinic-text-muted mt-2">
              <li>Получить информацию об обработке его персональных данных</li>
              <li>Требовать уточнения, блокирования или уничтожения персональных данных</li>
              <li>Отозвать согласие на обработку персональных данных</li>
              <li>Обжаловать действия Оператора в уполномоченный орган</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl text-clinic-text mb-3">8. Контакты оператора</h2>
            <div className="bg-clinic-beige rounded-xl p-4 space-y-1">
              <p><span className="text-clinic-text-muted">Организация:</span> ООО «Адеп»</p>
              <p><span className="text-clinic-text-muted">Адрес:</span> 630124, г. Новосибирск, ул. Есенина, д. 67, офис 5</p>
              <p><span className="text-clinic-text-muted">Email:</span> <a href="mailto:admin@vash-ortoped54.ru" className="text-clinic-teal hover:underline">admin@vash-ortoped54.ru</a></p>
              <p><span className="text-clinic-text-muted">Телефон:</span> <a href="tel:+79994649194" className="text-clinic-teal hover:underline">+7 999 464 91 94</a></p>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h2 className="font-display text-xl text-clinic-text mb-4">Согласие на обработку персональных данных</h2>
            <div className="bg-clinic-beige rounded-xl p-5 text-xs text-clinic-text-muted leading-relaxed">
              <p>Я, субъект персональных данных, в соответствии с Федеральным законом от 27 июля 2006 года № 152-ФЗ «О персональных данных», даю согласие ООО «Адеп» (630124, г. Новосибирск, ул. Есенина, д. 67, офис 5) на обработку моих персональных данных, а именно: фамилии, имени, отчества, даты рождения, номера телефона, адреса электронной почты, сведений о состоянии здоровья.</p>
              <p className="mt-3">Обработка персональных данных осуществляется в целях оказания медицинских услуг, ведения медицинской документации, записи на приём и информирования об услугах клиники.</p>
              <p className="mt-3">Согласие действует до его отзыва. Я вправе отозвать согласие путём направления письменного заявления по адресу Оператора или на электронную почту <a href="mailto:admin@vash-ortoped54.ru" className="text-clinic-teal hover:underline">admin@vash-ortoped54.ru</a>.</p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
