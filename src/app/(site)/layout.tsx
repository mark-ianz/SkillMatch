import { ReactNode } from "react";
import Footer from "../../components/global/Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
