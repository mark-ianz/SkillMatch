import { ReactNode } from "react";
import ClientProviders from "@/components/providers/ClientProviders";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <ClientProviders>{children}</ClientProviders>
    </>
  );
}
