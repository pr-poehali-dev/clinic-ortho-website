import { Helmet } from "react-helmet-async";

const SITE_NAME = "Ваш Ортопед";
const SITE_URL = "https://vashortopped.ru";
const DEFAULT_IMAGE = "https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/files/4a0a4c5f-8b18-4083-8a51-0d1df1369b90.jpg";
const PHONE = "+7 999 464 91 94";
const ADDRESS = "г. Новосибирск, ул. Есенина, д. 67";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  breadcrumbs?: BreadcrumbItem[];
  schema?: object;
}

export default function SEO({ title, description, canonical, image, breadcrumbs, schema }: SEOProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL;
  const ogImage = image || DEFAULT_IMAGE;

  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${SITE_URL}${item.url}`,
    })),
  } : null;

  return (
    <Helmet>
      <html lang="ru" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="ru_RU" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Breadcrumbs schema */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

      {/* Custom schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}

export const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "name": SITE_NAME,
  "description": "Клиника ортопедии и травматологии в Новосибирске. Лечение артроза, артрита, бурсита, синовита, тендинита. PRP-терапия, SVF-терапия, гиалуроновая кислота.",
  "url": SITE_URL,
  "telephone": PHONE,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ул. Есенина, д. 67",
    "addressLocality": "Новосибирск",
    "addressRegion": "Новосибирская область",
    "addressCountry": "RU",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 54.8527,
    "longitude": 83.1028,
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "09:00",
      "closes": "20:00",
    },
  ],
  "medicalSpecialty": ["Orthopedic", "Traumatology"],
  "image": DEFAULT_IMAGE,
  "priceRange": "₽₽",
};
