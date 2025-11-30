import { ReactNode } from "react";
import UniversalHeader from "@/components/global/header/UniversalHeader";
import MainLayout from "@/components/layout/MainLayout";
import Footer from "@/components/global/Footer";

export default function Layout({ children }: { children: ReactNode }) {
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
