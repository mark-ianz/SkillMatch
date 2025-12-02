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
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import ApplicantDetailsDialog from "./ApplicantsDetailsDialog";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { ApplicantProfileAndUser } from "@/types/applicant_profile.types";
import { Account } from "@/types/user.types";
import { getCourseByAbbr } from "@/lib/utils";


export default function ApplicantsTable() {
  const [selectedApplicant, setSelectedApplicant] =
    useState<ApplicantProfileAndUser & Account | null>(null);

  const { data: applicants, isLoading } = useQuery({
    queryKey: ["admin-applicants"],
    queryFn: async () => {
      const response = await api.get<(ApplicantProfileAndUser & Account)[]>(
        `/admin/applicants`
      );
      return response.data;
    },
  });

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
      <p className="text-sm text-muted-foreground">
        {applicants?.length || 0} applicants found
      </p>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Number</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Year Level</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants && applicants.length > 0 ? (
              applicants.map((student) => (
                <TableRow key={student.user_id}>
                  <TableCell className="text-sm">
                    {student.student_number}
                  </TableCell>
                  <TableCell className="text-sm">
                    {`${student.first_name} ${student.last_name}`}
                  </TableCell>
                  <TableCell className="text-sm">{student.email}</TableCell>
                  <TableCell>
                    {student.course ? (
                      <Badge variant="outline">{`${getCourseByAbbr(student.course)} (${student.course})`}</Badge>
                    ) : (
                      <span className="text-muted-foreground text-sm">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {student.year_level || (
                      <span className="text-muted-foreground text-sm">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {student.city_municipality && student.barangay ? (
                      <span>{`${student.city_municipality}, ${student.barangay}`}</span>
                    ) : (
                      <span className="text-muted-foreground text-sm">N/A</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm">
                    {format(
                      new Date(student.created_at),
                      "MMM d, yyyy"
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedApplicant(student)}
                    >
                      <Ellipsis className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  No applicants found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {selectedApplicant && (
        <ApplicantDetailsDialog
          student={selectedApplicant}
          open={!!selectedApplicant}
          onOpenChange={(open: boolean) => !open && setSelectedApplicant(null)}
        />
      )}
    </div>
  );
}
