import { ReactNode } from "react";
import ClientProviders from "@/components/providers/ClientProviders";
import HeaderPublic from "@/components/global/header/HeaderPublic";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <HeaderPublic />
      <ClientProviders>{children}</ClientProviders>
    </>
  );
}
