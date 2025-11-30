"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { COMPANY_ACCOUNT_STATUSES } from "@/types/admin.types";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import CompanyDetailsDialog from "./CompanyDetailsDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Company } from "@/types/company.types";
import { Status } from "@/types/status.types";

export default function CompaniesTable() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedCompany, setSelectedCompany] =
    useState<Company & Status | null>(null);

  const { data: companies, isLoading } = useQuery({
    queryKey: ["admin-companies", statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (statusFilter !== "all") {
        params.append("status", statusFilter);
      }
      const response = await api.get<(Company & Status)[]>(
        `/admin/companies?${params.toString()}`
      );
      return response.data;
    },
  });

  const getStatusBadge = (statusId: number, statusName: string) => {
    console.log(statusName);
    const status = COMPANY_ACCOUNT_STATUSES.find((s) => s.value === statusId);
    return (
      <Badge variant={status?.variant || "default"}>
        {statusName || "Unknown"}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-[180px]" />
          </div>
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="border rounded-lg p-4">
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Filter by Status:</span>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {COMPANY_ACCOUNT_STATUSES.map((status) => (
                <SelectItem key={status.value} value={status.value.toString()}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-muted-foreground">
          {companies?.length || 0} companies found
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Registered</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies && companies.length > 0 ? (
              companies.map((company) => (
                <TableRow key={company.company_id}>
                  <TableCell className="font-medium">
                    {company.company_name}
                  </TableCell>
                  <TableCell>{company.company_email}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {Array.isArray(company.industry) ? (
                        company.industry.slice(0, 2).map((ind, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs"
                          >
                            {ind}
                          </Badge>
                        ))
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          {company.industry}
                        </Badge>
                      )}
                      {Array.isArray(company.industry) &&
                        company.industry.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{company.industry.length - 2}
                          </Badge>
                        )}
                    </div>
                  </TableCell>
                  <TableCell>{company.city_municipality}</TableCell>
                  <TableCell>
                    {getStatusBadge(company.status_id, company.status)}
                  </TableCell>
                  <TableCell>
                    {format(
                      new Date(company.created_at),
                      "MMM d, yyyy"
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedCompany(company)}
                    >
                      <Ellipsis className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No companies found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {selectedCompany && (
        <CompanyDetailsDialog
          company={selectedCompany}
          open={!!selectedCompany}
          onOpenChange={(open: boolean) => !open && setSelectedCompany(null)}
        />
      )}
    </div>
  );
}
