import Footer from "@/components/global/Footer";
import UniversalHeader from "@/components/global/header/UniversalHeader";
import MainLayout from "@/components/layout/MainLayout";
import React from "react";

export default function LayoutCompany({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UniversalHeader role="Company"/>
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
