"use client";

import CompanyHeroSection from "@/components/page_specific/landing_page/company/CompanyHeroSection";
import CompanyStatsSection from "@/components/page_specific/landing_page/company/CompanyStatsSection";
import CompanyFeatures from "@/components/page_specific/landing_page/company/CompanyFeatures";
import CompanyHowItWorks from "@/components/page_specific/landing_page/company/CompanyHowItWorks";
import CompanyCTA from "@/components/page_specific/landing_page/company/CompanyCTA";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function CompanyLandingPage() {
  const testimonials = [
    {
      stars: 5,
      content:
        '"SkillMatch transformed our internship program. We found talented students quickly and efficiently. The quality of candidates from QCU is exceptional."',
      author: "Anna Reyes",
      role: "HR Manager, TechCorp",
      initials: "AR",
    },
    {
      stars: 5,
      content:
        '"The platform made it so easy to manage applications and communicate with students. We hired 3 interns within 2 weeks!"',
      author: "Miguel Cruz",
      role: "CEO, StartupHub PH",
      initials: "MC",
    },
    {
      stars: 5,
      content:
        '"As a QCU partner, we get access to a pool of pre-vetted talent. The matching algorithm saved us countless hours of screening."',
      author: "Sarah Dela Cruz",
      role: "Talent Director, InnovateLab",
      initials: "SD",
    },
  ];

  return (
    <div className="min-h-screen bg-background w-full">
      <CompanyHeroSection />
      <CompanyStatsSection />
      <CompanyFeatures />
      <CompanyHowItWorks />

      {/* Testimonial Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
              Trusted by Leading Companies
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what our partner companies say about their experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="p-8 h-full hover:shadow-lg transition-shadow">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <span
                        key={i}
                        className="text-skillmatch-primary-blue text-xl"
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {testimonial.content}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-skillmatch-primary-blue/10 flex items-center justify-center">
                      <span className="font-bold text-skillmatch-primary-blue">
                        {testimonial.initials}
                      </span>
                    </div>
                    <div>
                      <div className="font-bold text-sm">
                        {testimonial.author}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CompanyCTA />
    </div>
  );
}
