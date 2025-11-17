import React from "react";

export default function OJTStatsSection() {
  // dummy pa lang, baka hindi to isama sa final
  return (
    <section className="py-12 border-y bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-skillmatch-primary-green mb-2">
              500+
            </div>
            <div className="text-sm text-muted-foreground">
              Active Opportunities
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-skillmatch-primary-green mb-2">
              200+
            </div>
            <div className="text-sm text-muted-foreground">
              Partner Companies
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-skillmatch-primary-green mb-2">
              3,000+
            </div>
            <div className="text-sm text-muted-foreground">
              QCU Students Placed
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-skillmatch-primary-green mb-2">
              95%
            </div>
            <div className="text-sm text-muted-foreground">
              Satisfaction Rate
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
