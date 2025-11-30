import { ReactNode } from "react";
import Footer from "../../../components/global/Footer";
import UniversalHeader from "@/components/global/header/UniversalHeader";
import MainLayout from "@/components/layout/MainLayout";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <UniversalHeader role="Applicant"/>
      <MainLayout
        className="items-center"
        wrapperClassName="items-center flex-col w-full p-0"
      >
        {children}
      </MainLayout>
      <Footer />
    </>
  );
}
