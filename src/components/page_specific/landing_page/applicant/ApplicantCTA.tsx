import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ApplicantCTA() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <Card className="bg-skillmatch-primary-green text-skillmatch-light p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of QCU students who have found their perfect OJT
            match. Create your profile today and discover opportunities waiting
            for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="text-sm bg-skillmatch-light text-skillmatch-dark hover:bg-skillmatch-light/90"
              >
                Sign Up Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/explore">
              <Button
                size="lg"
                variant="outline"
                className="text-sm bg-transparent hover:bg-skillmatch-light/10 hover:text-skillmatch-light"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </section>
  );
}
