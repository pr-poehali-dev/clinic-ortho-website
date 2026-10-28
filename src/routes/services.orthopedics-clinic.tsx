import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import Orthopedics from "@/pages/services/Orthopedics";

export const Route = createFileRoute("/services/orthopedics-clinic")({
  component: Page,
});

function Page() {
  return <Layout><Orthopedics /></Layout>;
}
