import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import Infusions from "@/pages/services/Infusions";

export const Route = createFileRoute("/services/infusions")({
  component: Page,
});

function Page() {
  return <Layout><Infusions /></Layout>;
}
