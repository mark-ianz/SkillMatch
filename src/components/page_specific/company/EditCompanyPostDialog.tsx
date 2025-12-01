"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CompanyPost } from "@/types/company_post.types";
import { useUpdateCompanyPost } from "@/hooks/query/useCompanyPosts";
import useRequireCompany from "@/hooks/useRequireCompany";
import { companyPostSchema } from "@/schema/company-post.schema";
import { formatZodError } from "@/lib/utils";
import ErrorArray from "@/components/common/ErrorArray";
import Image from "next/image";
import { Upload, X } from "lucide-react";

interface EditCompanyPostDialogProps {
  post: CompanyPost | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditCompanyPostDialog({ post, open, onOpenChange }: EditCompanyPostDialogProps) {
  const company_id = useRequireCompany();
  const { mutate, isPending } = useUpdateCompanyPost();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    cover_image: null as string | null,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [shouldRemoveImage, setShouldRemoveImage] = useState(false);
  const [errors, setErrors] = useState<string[] | null>(null);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        cover_image: post.cover_image || null,
      });
      setPreviewImage(post.cover_image || null);
      setImageFile(null);
      setShouldRemoveImage(false);
    }
  }, [post]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setFormData((prev) => ({ ...prev, cover_image: null }));
    setPreviewImage(null);
    setShouldRemoveImage(true);
  };

  const handleSubmit = () => {
    if (!post || !company_id) return;

    const result = companyPostSchema.safeParse(formData);

    if (!result.success) {
      const errorMessages = formatZodError(result.error);
      setErrors(errorMessages);
      return;
    }

    setErrors(null);

    mutate(
      {
        post_id: post.post_id,
        company_id,
        title: formData.title,
        content: formData.content,
        cover_image: formData.cover_image,
        cover_image_file: imageFile,
        remove_image: shouldRemoveImage,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
          <DialogDescription>
            Update your post details and content
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          {errors && <ErrorArray error={errors} />}

          <div className="grid gap-2">
            <Label htmlFor="edit-title">Post Title</Label>
            <Input
              id="edit-title"
              name="title"
              placeholder="e.g., Exciting News: New Product Launch"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-content">Post Content</Label>
            <Textarea
              id="edit-content"
              name="content"
              placeholder="Write your post content here..."
              value={formData.content}
              onChange={handleInputChange}
              rows={8}
              className="resize-none"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-cover-image">Cover Image (Optional)</Label>
            {previewImage ? (
              <div className="relative w-full h-64 border rounded-md overflow-hidden">
                <Image
                  src={previewImage}
                  alt="Cover preview"
                  fill
                  className="object-contain"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed rounded-md p-8 text-center">
                <input
                  type="file"
                  id="edit-cover-image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="edit-cover-image"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Click to upload cover image
                  </span>
                </label>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? "Updating..." : "Update Post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
