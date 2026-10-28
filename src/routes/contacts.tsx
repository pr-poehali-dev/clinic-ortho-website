import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import Contacts from "@/pages/Contacts";

export const Route = createFileRoute("/contacts")({
  component: Page,
});

function Page() {
  return <Layout><Contacts /></Layout>;
}
