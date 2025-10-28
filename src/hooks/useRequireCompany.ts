import { useSession } from "next-auth/react";
import { unauthorized } from "next/navigation";

export default function useRequireCompany(): number {
  const session = useSession();

  if (session.status === "authenticated" && !session.data?.user.company_id) {
    // Redirect users that are authenticated but are not associated with a company
    unauthorized();
  }

  const company_id = session.data?.user.company_id as number;
  return company_id;
}
