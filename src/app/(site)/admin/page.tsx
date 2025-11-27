import { redirect } from "next/navigation";

export default function AdminPage() {
  // Redirect to companies page by default
  redirect("/admin/companies");
}
