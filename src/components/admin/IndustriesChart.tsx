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
import { Building2 } from "lucide-react";

interface IndustryData {
  industry: string;
  count: number;
  fill: string;
}

interface IndustriesChartProps {
  data: IndustryData[];
  timeFrame: string;
}

export function IndustriesChart({ data, timeFrame }: IndustriesChartProps) {
  // Generate chart config dynamically based on data
  const chartConfig: ChartConfig = {
    count: {
      label: "Companies",
    },
    ...data.reduce((acc, item, index) => {
      acc[item.industry] = {
        label: item.industry,
        color: `var(--chart-${(index % 5) + 1})`,
      };
      return acc;
    }, {} as Record<string, { label: string; color: string }>),
  };

  const totalCompanies = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Company Industry Distribution
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
              nameKey="industry"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <div className="flex-col gap-2 text-sm px-6 pb-6">
        <div className="flex items-center justify-center gap-2 font-medium leading-none">
          Total: {totalCompanies} {totalCompanies === 1 ? "industry" : "industries"}
        </div>
        <div className="text-center text-muted-foreground leading-none mt-2">
          Showing industry distribution for {timeFrame.toLowerCase()}
        </div>
      </div>
    </Card>
  );
}
