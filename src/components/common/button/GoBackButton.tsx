"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface GoBackButtonProps {
  variant?:
    | "default"
    | "outline"
    | "ghost"
    | "link"
    | "destructive"
    | "secondary";
  className?: string;
}

export function GoBackButton({
  variant = "outline",
  className,
}: GoBackButtonProps) {
  const router = useRouter();

  return (
    <Button
      variant={variant}
      onClick={() => router.back()}
      className={cn("w-fit", className)}
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      Go Back
    </Button>
  );
}
