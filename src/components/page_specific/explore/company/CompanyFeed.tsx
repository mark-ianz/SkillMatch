import { CompanyProfile } from "@/types/company.types";
import React, { useEffect } from "react";
import { CompanyPreview } from "./CompanyPreview";
import { useGetAllCompanies } from "@/hooks/query/useCompanies";
import LoadingGeneric from "@/components/global/LoadingGeneric";
import { useFeedStore } from "@/store/FeedStore";
import { useSearchParams } from "next/navigation";
import { CompanyFeedFilters } from "@/types/job_feed.types";

export default function CompanyFeed() {
  const searchParams = useSearchParams();
  
  // Build filters from URL params
  const filters: CompanyFeedFilters = {
    industries: searchParams.getAll("industry"),
    search: searchParams.get("search") || undefined,
  };

  const { data: companies, isLoading, error } = useGetAllCompanies(filters);
  const selected_company = useFeedStore((state) => state.selected_company);
  const setSelectedCompany = useFeedStore((state) => state.setSelectedCompany);

  console.log(companies);
  
  // Set initial selected item when data loads
  useEffect(() => {
    if (
      companies &&
      companies.length > 0 &&
      selected_company === null
    ) {
      setSelectedCompany(companies[0]);
    }
  }, [companies, selected_company, setSelectedCompany]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingGeneric />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-destructive">
          Failed to load companies. Please try again later.
        </p>
      </div>
    );
  }

  if (!companies && !isLoading) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-muted">No companies available</p>
      </div>
    );
  }

  return (
    <>
      {companies!.map((company: CompanyProfile) => (
        <div
          key={company.company_id}
          onClick={() => setSelectedCompany(company)}
          className={`cursor-pointer transition-all`}
        >
          <CompanyPreview company={company} />
        </div>
      ))}
    </>
  );
}
