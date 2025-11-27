import { Card } from "@/components/ui/card";
import { Users, Clock, BarChart3, Shield, Target, Zap } from "lucide-react";
import React from "react";

export default function CompanyFeatures() {
  return (
    <section id="benefits" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
            Why Partner with SkillMatch?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Streamline your recruitment process and access quality talent from
            QCU
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 rounded-xl bg-skillmatch-primary-blue/10 flex items-center justify-center mx-auto mb-4">
              <Users className="h-7 w-7 text-skillmatch-primary-blue" />
            </div>
            <h3 className="font-bold mb-2">Access Top Talent</h3>
            <p className="text-sm text-muted-foreground">
              Connect with motivated students across various programs including
              IT, Business, Engineering, and more.
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 rounded-xl bg-skillmatch-primary-blue/10 flex items-center justify-center mx-auto mb-4">
              <Clock className="h-7 w-7 text-skillmatch-primary-blue" />
            </div>
            <h3 className="font-bold mb-2">Save Time & Resources</h3>
            <p className="text-sm text-muted-foreground">
              Reduce recruitment costs with our efficient platform that handles
              screening and matching automatically.
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 rounded-xl bg-skillmatch-primary-blue/10 flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-7 w-7 text-skillmatch-primary-blue" />
            </div>
            <h3 className="font-bold mb-2">Track Performance</h3>
            <p className="text-sm text-muted-foreground">
              Monitor applications, manage candidates, and analyze hiring
              metrics all from one dashboard.
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 rounded-xl bg-skillmatch-primary-blue/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-7 w-7 text-skillmatch-primary-blue" />
            </div>
            <h3 className="font-bold mb-2">Verified Partnership</h3>
            <p className="text-sm text-muted-foreground">
              Official QCU partnership ensures quality candidates and
              institutional support throughout.
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 rounded-xl bg-skillmatch-primary-blue/10 flex items-center justify-center mx-auto mb-4">
              <Target className="h-7 w-7 text-skillmatch-primary-blue" />
            </div>
            <h3 className="font-bold mb-2">Smart Matching</h3>
            <p className="text-sm text-muted-foreground">
              Our algorithm matches your requirements with student skills,
              saving you hours of screening.
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 rounded-xl bg-skillmatch-primary-blue/10 flex items-center justify-center mx-auto mb-4">
              <Zap className="h-7 w-7 text-skillmatch-primary-blue" />
            </div>
            <h3 className="font-bold mb-2">Streamlined Process</h3>
            <p className="text-sm text-muted-foreground">
              From posting to hiring, manage everything in one place with our
              intuitive interface.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
