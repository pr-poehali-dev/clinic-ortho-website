import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import Requisites from "@/pages/Requisites";

export const Route = createFileRoute("/requisites")({
  component: Page,
});

function Page() {
  return <Layout><Requisites /></Layout>;
}
