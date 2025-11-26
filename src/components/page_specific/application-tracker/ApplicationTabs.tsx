import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText } from "lucide-react";
import { ApplicationCard } from "./ApplicationCard";
import { ApplicationWithJobDetails } from "@/types/application.types";

interface StatusConfig {
  label: string;
  icon: React.ElementType;
  color: string;
  dotColor: string;
}

interface ApplicationTabsProps {
  applications: ApplicationWithJobDetails[];
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
      : applications.filter((app) => app.application_status_id.toString() === activeTab);

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-6">
        <TabsTrigger value="ALL">
          All
          <Badge variant="secondary" className="ml-2">
            {applications.length}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="8">
          Applied
          <Badge variant="secondary" className="ml-2">
            {applications.filter((a) => a.application_status_id === 8).length}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="9">
          Interview
          <Badge variant="secondary" className="ml-2">
            {
              applications.filter((a) => a.application_status_id === 9)
                .length
            }
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="10">
          Offers
          <Badge variant="secondary" className="ml-2">
            {applications.filter((a) => a.application_status_id === 10).length}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="11">
          Accepted
          <Badge variant="secondary" className="ml-2">
            {applications.filter((a) => a.application_status_id === 11).length}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="3">
          Rejected
          <Badge variant="secondary" className="ml-2">
            {applications.filter((a) => a.application_status_id === 3).length}
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
                statusConfig[application.application_status_id.toString() as keyof typeof statusConfig];

              return (
                <ApplicationCard
                  key={application.application_id}
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
