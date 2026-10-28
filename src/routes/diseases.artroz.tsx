import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import Artroz from "@/pages/diseases/Artroz";

export const Route = createFileRoute("/diseases/artroz")({
  component: Page,
});

function Page() {
  return <Layout><Artroz /></Layout>;
}
