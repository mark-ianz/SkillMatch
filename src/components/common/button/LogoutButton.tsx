"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";

export default function LogoutButton({className}: {className?: string}) {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/" })}
      variant="ghost"
      className={cn("w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50", className)}
      size="sm"
    >
      <LogOut className="mr-2 h-4 w-4" />
      Log Out
    </Button>
  );
}
