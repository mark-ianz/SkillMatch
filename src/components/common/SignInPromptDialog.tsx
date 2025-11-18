"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

interface SignInPromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
}

export function SignInPromptDialog({
  open,
  onOpenChange,
  title = "Sign in required",
  description = "You need to be signed in to react to posts. Join SkillMatch to connect with companies and opportunities.",
}: SignInPromptDialogProps) {
  const router = useRouter();

  const handleSignIn = () => {
    onOpenChange(false);
    router.push("/signin");
  };

  const handleSignUp = () => {
    onOpenChange(false);
    router.push("/signup");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          <DialogDescription className="text-base pt-2">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-4">
          <Button
            onClick={handleSignIn}
            size="lg"
            className="w-full gap-2 text-base font-semibold"
          >
            <LogIn className="w-5 h-5" />
            Sign In
          </Button>
          <Button
            onClick={handleSignUp}
            variant="outline"
            size="lg"
            className="w-full gap-2 text-base font-semibold"
          >
            <UserPlus className="w-5 h-5" />
            Create Account
          </Button>
        </div>
        <div className="text-center text-sm text-muted-foreground pt-2">
          Join thousands of students and companies finding the perfect match
        </div>
      </DialogContent>
    </Dialog>
  );
}
