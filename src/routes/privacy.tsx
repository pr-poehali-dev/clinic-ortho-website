import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import Privacy from "@/pages/Privacy";

export const Route = createFileRoute("/privacy")({
  component: Page,
});

function Page() {
  return <Layout><Privacy /></Layout>;
}
