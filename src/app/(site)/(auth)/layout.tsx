import { ReactNode } from "react";
import HeaderPublic from "@/components/global/header/HeaderPublic";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <HeaderPublic />
      {children}
    </>
  );
}
