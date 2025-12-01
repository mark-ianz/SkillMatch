import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect, RedirectType } from "next/navigation";
import { ReactNode } from "react";

export default async function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authConfig);
  console.log(session);
  // if the user status_id is active, redirect to feed
  if (session?.user.status_id === 1) {
    redirect("/feed", RedirectType.replace);
  }

  // redirect the user to signup if no session exists
  if (!session?.user) {
    redirect("/signup", RedirectType.replace);
  }

  return (
    <>
      {children}
    </>
  );
}
