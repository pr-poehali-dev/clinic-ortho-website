import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import UvtLanding from "@/pages/services/UvtLanding";

export const Route = createFileRoute("/services/uvt")({
  component: Page,
});

function Page() {
  return <Layout><UvtLanding /></Layout>;
}
