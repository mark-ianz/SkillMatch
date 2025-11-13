"use client";

import { Button } from "@/components/ui/button";
import { Roles } from "@/types/role.types";
import { useRouter } from "next/navigation";
import React from "react";

export default function JoinNowButton({ role }: { role: Roles }) {
  const router = useRouter();

  const handleJoinNow = () => {
    router.push("/signin");
  };

  return (
    <Button
      variant={role === "Company" ? "default_employer" : "default"}
      onClick={handleJoinNow}
    >
      Join Now
    </Button>
  );
}
