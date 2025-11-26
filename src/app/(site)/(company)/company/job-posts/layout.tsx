"use client";

import ClientProviders from "@/components/providers/ClientProviders";
import React from "react";

export default function JobPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientProviders>{children}</ClientProviders>;
}
