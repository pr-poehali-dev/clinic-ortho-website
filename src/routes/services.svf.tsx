import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import SvfLanding from "@/pages/services/SvfLanding";

export const Route = createFileRoute("/services/svf")({
  component: Page,
});

function Page() {
  return <Layout><SvfLanding /></Layout>;
}
