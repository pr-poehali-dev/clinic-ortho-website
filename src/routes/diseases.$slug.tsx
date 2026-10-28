import { createFileRoute, notFound } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import DiseaseDetail, { DISEASES_LIST } from "@/pages/DiseaseDetail";

export const Route = createFileRoute("/diseases/$slug")({
  loader: ({ params }) => {
    if (!DISEASES_LIST.some((d) => d.slug === params.slug)) throw notFound();
  },
  component: Page,
});

function Page() {
  return <Layout><DiseaseDetail /></Layout>;
}
