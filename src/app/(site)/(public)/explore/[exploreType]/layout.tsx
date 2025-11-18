"use client";

import ClientProviders from "@/components/providers/ClientProviders";
import React from "react";

export default function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientProviders>{children}</ClientProviders>;
}
