import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";

export const Route = createFileRoute("/")({
  component: Page,
});

function Page() {
  return <Layout><Home /></Layout>;
}
