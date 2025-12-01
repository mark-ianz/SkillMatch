import { CompanyProfile } from "@/types/company.types";
import React, { useEffect } from "react";
import { CompanyPreview } from "./CompanyPreview";
import { useGetAllCompanies } from "@/hooks/query/useCompanies";
import { useExploreStore } from "@/store/ExploreStore";
import { useSearchParams } from "next/navigation";
import { CompanyExploreFilters } from "@/types/job_explore.types";
import { CompanyCardSkeleton } from "@/components/common/skeleton/JobPostSkeleton";

export default function CompanyExplore() {
  const searchParams = useSearchParams();

  // Build filters from URL params
  const filters: CompanyExploreFilters = {
    industries: searchParams.getAll("industry"),
    search: searchParams.get("search") || undefined,
  };

  const { data: companies, isLoading, error } = useGetAllCompanies(filters);
  const selected_company = useExploreStore((state) => state.selected_company);
  const setSelectedCompany = useExploreStore((state) => state.setSelectedCompany);

  console.log(companies);

  // Set initial selected item when data loads
  useEffect(() => {
    if (companies && companies.length > 0 && selected_company === null) {
      setSelectedCompany(companies[0]);
    } else if (companies && companies.length === 0) {
      // Clear selection when no results
      setSelectedCompany(null);
    }
  }, [companies, selected_company, setSelectedCompany]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <CompanyCardSkeleton key={i} />
        ))}
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

  if (!companies || companies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No Companies Found
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Try adjusting your filters or search query to find more results.
        </p>
      </div>
    );
  }

  return (
    <>
      {companies.map((company: CompanyProfile) => (
        <div
          key={company.company_id}
          onClick={() => setSelectedCompany(company)}
        >
          <CompanyPreview
            company={company}
            isSelected={selected_company?.company_id === company.company_id}
          />
        </div>
      ))}
    </>
  );
}
