import { ReactNode } from "react";
import Header from "../../components/global/Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
