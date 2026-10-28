import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import LunyakinaCertificates from "@/pages/LunyakinaCertificates";

export const Route = createFileRoute("/doctors/lunyakina/certificates")({
  component: Page,
});

function Page() {
  return <Layout><LunyakinaCertificates /></Layout>;
}
