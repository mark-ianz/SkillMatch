"use client";

import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

export default function ApplicantHotItWorksSection() {
  const steps = [
    {
      number: 1,
      title: "Create Your Profile",
      description:
        "Sign up with your QCU email and build a profile showcasing your skills, courses, and career interests.",
    },
    {
      number: 2,
      title: "Browse Opportunities",
      description:
        "Explore hundreds of OJT positions from verified partner companies tailored to your field of study.",
    },
    {
      number: 3,
      title: "Apply with Confidence",
      description:
        "Submit applications directly through the platform. Track your progress and manage multiple applications easily.",
    },
    {
      number: 4,
      title: "Get Matched",
      description:
        "Our smart matching system connects you with companies looking for students with your exact skill set.",
    },
    {
      number: 5,
      title: "Start Your Journey",
      description:
        "Connect with employers, complete interviews, and begin your professional journey with top companies.",
    },
    {
      number: null,
      title: "Build Your Future",
      description:
        "Gain real-world experience, develop professional skills, and create meaningful connections in your industry.",
      special: true,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
            Your Path to Success
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Five simple steps to find and secure your ideal OJT position
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card
                className={`p-6 h-full hover:shadow-lg transition-shadow ${
                  step.special
                    ? "bg-skillmatch-primary-green/5 border-skillmatch-primary-green/20"
                    : ""
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                    step.special
                      ? "bg-skillmatch-primary-green"
                      : "bg-skillmatch-primary-green/10"
                  }`}
                >
                  {step.special ? (
                    <Sparkles className="h-6 w-6 text-skillmatch-light" />
                  ) : (
                    <span className="text-2xl font-bold text-skillmatch-primary-green">
                      {step.number}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
