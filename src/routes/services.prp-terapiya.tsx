import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import PrpTerapiya from "@/pages/services/PrpTerapiya";

export const Route = createFileRoute("/services/prp-terapiya")({
  component: Page,
});

function Page() {
  return <Layout><PrpTerapiya /></Layout>;
}
