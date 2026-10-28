import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import LabTests from "@/pages/services/LabTests";

export const Route = createFileRoute("/services/lab-tests")({
  component: Page,
});

function Page() {
  return <Layout><LabTests /></Layout>;
}
