import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText } from "lucide-react";
import { ApplicationCard } from "./ApplicationCard";

interface Application {
  id: string;
  job_title: string;
  company_name: string;
  company_image: string;
  work_arrangement: string;
  city_municipality: string;
  barangay: string;
  applied_date: string;
  status: string;
  last_update: string;
  interview_date?: string;
  interview_type?: string;
  interview_link?: string;
  offer_deadline?: string;
}

interface StatusConfig {
  label: string;
  icon: React.ElementType;
  color: string;
  dotColor: string;
}

interface ApplicationTabsProps {
  applications: Application[];
  statusConfig: Record<string, StatusConfig>;
  activeTab: string;
  onTabChange: (value: string) => void;
}

export function ApplicationTabs({
  applications,
  statusConfig,
  activeTab,
  onTabChange,
}: ApplicationTabsProps) {
  const filteredApplications =
    activeTab === "ALL"
      ? applications
      : applications.filter((app) => app.status === activeTab);

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-6">
        <TabsTrigger value="ALL">
          All
          <Badge variant="secondary" className="ml-2">
            {applications.length}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="APPLIED">
          Applied
          <Badge variant="secondary" className="ml-2">
            {applications.filter((a) => a.status === "APPLIED").length}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="INTERVIEW_SCHEDULED">
          Interview
          <Badge variant="secondary" className="ml-2">
            {
              applications.filter((a) => a.status === "INTERVIEW_SCHEDULED")
                .length
            }
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="OFFER_SENT">
          Offers
          <Badge variant="secondary" className="ml-2">
            {applications.filter((a) => a.status === "OFFER_SENT").length}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="OFFER_ACCEPTED">
          Accepted
          <Badge variant="secondary" className="ml-2">
            {applications.filter((a) => a.status === "OFFER_ACCEPTED").length}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="REJECTED">
          Rejected
          <Badge variant="secondary" className="ml-2">
            {applications.filter((a) => a.status === "REJECTED").length}
          </Badge>
        </TabsTrigger>
      </TabsList>

      <TabsContent value={activeTab} className="mt-0">
        {filteredApplications.length === 0 ? (
          <Card className="p-12">
            <div className="text-center">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No applications found
              </h3>
              <p className="text-sm text-muted-foreground">
                {activeTab === "ALL"
                  ? "You haven't applied to any jobs yet."
                  : `You don't have any applications in "${
                      statusConfig[activeTab as keyof typeof statusConfig]
                        ?.label
                    }" status.`}
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((application) => {
              const config =
                statusConfig[application.status as keyof typeof statusConfig];

              return (
                <ApplicationCard
                  key={application.id}
                  application={application}
                  statusConfig={config}
                />
              );
            })}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
