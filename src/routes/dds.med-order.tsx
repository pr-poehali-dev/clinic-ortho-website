import { createFileRoute } from "@tanstack/react-router";
import DdsPending from "@/components/dds/DdsPending";
import MedOrder from "@/pages/MedOrder";

export const Route = createFileRoute("/dds/med-order")({
  ssr: false,
  pendingComponent: DdsPending,
  component: Page,
});

function Page() {
  return <MedOrder />;
}
