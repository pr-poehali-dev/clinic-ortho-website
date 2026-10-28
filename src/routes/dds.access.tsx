import { createFileRoute } from "@tanstack/react-router";
import DdsPending from "@/components/dds/DdsPending";
import DdsAccess from "@/pages/DdsAccess";

export const Route = createFileRoute("/dds/access")({
  ssr: false,
  pendingComponent: DdsPending,
  component: Page,
});

function Page() {
  return <DdsAccess />;
}
