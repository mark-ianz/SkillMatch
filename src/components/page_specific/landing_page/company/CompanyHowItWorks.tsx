"use client";

import { Card } from "@/components/ui/card";
import { FileCheck, Search, Users, Handshake } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

export default function CompanyHowItWorks() {
  const steps = [
    {
      number: 1,
      icon: FileCheck,
      title: "Create Company Profile",
      description:
        "Register your company and complete your profile with company details and requirements.",
    },
    {
      number: 2,
      icon: Search,
      title: "Post OJT Positions",
      description:
        "Create job postings with specific requirements, skills needed, and training opportunities.",
    },
    {
      number: 3,
      icon: Users,
      title: "Review Candidates",
      description:
        "Browse matched student profiles, review applications, and schedule interviews with top candidates.",
    },
    {
      number: 4,
      icon: Handshake,
      title: "Connect & Hire",
      description:
        "Extend offers to selected students and start onboarding your new OJT trainees.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start hiring qualified students in just a few simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="p-6 relative h-full hover:shadow-lg transition-shadow">
                <div className="w-8 h-8 rounded-full bg-skillmatch-primary-blue text-white flex items-center justify-center font-bold">
                  {step.number}
                </div>
                <div className="w-14 h-14 rounded-xl bg-skillmatch-primary-blue/10 flex items-center justify-center mx-auto mb-4 mt-4">
                  <step.icon className="h-7 w-7 text-skillmatch-primary-blue" />
                </div>
                <h3 className="font-bold mb-2 text-center">{step.title}</h3>
                <p className="text-sm text-muted-foreground text-center">
                  {step.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
