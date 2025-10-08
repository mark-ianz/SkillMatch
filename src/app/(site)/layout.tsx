import { ReactNode } from "react";
import Footer from "../../components/global/Footer";
import Header from "../../components/global/Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
