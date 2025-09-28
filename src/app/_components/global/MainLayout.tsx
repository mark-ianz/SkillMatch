import React, { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return <main className="px-96 py-10">{children}</main>;
}
