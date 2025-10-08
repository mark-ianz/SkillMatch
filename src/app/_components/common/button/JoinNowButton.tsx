"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function JoinNowButton() {
  const router = useRouter();

  const handleJoinNow = () => {
    router.push("/signin");
  };

  return <Button onClick={handleJoinNow}>Join Now</Button>;
}
