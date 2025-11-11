import { useSession } from "next-auth/react";
import { forbidden, unauthorized } from "next/navigation";

export default function useRequireCompany(): string | null {
  const session = useSession();

  // while session is loading, return null so callers can render a loader
  if (session.status === "loading") return null;

  if (session.status === "unauthenticated") {
    unauthorized();
  }

  if (session.status === "authenticated" && !session.data?.user.company_id) {
    // Redirect users that are authenticated but are not associated with a company
    forbidden();
  }

  const company_id = session.data?.user.company_id as string | undefined;
  return company_id ?? null;
}
