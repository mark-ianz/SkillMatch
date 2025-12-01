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

  // if the user status_id is onboarding and is an applicant, redirect to the /onboarding/applicant
  if (session?.user.status_id === 7 && session?.user.role_id === 3) {
    redirect("/onboarding/applicant", RedirectType.replace);
  }

  // if the user status_id is onboarding and is an company, redirect to the /onboarding/company
  if (session?.user.status_id === 7 && session?.user.role_id === 4) {
    redirect("/onboarding/company", RedirectType.replace);
  }

  // redirect the user to feed if the user is already active
  if (session?.user && session.user.status_id === 1) {
    redirect("/feed", RedirectType.replace);
  }

  // else proceed
  return (
    <>
      {children}
    </>
  );
}
