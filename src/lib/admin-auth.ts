import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

/**
 * Checks if the current session has admin access
 * Admin access is granted if:
 * - role_id is 2 (admin role), OR
 * - isAdmin flag is true (credentials-based admin login)
 */
export async function isAdmin(): Promise<boolean> {
  const session = await getServerSession(authConfig);
  
  if (!session) {
    return false;
  }

  const user = session.user;
  return user.role_id === 2 || user.isAdmin === true;
}

/**
 * Throws an error if the current session does not have admin access
 * Use this at the start of admin API routes
 */
export async function requireAdmin(): Promise<void> {
  const hasAccess = await isAdmin();
  
  if (!hasAccess) {
    throw new Error("Unauthorized: Admin access required");
  }
}
