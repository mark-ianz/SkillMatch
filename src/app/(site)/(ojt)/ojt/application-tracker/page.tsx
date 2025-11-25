"use client";

import { useState } from "react";
import { ApplicationStats } from "@/components/page_specific/application-tracker/ApplicationStats";
import { ApplicationTabs } from "@/components/page_specific/application-tracker/ApplicationTabs";
import { applications } from "@/components/page_specific/application-tracker/sampleApplicationData";
import { statusConfig } from "@/components/page_specific/application-tracker/applicationStatusConfig";

export default function ApplicationTrackerPage() {
  const [activeTab, setActiveTab] = useState("ALL");

  return (
    <div className="container max-w-5xl bg-background">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Application Tracker</h1>
        <p className="text-muted-foreground">
          Track the status of all your job applications
        </p>
      </div>

      {/* Summary Stats */}
      <ApplicationStats applications={applications} />

      {/* Application Tabs */}
      <ApplicationTabs
        applications={applications}
        statusConfig={statusConfig}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}
