import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import React from "react";

export default function ApplicantHotItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
            Your Path to Success
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Five simple steps to find and secure your ideal OJT position
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-skillmatch-primary-green/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-skillmatch-primary-green">
                1
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3">Create Your Profile</h3>
            <p className="text-muted-foreground">
              Sign up with your QCU email and build a profile showcasing your
              skills, courses, and career interests.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-skillmatch-primary-green/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-skillmatch-primary-green">
                2
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3">Browse Opportunities</h3>
            <p className="text-muted-foreground">
              Explore hundreds of OJT positions from verified partner companies
              tailored to your field of study.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-skillmatch-primary-green/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-skillmatch-primary-green">
                3
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3">Apply with Confidence</h3>
            <p className="text-muted-foreground">
              Submit applications directly through the platform. Track your
              progress and manage multiple applications easily.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-skillmatch-primary-green/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-skillmatch-primary-green">
                4
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3">Get Matched</h3>
            <p className="text-muted-foreground">
              Our smart matching system connects you with companies looking for
              students with your exact skill set.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-skillmatch-primary-green/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-skillmatch-primary-green">
                5
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3">Start Your Journey</h3>
            <p className="text-muted-foreground">
              Connect with employers, complete interviews, and begin your
              professional journey with top companies.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow bg-skillmatch-primary-green/5 border-skillmatch-bg-skillmatch-primary-green/20">
            <div className="w-12 h-12 rounded-full bg-skillmatch-primary-green flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-skillmatch-light" />
            </div>
            <h3 className="text-xl font-bold mb-3">Build Your Future</h3>
            <p className="text-muted-foreground">
              Gain real-world experience, develop professional skills, and
              create meaningful connections in your industry.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
