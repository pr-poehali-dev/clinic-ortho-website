import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import BulanbayevCertificates from "@/pages/BulanbayevCertificates";

export const Route = createFileRoute("/doctors/bulanbayev/certificates")({
  component: Page,
});

function Page() {
  return <Layout><BulanbayevCertificates /></Layout>;
}
