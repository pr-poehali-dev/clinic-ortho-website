import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import Supervisors from "@/pages/Supervisors";

export const Route = createFileRoute("/supervisors")({
  component: Page,
});

function Page() {
  return <Layout><Supervisors /></Layout>;
}
