import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout";
import { CompanyPost } from "@/components/page_specific/company_post/CompanyPost";
import Link from "next/link";
import { CompanyPostServices } from "@/services/company-post.services";
import { redirect } from "next/navigation";
import { CompanyPostPreview } from "@/components/page_specific/company_post/CompanyPostPreview";
import { ArrowLeft } from "lucide-react";

interface FeedPostPageProps {
  params: Promise<{
    feed_post_id?: string;
  }>;
}

export default async function FeedPostPage({ params }: FeedPostPageProps) {
  const { feed_post_id } = await params;

  if (!feed_post_id) {
    redirect("/feed");
  }

  // Fetch data server-side
  const post = await CompanyPostServices.getCompanyPostById(feed_post_id);

  if (!post) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center">
          <p className="text-destructive">
            Post not found. Please try again later.
          </p>
        </div>
      </MainLayout>
    );
  }

  const suggestions = await CompanyPostServices.getCompanyPostSuggestions(
    feed_post_id
  );

  return (
    <MainLayout className="items-center" wrapperClassName="w-full">
      <div className="gap-10 flex flex-col items-center container max-w-5xl">
        <div className="space-y-4 px-4">
          {/* Back Button */}
          <div className="w-full">
            <Link href="/feed">
              <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back to Feed
              </Button>
            </Link>
          </div>

          {/* Company Post Full Info */}
          <CompanyPost post={post} />
        </div>

        {/* Post Suggestions Section */}
        <div className="space-y-6 w-full">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-2xl font-bold text-foreground">
              Recommended Posts For You
            </h2>
            {suggestions && suggestions.length > 0 && (
              <Badge
                variant="secondary"
                className="text-sm font-medium px-4 py-2"
              >
                {suggestions.length} Suggestion
                {suggestions.length !== 1 ? "s" : ""}
              </Badge>
            )}
          </div>

          {suggestions && suggestions.length > 0 ? (
            <ScrollArea className="h-96">
              <div className="grid grid-cols-1 gap-4 py-1 px-4">
                {suggestions.map((post) => (
                  <Link key={post.post_id} href={"/view/feed/" + post.post_id}>
                    <CompanyPostPreview post={post} />
                  </Link>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div>
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No similar posts found.</p>
              </Card>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
