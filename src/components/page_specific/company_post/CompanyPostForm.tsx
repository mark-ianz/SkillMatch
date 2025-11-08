"use client";
import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Upload, X } from "lucide-react";
import {
  CompanyPostFormData,
  companyPostSchema,
} from "@/schema/company-post.schema";
import { useCompanyPostStore } from "@/store/CompanyPostStore";
import ErrorArray from "@/components/common/ErrorArray";
import { formatZodError } from "@/lib/utils";
import useCreateCompanyPost from "@/hooks/query/useCreateCompanyPost";
import useRequireCompany from "@/hooks/useRequireCompany";
import { toast } from "sonner";
import Link from "next/link";

export default function CompanyPostForm() {
  const { formData, updateField, reset } = useCompanyPostStore();
  const company_id = useRequireCompany();
  const { mutate, isPending } = useCreateCompanyPost();

  const [errors, setErrors] = useState<string[] | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showResetConfirmDialog, setShowResetConfirmDialog] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(
    formData.cover_image || null
  );
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateField(name as keyof CompanyPostFormData, value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    updateField("cover_image", null);
    setPreviewImage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = companyPostSchema.safeParse(formData as CompanyPostFormData);

    if (!result.success) {
      const errorMessages = formatZodError(result.error);
      setErrors(errorMessages);
      setShowConfirmDialog(false);
      return;
    }

    setErrors(null);
    setShowConfirmDialog(true);
  };

  const handleConfirmSubmit = async () => {
    if (!company_id) {
      setErrors(["Company ID is required"]);
      return;
    }

    mutate(
      {
        title: formData.title || "",
        content: formData.content || "",
        cover_image: formData.cover_image || null,
        company_id,
        cover_image_file: imageFile,
      },
      {
        onSuccess: (data) => {
          toast.success(
            <span className="flex flex-col">
              Company post published successfully!
              <Link
                href={`/feed/view/${data.post_id}`}
                className="text-blue-500 hover:underline"
              >
                View Post
              </Link>
            </span>,
            {
              duration: 5000,
            }
          );

          setShowConfirmDialog(false);
          reset();
          setPreviewImage(null);
          setImageFile(null);
        },
      }
    );
  };

  const handleReset = () => {
    reset();
    setPreviewImage(null);
    setImageFile(null);
    setErrors(null);
    setShowResetConfirmDialog(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="pb-8">
        <div className="grid gap-6">
          {errors && <ErrorArray error={errors} />}

          {/* Post Content */}
          <Card>
            <CardHeader>
              <CardTitle>Create Post</CardTitle>
              <CardDescription>
                Share news and updates about your company
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Post Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., Exciting News: New Product Launch"
                  value={formData.title || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="content">Post Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Write your post content here... You can include multiple lines and paragraphs."
                  value={formData.content || ""}
                  onChange={handleInputChange}
                  rows={8}
                  className="resize-none"
                />
              </div>

              <div className="grid gap-2">
                <Label>Cover Image (Optional)</Label>
                {previewImage ? (
                  <div className="relative w-full rounded-lg overflow-hidden border border-border bg-skillmatch-muted-light/20">
                    <div className="relative h-64 w-full">
                      <Image
                        src={previewImage || "/placeholder.svg"}
                        alt="Cover preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <Button
                      size={"icon"}
                      variant={"ghost"}
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1 text-destructive-foreground rounded-full "
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <label className="relative border-2 border-dashed border-muted-foreground/50 rounded-lg p-6 text-center cursor-pointer hover:border-muted-foreground transition-colors">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-6 h-6 text-muted-foreground" />
                      <div className="text-sm text-muted-foreground">
                        <span className="font-semibold">Click to upload</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Submit & Reset Buttons */}
          <div className="flex gap-3">
            <Button
              type="submit"
              className="flex-1"
              size="lg"
              variant={"default_employer"}
            >
              Publish Post
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => setShowResetConfirmDialog(true)}
            >
              Reset
            </Button>
          </div>
        </div>
      </form>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to publish this post? This will be visible
              to all viewers.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[400px] overflow-y-auto space-y-4">
            <div>
              <p className="text-sm font-medium">Title</p>
              <p className="text-sm text-muted-foreground">{formData.title}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Content</p>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-4">
                {formData.content}
              </p>
            </div>
            {previewImage && (
              <div>
                <p className="text-sm font-medium mb-2">Cover Image</p>
                <div className="relative h-60 w-full rounded-lg overflow-hidden bg-skillmatch-muted-light/20">
                  <Image
                    src={previewImage || "/placeholder.svg"}
                    alt="Cover preview"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleConfirmSubmit}
              disabled={isPending}
            >
              {isPending ? "Publishing..." : "Confirm & Publish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset Confirmation Dialog */}
      <Dialog
        open={showResetConfirmDialog}
        onOpenChange={setShowResetConfirmDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Clear Form?</DialogTitle>
            <DialogDescription>
              Are you sure you want to clear all form data? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowResetConfirmDialog(false)}
            >
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleReset}>
              Clear Form
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
