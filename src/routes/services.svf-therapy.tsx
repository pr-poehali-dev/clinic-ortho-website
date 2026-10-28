import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import SvfTherapy from "@/pages/services/SvfTherapy";

export const Route = createFileRoute("/services/svf-therapy")({
  component: Page,
});

function Page() {
  return <Layout><SvfTherapy /></Layout>;
}
