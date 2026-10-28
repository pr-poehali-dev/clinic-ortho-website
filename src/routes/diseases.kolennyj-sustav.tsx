import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import KolennyjSustav from "@/pages/diseases/KolennyjSustav";

export const Route = createFileRoute("/diseases/kolennyj-sustav")({
  component: Page,
});

function Page() {
  return <Layout><KolennyjSustav /></Layout>;
}
