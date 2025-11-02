"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function JoinNowButton() {
  const router = useRouter();
  const path = usePathname();

  const handleJoinNow = () => {
    router.push("/signin");
  };

  return (
    <Button
      variant={path.includes("ojt") ? "default" : "default_employer"}
      onClick={handleJoinNow}
    >
      Join Now
    </Button>
  );
}
