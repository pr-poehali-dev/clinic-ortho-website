import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import GialuronovayaKislota from "@/pages/services/GialuronovayaKislota";

export const Route = createFileRoute("/services/gialuronovaya-kislota")({
  component: Page,
});

function Page() {
  return <Layout><GialuronovayaKislota /></Layout>;
}
