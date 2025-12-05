"use client";

import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Briefcase } from "lucide-react";

interface JobPostStatusData {
  status: string;
  count: number;
  fill: string;
}

interface JobPostsChartProps {
  data: JobPostStatusData[];
  timeFrame: string;
}

export function JobPostsChart({ data, timeFrame }: JobPostsChartProps) {
  // Generate chart config dynamically based on data
  const chartConfig: ChartConfig = {
    count: {
      label: "Job Posts",
    },
    ...data.reduce((acc, item, index) => {
      acc[item.status] = {
        label: item.status,
        color: `var(--chart-${(index % 5) + 1})`,
      };
      return acc;
    }, {} as Record<string, { label: string; color: string }>),
  };

  const totalJobPosts = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Job Posts Status Distribution
        </CardTitle>
        <CardDescription>{timeFrame}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[350px]"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie 
              data={data} 
              dataKey="count" 
              label 
              nameKey="status"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <div className="flex-col gap-2 text-sm px-6 pb-6">
        <div className="flex items-center justify-center gap-2 font-medium leading-none">
          Total: {totalJobPosts} job post{totalJobPosts !== 1 ? "s" : ""}
        </div>
        <div className="text-center text-muted-foreground leading-none mt-2">
          Showing job post status distribution for {timeFrame.toLowerCase()}
        </div>
      </div>
    </Card>
  );
}
