import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import Doctors, { type Doctor } from "@/pages/Doctors";
import { fetchSection } from "@/lib/content-api";

export const Route = createFileRoute("/doctors/")({
  loader: async () => ({ doctors: await fetchSection<Doctor>("doctors") }),
  component: Page,
});

function Page() {
  const { doctors } = Route.useLoaderData();
  return <Layout><Doctors initialDoctors={doctors} /></Layout>;
}
