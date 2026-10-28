import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import Neurology from "@/pages/services/Neurology";

export const Route = createFileRoute("/services/neurology-clinic")({
  component: Page,
});

function Page() {
  return <Layout><Neurology /></Layout>;
}
