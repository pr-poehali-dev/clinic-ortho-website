import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import ServiceDetail from "@/pages/ServiceDetail";
import { type Service } from "@/pages/Services";
import { fetchSection } from "@/lib/content-api";

// Old service addresses that permanently moved.
const REDIRECTS: Record<string, string> = {
  massazh: "/services/uvt",
  "massage-clinic": "/services/shockwave-therapy",
  massage: "/services/uvt",
};

export const Route = createFileRoute("/services/$slug")({
  beforeLoad: ({ params }) => {
    const to = REDIRECTS[params.slug];
    if (to) throw redirect({ to, statusCode: 301 });
  },
  loader: async ({ params }) => {
    const services = await fetchSection<Service>("services");
    if (services && !services.some((s) => s.slug === params.slug)) throw notFound();
    return { services };
  },
  component: Page,
});

function Page() {
  const { services } = Route.useLoaderData();
  return <Layout><ServiceDetail initialServices={services} /></Layout>;
}
