import { Card, CardContent } from "@/components/ui/card";
import { ApplicationWithJobDetails } from "@/types/application.types";

interface ApplicationStatsProps {
  applications: ApplicationWithJobDetails[];
}

export function ApplicationStats({ applications }: ApplicationStatsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardContent className="p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">
            {applications.filter((a) => a.application_status_id === 8).length}
          </p>
          <p className="text-xs text-muted-foreground">Pending</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <p className="text-2xl font-bold text-indigo-600">
            {
              applications.filter((a) => a.application_status_id === 9)
                .length
            }
          </p>
          <p className="text-xs text-muted-foreground">Interviews</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <p className="text-2xl font-bold text-orange-600">
            {applications.filter((a) => a.application_status_id === 10).length}
          </p>
          <p className="text-xs text-muted-foreground">Offers</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <p className="text-2xl font-bold text-green-600">
            {
              applications.filter(
                (a) => a.application_status_id === 11
              ).length
            }
          </p>
          <p className="text-xs text-muted-foreground">Accepted</p>
        </CardContent>
      </Card>
    </div>
  );
}
