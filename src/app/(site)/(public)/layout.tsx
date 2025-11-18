import Footer from "@/components/global/Footer";
import HeaderPublic from "@/components/global/header/HeaderPublic";
import React from "react";

export default function LayoutPublic({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderPublic />
      {children}
      <Footer />
    </>
  );
}
