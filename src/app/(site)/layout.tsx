"use client";

import { ReactNode } from "react";
import Footer from "../../components/global/Footer";
import Header from "../../components/global/Header";
import { SessionProvider } from "next-auth/react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SessionProvider>
        <Header />
      </SessionProvider>
      {children}
      <Footer />
    </>
  );
}
