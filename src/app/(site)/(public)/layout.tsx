import Footer from "@/components/global/Footer";
import UniversalHeader from "@/components/global/header/UniversalHeader";
import { authConfig } from "@/lib/auth";
import { getRoleName } from "@/lib/utils";
import { getServerSession } from "next-auth";
import React from "react";

export default async function LayoutPublic({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);

  // Check user role from session
  const role = getRoleName(session?.user.role_id);

  return (
    <>
      <UniversalHeader role={role} />
      {children}
      <Footer />
    </>
  );
}
