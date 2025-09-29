import { ReactNode } from "react";
import Footer from "../_components/global/Footer";
import Header from "../_components/global/Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
