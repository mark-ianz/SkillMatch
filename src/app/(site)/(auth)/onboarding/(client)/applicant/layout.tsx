import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authConfig } from "@/lib/auth";
import OnboardingClientLayout from "@/components/layout/OnboardingClientLayout";

export default async function ApplicantOnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authConfig);

  // Check if user is logged in
  if (!session?.user) {
    redirect("/signup?type=applicant");
  }

  // Check if not in onboarding status
  if (session.user.status_id !== 7) {
    redirect("/feed");
  }

  // Check if not an applicant
  if (session.user.role_id !== 3) {
    redirect("/onboarding/company");
  }

  return <OnboardingClientLayout type="applicant">{children}</OnboardingClientLayout>;
}
