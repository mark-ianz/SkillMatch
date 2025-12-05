import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authConfig } from "@/lib/auth";
import UniversalHeader from "@/components/global/header/UniversalHeader";
import MainLayout from "@/components/layout/MainLayout";
import Footer from "@/components/global/Footer";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authConfig);

  // Check if user is logged in
  if (!session || !session.user) {
    redirect("/unauthorized");
  }

  // Check if user is in onboarding
  if (session.user.status_id === 7) {
    redirect("/onboarding/company");
  }

  // Check if user is a company and has proper status (active, pending, or rejected)
  if (session.user.role_id !== 4) {
    redirect("/forbidden");
  }

  // Allow active (1), pending (2), and rejected (3) companies
  const allowedStatuses = [1];
  if (!allowedStatuses.includes(session.user.status_id || 0)) {
    redirect("/forbidden");
  }

  return (
    <>
      <UniversalHeader role="Company"/>
      <MainLayout
        className="items-center"
        wrapperClassName="items-center flex-col w-full py-0"
      >
        <div className="container max-w-5xl py-10">
          {children}
        </div>
      </MainLayout>
      <Footer />
    </>
  );
}
