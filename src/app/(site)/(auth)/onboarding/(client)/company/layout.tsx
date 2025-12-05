import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authConfig } from "@/lib/auth";
import OnboardingClientLayout from "@/components/layout/OnboardingClientLayout";

export default async function CompanyOnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authConfig);

  // Check if user is logged in
  if (!session?.user) {
    redirect("/signup?type=company");
  }

  // Check if not in onboarding status
  if (session.user.status_id !== 7) {
    redirect("/feed");
  }

  // Check if not a company
  if (session.user.role_id !== 4) {
    redirect("/onboarding/applicant");
  }

  return <OnboardingClientLayout type="employer">{children}</OnboardingClientLayout>;
}
