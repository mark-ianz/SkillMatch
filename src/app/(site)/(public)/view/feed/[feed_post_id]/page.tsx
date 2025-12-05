import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import MainLayout from "@/components/layout/MainLayout";
import { CompanyPost } from "@/components/page_specific/company_post/CompanyPost";
import Link from "next/link";
import { CompanyPostServices } from "@/services/company-post.services";
import { notFound, redirect } from "next/navigation";
import { CompanyPostPreview } from "@/components/page_specific/company_post/CompanyPostPreview";
import { GoBackButton } from "@/components/common/button/GoBackButton";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { getCourseByAbbr } from "@/lib/utils";

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

  // Get user session and course if available
  const session = await getServerSession(authConfig);
  let userCourse: string | undefined;

  if (session?.user?.role_id === 3) {
    // Applicant user - get their course
    const [applicantRows] = await db.query<
      (RowDataPacket & { course: string | null })[]
    >(
      `SELECT course FROM applicant_profile WHERE user_id = ?`,
      [session.user.user_id]
    );

    if (applicantRows && applicantRows.length > 0 && applicantRows[0].course) {
      const courseAbbr = applicantRows[0].course;
      const fullCourse = getCourseByAbbr(courseAbbr);
      if (fullCourse) {
        userCourse = fullCourse;
      }
    }
  }

  // Fetch data server-side
  const post = await CompanyPostServices.getCompanyPostById(feed_post_id);

  if (!post) {
    notFound();
  }

  const suggestions = await CompanyPostServices.getCompanyPostSuggestions(
    feed_post_id,
    userCourse
  );

  return (
    <MainLayout className="items-center" wrapperClassName="w-full">
      <div className="gap-10 flex flex-col items-center container max-w-5xl">
        <div className="space-y-4 px-4 w-full">
          {/* Back Button */}
          <GoBackButton />

          {/* Company Post Full Info */}
          <CompanyPost post={post} isViewing/>
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
