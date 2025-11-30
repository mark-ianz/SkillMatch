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
import StudentDetailsDialog from "./StudentDetailsDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

export interface StudentWithStatus {
  user_id: number;
  email: string;
  status_id: number;
  status_name: string;
  account_created_at: string;
  first_name?: string;
  last_name?: string;
  full_name: string;
  course?: string;
  year_level?: string;
  required_hours?: number;
  city_municipality?: string;
  phone_number?: string;
}

export default function StudentsTable() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedStudent, setSelectedStudent] = useState<StudentWithStatus | null>(null);

  const { data: students, isLoading } = useQuery({
    queryKey: ["admin-students", statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (statusFilter !== "all") {
        params.append("status", statusFilter);
      }
      const response = await api.get<StudentWithStatus[]>(
        `/admin/students?${params.toString()}`
      );
      return response.data;
    },
  });

  const getStatusBadge = (statusId: number, statusName: string) => {
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
          {students?.length || 0} students found
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Year Level</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students && students.length > 0 ? (
              students.map((student) => (
                <TableRow key={student.user_id}>
                  <TableCell className="font-medium">
                    {student.full_name}
                  </TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    {student.course ? (
                      <Badge variant="outline">{student.course}</Badge>
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
                    {student.city_municipality || (
                      <span className="text-muted-foreground text-sm">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(student.status_id, student.status_name)}
                  </TableCell>
                  <TableCell>
                    {format(new Date(student.account_created_at), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedStudent(student)}
                    >
                      <Ellipsis className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  No students found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {selectedStudent && (
        <StudentDetailsDialog
          student={selectedStudent}
          open={!!selectedStudent}
          onOpenChange={(open: boolean) => !open && setSelectedStudent(null)}
        />
      )}
    </div>
  );
}
