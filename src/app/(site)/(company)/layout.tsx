import Footer from "@/components/global/Footer";
import HeaderCompany from "@/components/global/header/HeaderCompany";
import MainLayout from "@/components/layout/MainLayout";
import React from "react";

export default function LayoutCompany({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderCompany />
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
