"use client";

import QueryClientProviderWrapper from "@/components/providers/QueryClientProviderWrapper";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <QueryClientProviderWrapper>{children}</QueryClientProviderWrapper>;
}
