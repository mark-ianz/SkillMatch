"use client";

import { ReactNode } from "react";
import Header from "../../components/global/Header";
import { SessionProvider } from "next-auth/react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Header />
      {children}
    </SessionProvider>
  );
}
