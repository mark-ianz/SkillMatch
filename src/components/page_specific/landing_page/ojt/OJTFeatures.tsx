import { Card } from "@/components/ui/card";
import { Briefcase, CheckCircle2, TrendingUp, Users } from "lucide-react";
import React from "react";


export default function OJTFeatures() {
  return (
    <section id="explore" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
            Why Choose SkillMatch?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to find and secure the perfect OJT opportunity
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-skillmatch-primary-green/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-7 w-7 text-skillmatch-primary-green" />
            </div>
            <h3 className="font-bold mb-2">Verified Companies</h3>
            <p className="text-sm text-muted-foreground">
              All companies are officially partnered with QCU, ensuring quality
              and safety.
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-skillmatch-primary-green/10 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-7 w-7 text-skillmatch-primary-green" />
            </div>
            <h3 className="font-bold mb-2">Career Growth</h3>
            <p className="text-sm text-muted-foreground">
              Access opportunities that align with your career goals and skill
              development.
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-skillmatch-primary-green/10 flex items-center justify-center mx-auto mb-4">
              <Users className="h-7 w-7 text-skillmatch-primary-green" />
            </div>
            <h3 className="font-bold mb-2">Direct Connections</h3>
            <p className="text-sm text-muted-foreground">
              Connect directly with hiring managers and build professional
              relationships.
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-skillmatch-primary-green/10 flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-7 w-7 text-skillmatch-primary-green" />
            </div>
            <h3 className="font-bold mb-2">Track Applications</h3>
            <p className="text-sm text-muted-foreground">
              Manage all your applications in one place with real-time status
              updates.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
