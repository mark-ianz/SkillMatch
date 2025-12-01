"use client";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function JobPostNotFound() {
  return (
    <div className="min-h-scree">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/company/job-postings">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Job Posts
            </Button>
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex flex-col items-center justify-center space-y-6 py-12">
          <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
            <AlertCircle className="h-12 w-12 text-red-600" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Job Post Not Found
            </h1>
            <p className="text-muted-foreground text-lg">
              The job posting you&apos;re looking for doesn&apos;t exist or is not available.
            </p>
          </div>
          <Alert className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This could be because the post is pending approval, has been removed, or the link is incorrect.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
