import CompanyHeroSection from "@/components/page_specific/landing_page/company/CompanyHeroSection";
import CompanyStatsSection from "@/components/page_specific/landing_page/company/CompanyStatsSection";
import CompanyFeatures from "@/components/page_specific/landing_page/company/CompanyFeatures";
import CompanyHowItWorks from "@/components/page_specific/landing_page/company/CompanyHowItWorks";
import CompanyCTA from "@/components/page_specific/landing_page/company/CompanyCTA";
import { Card } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hire QCU Talent",
  description:
    "Access 3,000+ skilled students from Quezon City University. Post opportunities, find perfect matches, and hire tomorrow's top talent today.",
  openGraph: {
    title: "Hire Tomorrow's Top Talent - SkillMatch for Companies",
    description:
      "Partner with QCU to access pre-vetted student talent. Reduce time-to-hire with our streamlined recruitment platform.",
  },
};

export default function CompanyLandingPage() {
  return (
    <div className="min-h-screen bg-background w-full">
      <CompanyHeroSection />
      <CompanyStatsSection />
      <CompanyFeatures />
      <CompanyHowItWorks />

      {/* Testimonial Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
              Trusted by Leading Companies
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what our partner companies say about their experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="text-skillmatch-primary-blue text-xl"
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                &quot;SkillMatch transformed our internship program. We found
                talented students quickly and efficiently. The quality of
                candidates from QCU is exceptional.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-skillmatch-primary-blue/10 flex items-center justify-center">
                  <span className="font-bold text-skillmatch-primary-blue">
                    AR
                  </span>
                </div>
                <div>
                  <div className="font-bold text-sm">Anna Reyes</div>
                  <div className="text-xs text-muted-foreground">
                    HR Manager, TechCorp
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="text-skillmatch-primary-blue text-xl"
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                &quot;The platform made it so easy to manage applications and
                communicate with students. We hired 3 interns within 2
                weeks!&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-skillmatch-primary-blue/10 flex items-center justify-center">
                  <span className="font-bold text-skillmatch-primary-blue">
                    MC
                  </span>
                </div>
                <div>
                  <div className="font-bold text-sm">Miguel Cruz</div>
                  <div className="text-xs text-muted-foreground">
                    CEO, StartupHub PH
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="text-skillmatch-primary-blue text-xl"
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                &quot;As a QCU partner, we get access to a pool of pre-vetted
                talent. The matching algorithm saved us countless hours of
                screening.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-skillmatch-primary-blue/10 flex items-center justify-center">
                  <span className="font-bold text-skillmatch-primary-blue">
                    SD
                  </span>
                </div>
                <div>
                  <div className="font-bold text-sm">Sarah Dela Cruz</div>
                  <div className="text-xs text-muted-foreground">
                    Talent Director, InnovateLab
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <CompanyCTA />
    </div>
  );
}
