import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import Osteohondroz from "@/pages/diseases/Osteohondroz";

export const Route = createFileRoute("/diseases/osteohondroz")({
  component: Page,
});

function Page() {
  return <Layout><Osteohondroz /></Layout>;
}
