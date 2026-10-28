import { createFileRoute } from "@tanstack/react-router";
import DdsPending from "@/components/dds/DdsPending";
import Dds from "@/pages/Dds";

export const Route = createFileRoute("/dds/")({
  ssr: false,
  pendingComponent: DdsPending,
  component: Page,
});

function Page() {
  return <Dds />;
}
