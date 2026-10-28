import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import Publications from "@/pages/Publications";

export const Route = createFileRoute("/publications")({
  component: Page,
});

function Page() {
  return <Layout><Publications /></Layout>;
}
