import { SessionProvider } from "next-auth/react";
import React from "react";
import { SessionSync } from "../auth/SessionSync";

export default function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      {children}
      <SessionSync />
    </SessionProvider>
  );
}
