import UniversalHeader from "@/components/global/header/UniversalHeader";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <UniversalHeader/>
      {children}
    </>
  );
}
