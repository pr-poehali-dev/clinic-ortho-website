import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import License from "@/pages/License";

export const Route = createFileRoute("/license")({
  component: Page,
});

function Page() {
  return <Layout><License /></Layout>;
}
