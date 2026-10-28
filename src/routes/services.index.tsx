import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import Services, { type Service } from "@/pages/Services";
import { fetchSection } from "@/lib/content-api";

export const Route = createFileRoute("/services/")({
  loader: async () => ({ services: await fetchSection<Service>("services") }),
  component: Page,
});

function Page() {
  const { services } = Route.useLoaderData();
  return <Layout><Services initialServices={services} /></Layout>;
}
