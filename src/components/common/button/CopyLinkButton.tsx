"use client";

import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CopyLinkButtonProps {
  url: string;
  variant?: "default" | "ghost" | "outline" | "secondary" | "destructive" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showIcon?: boolean;
  showText?: boolean;
  text?: string;
}

export function CopyLinkButton({
  url,
  variant = "ghost",
  size = "icon",
  className,
  showIcon = true,
  showText = false,
  text = "Copy Link",
}: CopyLinkButtonProps) {
  const handleCopyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Link copied to clipboard!");
    }).catch((err) => {
      console.error("Failed to copy link:", err);
      toast.error("Failed to copy link");
    });
  };

  return (
    <Button
      aria-label="Copy Link"
      name="copy_link_button"
      variant={variant}
      size={size}
      onClick={handleCopyLink}
      className={cn("rounded-lg text-skillmatch-muted-dark hover:text-foreground hover:bg-muted/50 transition-colors", size === "icon" && "h-10 w-10", className)}
    >
      {showIcon && <Copy className="w-5 h-5 text-skillmatch-muted-dark" />}
      {showText && <span className={"text-skillmatch-muted-dark"}>{text}</span>}
  
    </Button>
  );
}
