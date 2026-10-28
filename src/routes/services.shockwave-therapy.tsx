import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import ShockwaveTherapy from "@/pages/services/ShockwaveTherapy";

export const Route = createFileRoute("/services/shockwave-therapy")({
  component: Page,
});

function Page() {
  return <Layout><ShockwaveTherapy /></Layout>;
}
