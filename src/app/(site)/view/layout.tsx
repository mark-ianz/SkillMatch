"use client";

import QueryClientProviderWrapper from "@/components/global/QueryClientProviderWrapper";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <QueryClientProviderWrapper>{children}</QueryClientProviderWrapper>;
}
