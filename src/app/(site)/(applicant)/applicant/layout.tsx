import { ReactNode } from "react";
import Footer from "../../../../components/global/Footer";
import UniversalHeader from "@/components/global/header/UniversalHeader";
import MainLayout from "@/components/layout/MainLayout";

export default function Layout({ children }: { children: ReactNode }) {
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
