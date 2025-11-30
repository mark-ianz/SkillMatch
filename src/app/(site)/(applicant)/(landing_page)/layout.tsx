import { ReactNode } from "react";
import UniversalHeader from "@/components/global/header/UniversalHeader";
import MainLayout from "@/components/layout/MainLayout";
import Footer from "@/components/global/Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <UniversalHeader role="Applicant" />
      <MainLayout
        className="items-center"
        wrapperClassName="items-center flex-col w-full py-0"
      >
        {children}
      </MainLayout>
      <Footer />
    </>
  );
}
