import { Card } from "@/components/ui/card";
import { FileCheck, Search, Users, Handshake } from "lucide-react";
import React from "react";

export default function CompanyHowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start hiring qualified students in just a few simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <Card className="p-6 relative hover:shadow-lg transition-shadow">
            <div className="w-8 h-8 rounded-full bg-skillmatch-primary-blue text-white flex items-center justify-center font-bold">
              1
            </div>
            <div className="w-14 h-14 rounded-xl bg-skillmatch-primary-blue/10 flex items-center justify-center mx-auto mb-4 mt-4">
              <FileCheck className="h-7 w-7 text-skillmatch-primary-blue" />
            </div>
            <h3 className="font-bold mb-2 text-center">
              Create Company Profile
            </h3>
            <p className="text-sm text-muted-foreground text-center">
              Register your company and complete your profile with company
              details and requirements.
            </p>
          </Card>

          <Card className="p-6 relative hover:shadow-lg transition-shadow">
            <div className="w-8 h-8 rounded-full bg-skillmatch-primary-blue text-white flex items-center justify-center font-bold">
              2
            </div>
            <div className="w-14 h-14 rounded-xl bg-skillmatch-primary-blue/10 flex items-center justify-center mx-auto mb-4 mt-4">
              <Search className="h-7 w-7 text-skillmatch-primary-blue" />
            </div>
            <h3 className="font-bold mb-2 text-center">Post OJT Positions</h3>
            <p className="text-sm text-muted-foreground text-center">
              Create job postings with specific requirements, skills needed, and
              training opportunities.
            </p>
          </Card>

          <Card className="p-6 relative hover:shadow-lg transition-shadow">
            <div className="w-8 h-8 rounded-full bg-skillmatch-primary-blue text-white flex items-center justify-center font-bold">
              3
            </div>
            <div className="w-14 h-14 rounded-xl bg-skillmatch-primary-blue/10 flex items-center justify-center mx-auto mb-4 mt-4">
              <Users className="h-7 w-7 text-skillmatch-primary-blue" />
            </div>
            <h3 className="font-bold mb-2 text-center">Review Candidates</h3>
            <p className="text-sm text-muted-foreground text-center">
              Browse matched student profiles, review applications, and schedule
              interviews with top candidates.
            </p>
          </Card>

          <Card className="p-6 relative hover:shadow-lg transition-shadow">
            <div className="w-8 h-8 rounded-full bg-skillmatch-primary-blue text-white flex items-center justify-center font-bold">
              4
            </div>
            <div className="w-14 h-14 rounded-xl bg-skillmatch-primary-blue/10 flex items-center justify-center mx-auto mb-4 mt-4">
              <Handshake className="h-7 w-7 text-skillmatch-primary-blue" />
            </div>
            <h3 className="font-bold mb-2 text-center">Connect & Hire</h3>
            <p className="text-sm text-muted-foreground text-center">
              Extend offers to selected students and start onboarding your new
              OJT trainees.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
