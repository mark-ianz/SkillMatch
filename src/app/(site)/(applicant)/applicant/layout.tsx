import { ReactNode } from "react";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Footer from "../../../../components/global/Footer";
import UniversalHeader from "@/components/global/header/UniversalHeader";
import MainLayout from "@/components/layout/MainLayout";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authConfig);

  // Check if user is logged in
  if (!session || !session.user.user_id) {
    redirect("/signin");
  }

  // Check if user is in onboarding
  if (session.user.status_id === 7) {
    redirect("/onboarding/applicant");
  }

  // Check if user is an applicant and active
  if (session.user.role_id !== 3 || session.user.status_id !== 1) {
    redirect("/forbidden");
  }
  
  return (
    <>
      <UniversalHeader role="Applicant"/>
      <MainLayout
        className="items-center"
        wrapperClassName="items-center flex-col w-full py-10"
      >
        <div className="container max-w-5xl py-10">
          {children}
        </div>
      </MainLayout>
      <Footer />
    </>
  );
}
