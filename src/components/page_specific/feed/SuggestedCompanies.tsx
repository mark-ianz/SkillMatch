"use client";

import { useSuggestedCompanies } from "@/hooks/query/useFeed";
import { CompanyPreview } from "@/components/page_specific/explore/company/CompanyPreview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { getRoleName } from "@/lib/utils";
import { CompanyCardSkeleton } from "@/components/common/skeleton/JobPostSkeleton";

export function SuggestedCompanies() {
  const { data: session } = useSession();
  const { data: companies, isLoading } = useSuggestedCompanies();

  // Don't show for company users
  if (session?.user?.role_id && getRoleName(session.user.role_id) !== "OJT") {
    return null;
  }

  return (
    <Card className="h-fit sticky top-4">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Building2 className="w-5 h-5" />
          Suggested Companies
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col gap-4">
            {[...Array(3)].map((_, i) => (
              <CompanyCardSkeleton key={i} />
            ))}
          </div>
        ) : companies && companies.length > 0 ? (
          <div className="flex flex-col gap-4">
            {companies.map((company) => (
              <Link
                key={company.company_id}
                href={`/view/company/${company.company_id}`}
              >
                <CompanyPreview
                  company={company}
                  className="hover:border-skillmatch-primary-green transition-colors"
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Building2 className="w-12 h-12 mx-auto mb-3 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">
              No suggested companies found
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Companies with jobs matching your course will appear here
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
