"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import React from "react";

export default function LogoutButton({
  className,
  iconClassName,
}: {
  className?: string;
  iconClassName?: string;
}) {
  const { data: session } = useSession();

  const handleLogout = () => {
    const roleId = session?.user?.role_id;
    const isAdmin = session?.user?.isAdmin || roleId === 2;

    let callbackUrl = "/";

    if (!isAdmin) {
      // Role 3 = Applicant, Role 4 = Company
      if (roleId === 3) {
        callbackUrl = "/";
      } else if (roleId === 4) {
        callbackUrl = "/company";
      }
    }

    signOut({ callbackUrl });
  };

  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      className={cn(
        "w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50",
        className
      )}
      size="sm"
    >
      <LogOut className={cn("mr-2 h-5 w-5", iconClassName)} />
      Log Out
    </Button>
  );
}
