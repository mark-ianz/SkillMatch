import { ReactNode } from "react";
import Footer from "../../../components/global/Footer";
import HeaderOJT from "@/components/global/header/HeaderOJT";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <HeaderOJT />
      {children}
      <Footer />
    </>
  );
}
