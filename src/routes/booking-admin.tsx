import { createFileRoute } from "@tanstack/react-router";
import BookingAdmin from "@/pages/BookingAdmin";

export const Route = createFileRoute("/booking-admin")({
  component: Page,
});

function Page() {
  return <BookingAdmin />;
}
