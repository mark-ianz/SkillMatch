"use client";

import React from "react";
import SessionProviderWrapper from "./SessionProviderWrapper";
import QueryClientProviderWrapper from "./QueryClientProviderWrapper";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProviderWrapper>
      <QueryClientProviderWrapper>{children}</QueryClientProviderWrapper>
    </SessionProviderWrapper>
  );
}
