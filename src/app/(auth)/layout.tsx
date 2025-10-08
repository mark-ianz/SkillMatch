"use client";

import { ReactNode } from "react";
import Header from "../../components/global/Header";
import { SessionProvider } from "next-auth/react";
import MainLayout from "../../components/layout/MainLayout";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Header />
      <MainLayout className="items-center justify-center">{children}</MainLayout>
    </SessionProvider>
  );
}
