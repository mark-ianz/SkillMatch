"use client";

import ClientProviders from "@/components/providers/ClientProviders";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <ClientProviders>{children}</ClientProviders>;
}
