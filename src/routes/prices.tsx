import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import Prices, { type PriceSection } from "@/pages/Prices";
import { fetchSection } from "@/lib/content-api";

export const Route = createFileRoute("/prices")({
  loader: async () => ({ sections: await fetchSection<PriceSection>("prices") }),
  component: Page,
});

function Page() {
  const { sections } = Route.useLoaderData();
  return <Layout><Prices initialSections={sections} /></Layout>;
}
