import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import React from "react";

type Props = {
  error: { title: string; description: string } | null;
};

export default function Error({ error }: Props) {
  if (!error) return null;

  return (
    <Alert variant="destructive" className="bg-destructive/20">
      <AlertCircleIcon />
      <AlertTitle>{error.title}</AlertTitle>
      <AlertDescription>{error.description}</AlertDescription>
    </Alert>
  );
}
