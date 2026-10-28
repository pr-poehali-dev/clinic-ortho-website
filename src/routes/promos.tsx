import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import Promos from "@/pages/Promos";

export const Route = createFileRoute("/promos")({
  component: Page,
});

function Page() {
  return <Layout><Promos /></Layout>;
}
