import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import Booking from "@/pages/Booking";

export const Route = createFileRoute("/booking")({
  component: Page,
});

function Page() {
  return <Layout><Booking /></Layout>;
}
