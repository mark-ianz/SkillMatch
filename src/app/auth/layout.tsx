import { ReactNode } from "react";
import Header from "../_components/global/Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
