"use client";

import { Card } from "@/components/ui/card";
import { Users, Clock, BarChart3, Shield, Target, Zap } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

export default function CompanyFeatures() {
  const features = [
    {
      icon: Users,
      title: "Access Top Talent",
      description:
        "Connect with motivated students across various programs including IT, Business, Engineering, and more.",
    },
    {
      icon: Clock,
      title: "Save Time & Resources",
      description:
        "Reduce recruitment costs with our efficient platform that handles screening and matching automatically.",
    },
    {
      icon: BarChart3,
      title: "Track Performance",
      description:
        "Monitor applications, manage candidates, and analyze hiring metrics all from one dashboard.",
    },
    {
      icon: Shield,
      title: "Verified Partnership",
      description:
        "Official QCU partnership ensures quality candidates and institutional support throughout.",
    },
    {
      icon: Target,
      title: "Smart Matching",
      description:
        "Our algorithm matches your requirements with student skills, saving you hours of screening.",
    },
    {
      icon: Zap,
      title: "Streamlined Process",
      description:
        "From posting to hiring, manage everything in one place with our intuitive interface.",
    },
  ];

  return (
    <section id="benefits" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
            Why Partner with SkillMatch?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Streamline your recruitment process and access quality talent from
            QCU
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="p-6 text-center h-full hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-skillmatch-primary-blue/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-7 w-7 text-skillmatch-primary-blue" />
                </div>
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
