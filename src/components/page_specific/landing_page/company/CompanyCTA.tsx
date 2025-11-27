import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function CompanyCTA() {
  return (
    <section className="py-20">
      <div className="px-4 lg:px-8 container mx-auto">
        <Card className="bg-skillmatch-primary-blue text-white p-12 text-center mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Ready to Find Your Next OJT Trainee?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join 200+ companies partnering with QCU to access skilled, motivated
            students for their OJT programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-sm bg-skillmatch-light text-skillmatch-dark hover:bg-skillmatch-light/90"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-sm bg-transparent hover:bg-skillmatch-light/10 hover:text-skillmatch-light"
            >
              Learn More
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
