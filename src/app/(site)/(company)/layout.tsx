import Footer from "@/components/global/Footer";
import HeaderCompany from "@/components/global/header/HeaderCompany";
import React from "react";

export default function LayoutCompany({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderCompany />
      {children}
      <Footer />
    </>
  );
}
