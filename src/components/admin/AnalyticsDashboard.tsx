"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Building2, Briefcase, GraduationCap } from "lucide-react";
import { CoursesChart } from "./CoursesChart";
import { IndustriesChart } from "./IndustriesChart";

interface AnalyticsData {
  applicants: number;
  companies: number;
  jobPosts: number;
  courses: Array<{
    course: string;
    count: number;
    fill: string;
  }>;
  industries: Array<{
    industry: string;
    count: number;
    fill: string;
  }>;
}

export default function AnalyticsDashboard() {
  const [timeFrame, setTimeFrame] = useState<string>("all");

  const { data: analytics, isLoading } = useQuery({
    queryKey: ["admin-analytics", timeFrame],
    queryFn: async () => {
      const response = await api.get<AnalyticsData>(
        `/admin/analytics?timeFrame=${timeFrame}`
      );
      return response.data;
    },
  });

  const getTimeFrameLabel = () => {
    switch (timeFrame) {
      case "today":
        return "Today";
      case "week":
        return "This Week";
      case "month":
        return "This Month";
      case "all":
        return "All Time";
      default:
        return "All Time";
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-[200px]" />
          <Skeleton className="h-10 w-[180px]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-[140px]" />
          <Skeleton className="h-[140px]" />
          <Skeleton className="h-[140px]" />
        </div>
        <Skeleton className="h-[400px]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics Overview</h2>
          <p className="text-muted-foreground">
            Showing data for {getTimeFrameLabel().toLowerCase()}
          </p>
        </div>
        <Select value={timeFrame} onValueChange={setTimeFrame}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Applicants Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Applicants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.applicants || 0}</div>
            <p className="text-xs text-muted-foreground">
              Joined {getTimeFrameLabel().toLowerCase()}
            </p>
          </CardContent>
        </Card>

        {/* Companies Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Companies</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.companies || 0}</div>
            <p className="text-xs text-muted-foreground">
              Registered {getTimeFrameLabel().toLowerCase()}
            </p>
          </CardContent>
        </Card>

        {/* Job Posts Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Job Posts</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.jobPosts || 0}</div>
            <p className="text-xs text-muted-foreground">
              Posted {getTimeFrameLabel().toLowerCase()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Courses Distribution Chart */}
      {analytics?.courses && analytics.courses.length > 0 && (
        <CoursesChart 
          data={analytics.courses} 
          timeFrame={getTimeFrameLabel()}
        />
      )}

      {/* No Courses Data Message */}
      {analytics?.courses && analytics.courses.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Applicant Courses Distribution
            </CardTitle>
            <CardDescription>
              {getTimeFrameLabel()}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">
              No student data available for this time period
            </p>
          </CardContent>
        </Card>
      )}

      {/* Industries Distribution Chart */}
      {analytics?.industries && analytics.industries.length > 0 && (
        <IndustriesChart 
          data={analytics.industries} 
          timeFrame={getTimeFrameLabel()}
        />
      )}

      {/* No Industries Data Message */}
      {analytics?.industries && analytics.industries.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Company Industry Distribution
            </CardTitle>
            <CardDescription>
              {getTimeFrameLabel()}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">
              No company data available for this time period
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
