import { ReactNode } from "react";
import Header from "../../components/global/Header";
import ClientProviders from "@/components/providers/ClientProviders";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <ClientProviders>{children}</ClientProviders>
    </>
  );
}
