import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function CompanyCTA() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <Card className="bg-skillmatch-primary-blue text-white p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Ready to Find Your Next OJT Trainee?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join 200+ companies partnering with QCU to access skilled,
            motivated students for their OJT programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-skillmatch-primary-blue hover:bg-white/90"
              asChild
            >
              <Link href="/auth">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <Link href="#how-it-works">Learn More</Link>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
