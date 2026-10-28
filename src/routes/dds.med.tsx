import { createFileRoute } from "@tanstack/react-router";
import DdsPending from "@/components/dds/DdsPending";
import Med from "@/pages/Med";

export const Route = createFileRoute("/dds/med")({
  ssr: false,
  pendingComponent: DdsPending,
  component: Page,
});

function Page() {
  return <Med />;
}
