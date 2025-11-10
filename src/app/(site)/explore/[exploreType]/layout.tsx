"use client";

import QueryClientProviderWrapper from "@/components/global/QueryClientProviderWrapper";
import React from "react";

export default function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <QueryClientProviderWrapper>{children}</QueryClientProviderWrapper>;
}
