import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import React from "react";

type Props = {
  error: string[] | null;
};

export default function ErrorArray({ error }: Props) {
  if (!error) return null;

  return (
    <Alert variant="destructive" className="bg-destructive/20">
      <AlertCircleIcon />
      <AlertTitle className="text-base">Submission Error</AlertTitle>
      <AlertDescription>
        <ul className="text-sm list-disc ml-5">
          {error.map((err, index) => (
            <li key={index}>{err}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}
