import { redirect } from "next/navigation";

// Visiting the bare /profile/bookings URL sends people to a real,
// linkable tab instead of an ambiguous "no status" state.
export default function BookingsIndexPage() {
  redirect("/profile/bookings/pending");
}
