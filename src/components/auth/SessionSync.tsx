"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import useSessionStore from "@/store/SessionStore";
import { getRoleName } from "@/lib/utils";
import { Session } from "next-auth";

// this component is responsible for syncing the user session from server session to zustand store
export function SessionSync({ session }: { session: Session | null }) {
  const { status } = useSession();
  const setSession = useSessionStore((state) => state.setSession);
  const clearSession = useSessionStore((state) => state.clearSession);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const user = session.user;

      setSession({
        email: user.email || null,
        name: user.name || null,
        image: user.image || null,
        user_id: user.user_id,
        company_id: user.company_id,
        role_id: user.role_id,
        role_name: user.role_id ? getRoleName(user.role_id) as string : null,
        status_id: user.status_id,
        loading: false,
      });
    } else if (status === "unauthenticated") {
      clearSession();
    }
  }, [session, status, setSession, clearSession]);

  return null;
}
