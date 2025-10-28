"use client";

import React, { useState } from "react";
import Label from "@/components/common/input/Label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type UploadResult = { path?: string } | void;

type Props = {
  id: string;
  label: React.ReactNode;
  accept?: string;
  currentPath?: string | null;
  maxBytes?: number;
  onUpload?: (file: File) => Promise<UploadResult>;
  onClear?: () => Promise<void> | void;
  optional?: boolean;
};

export default function FileUploadField({
  id,
  label,
  accept,
  currentPath,
  maxBytes = 5 * 1024 * 1024,
  onUpload,
  onClear,
  optional,
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  /* const [isUploading, setUploading] = useState(false); */

  const allowed = accept ? accept.split(",").map((s) => s.trim()) : [];

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    const f = e.target.files?.[0] ?? null;
    if (!f) return setFile(null);
    if (allowed.length > 0 && !allowed.some((ext) => f.type.includes(ext.replace(".", "")) && f.type)) {
      // fallback accept check by extension
      const lower = f.name.toLowerCase();
      const ok = accept ? accept.split(",").some((a) => lower.endsWith(a.replace(".", "")) || lower.endsWith(a.replace(".", ""))) : true;
      if (!ok) {
        setError("File type not allowed");
        return setFile(null);
      }
    }
    if (f.size > maxBytes) {
      setError(`File size exceeds ${(maxBytes / 1024 / 1024).toFixed(0)}MB limit.`);
      return setFile(null);
    }
    setFile(f);

    // Auto-upload on file select when onUpload handler is provided
    if (onUpload) {
      (async () => {
        try {
          /* setUploading(true); */
          await onUpload(f);
          setFile(null);
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          setError(message || "Upload failed");
        } /* finally {
          setUploading(false);
        } */
      })();
    }
  }

  /* async function handleUploadClick() {
    if (!file) return setError("Please select a file first.");
    if (!onUpload) return setError("No upload handler provided");
    setError(null);
    try {
      setUploading(true);
      await onUpload(file);
      // if handler returns path, parent should handle it
      setFile(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Upload failed");
    } finally {
      setUploading(false);
    }
  } */

  async function handleClear() {
    setError(null);
    setFile(null);
    if (onClear) {
      try {
        await onClear();
      } catch (err) {
        console.error("Clear handler failed", err);
      }
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Label id={id} optional={optional}>
        {label}
      </Label>

      <Input id={id} type="file" accept={accept} onChange={handleFile} />

      {file && <p className="text-sm">Selected: {file.name}</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}

      {currentPath && (
        <div className="flex items-center gap-4">
          <a href={currentPath} target="_blank" rel="noopener noreferrer" className="text-sm text-skillmatch-primary-green underline">
            Click to view
          </a>
          <Button variant="outline" size="sm" onClick={handleClear}>
            Clear
          </Button>
        </div>
      )}

      {/* {!currentPath && onUpload && (
        <div className="flex items-center justify-end">
          <Button type="button" className="w-24" disabled={isUploading} onClick={handleUploadClick}>
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      )} */}
    </div>
  );
}
