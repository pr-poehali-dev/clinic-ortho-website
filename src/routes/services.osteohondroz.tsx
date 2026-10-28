import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import OsteohondrozService from "@/pages/services/OsteohondrozService";

export const Route = createFileRoute("/services/osteohondroz")({
  component: Page,
});

function Page() {
  return <Layout><OsteohondrozService /></Layout>;
}
