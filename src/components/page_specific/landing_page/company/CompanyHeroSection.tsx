"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Target, Shield, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CompanyHeroSection() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-skillmatch-primary-blue/15 to-background" />
      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center px-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge
                variant="outline"
                className="mb-6 border-skillmatch-primary-blue/50"
              >
                <Sparkles className="h-3 w-3 mr-1 text-skillmatch-primary-blue" />
                QCU Partnership Program
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance"
            >
              Hire Tomorrow&apos;s
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-skillmatch-primary-blue block mt-2"
              >
                Top Talent Today
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty"
            >
              Access a curated pool of skilled students from Quezon City
              University. Post opportunities, find perfect matches, and build
              your team with pre-vetted talent.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/signup">
                <Button
                  size="lg"
                  className="text-lg bg-skillmatch-primary-blue text-white hover:bg-skillmatch-primary-blue/90 transition-all hover:scale-105"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <Card className="p-8 backdrop-blur-sm bg-card/50 border-skillmatch-primary-blue/20 hover:border-skillmatch-primary-blue/40 transition-all">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-skillmatch-primary-blue/10 flex items-center justify-center flex-shrink-0">
                    <Target className="h-6 w-6 text-skillmatch-primary-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Targeted Recruitment</h3>
                    <p className="text-sm text-muted-foreground">
                      Post specific roles and reach students with matching
                      skill sets instantly
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-skillmatch-primary-blue/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-skillmatch-primary-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Verified Candidates</h3>
                    <p className="text-sm text-muted-foreground">
                      All students are verified QCU enrollees with validated
                      academic records
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-skillmatch-primary-blue/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-6 w-6 text-skillmatch-primary-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Fast Hiring Process</h3>
                    <p className="text-sm text-muted-foreground">
                      Reduce time-to-hire with streamlined application and
                      review workflows
                    </p>
                  </div>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
