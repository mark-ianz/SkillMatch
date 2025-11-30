import React from "react";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ApplicantHeroSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-skillmatch-primary-green/15 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Badge
            variant="secondary"
            className="mb-6 border-skillmatch-primary-green"
          >
            <Sparkles className="h-3 w-3 mr-1" />
            Exclusive to QCU Students
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
            Launch Your Career.
            <span className="text-skillmatch-primary-green block mt-2">
              Find Your Perfect OJT.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Connect with top companies partnered with Quezon City University.
            Discover opportunities that match your skills and kickstart your
            professional journey.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-3 p-2 bg-card border rounded-lg shadow-lg">
              <div className="flex items-center flex-1 gap-2 px-3">
                <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <Input
                  placeholder="Search by job title or skills..."
                  className="border-0 shadow-none focus-visible:ring-0 px-0"
                  aria-label="Search jobs"
                />
              </div>
              <Button className="bg-skillmatch-primary-green text-skillmatch-light hover:bg-skillmatch-primary-green/90">
                Search Jobs
              </Button>
            </div>
          </div>

          {/* Popular Skills */}
          <div className="flex flex-wrap justify-center gap-2" role="list" aria-label="Popular job categories">
            <span className="text-sm text-muted-foreground">Popular:</span>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-skillmatch-primary-green hover:text-skillmatch-light transition-colors"
              role="listitem"
            >
              Web Developer
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-skillmatch-primary-green hover:text-skillmatch-light transition-colors"
              role="listitem"
            >
              UI/UX Designer
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-skillmatch-primary-green hover:text-skillmatch-light transition-colors"
              role="listitem"
            >
              Data Analyst
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-skillmatch-primary-green hover:text-skillmatch-light transition-colors"
              role="listitem"
            >
              Marketing
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-skillmatch-primary-green hover:text-skillmatch-light transition-colors"
              role="listitem"
            >
              Software Engineer
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
