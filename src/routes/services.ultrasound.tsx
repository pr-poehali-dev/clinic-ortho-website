import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import Ultrasound from "@/pages/services/Ultrasound";

export const Route = createFileRoute("/services/ultrasound")({
  component: Page,
});

function Page() {
  return <Layout><Ultrasound /></Layout>;
}
