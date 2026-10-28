import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import TazobedrenyjSustav from "@/pages/diseases/TazobedrenyjSustav";

export const Route = createFileRoute("/diseases/tazobedrennyj-sustav")({
  component: Page,
});

function Page() {
  return <Layout><TazobedrenyjSustav /></Layout>;
}
