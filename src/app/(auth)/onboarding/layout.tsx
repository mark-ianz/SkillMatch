"use client";

import QueryClientProviderWrapper from "@/components/global/QueryClientProviderWrapper";
import MainLayout from "@/components/layout/MainLayout";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <QueryClientProviderWrapper>
    <MainLayout className="items-center">{children}</MainLayout>
  </QueryClientProviderWrapper>;
}
