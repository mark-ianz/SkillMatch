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
    <section className="py-10 sm:py-14 md:py-20 lg:py-32 bg-gradient-to-b from-skillmatch-primary-blue/15 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center md:px-8 lg:px-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge
                variant="outline"
                className="mb-4 md:mb-6 border-skillmatch-primary-blue/50 text-xs sm:text-sm"
              >
                <Sparkles className="h-3 w-3 mr-1 text-skillmatch-primary-blue" />
                QCU Partnership Program
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 md:mb-6 text-balance leading-tight"
            >
              Hire Tomorrow&apos;s
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-skillmatch-primary-blue block mt-1 md:mt-2"
              >
                Top Talent Today
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 text-pretty"
            >
              Access a curated pool of skilled students from Quezon City
              University. Post opportunities, find perfect matches, and build
              your team with pre-vetted talent.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4"
            >
              <Link href="/signup?type=company" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-base md:text-lg bg-skillmatch-primary-blue text-white hover:bg-skillmatch-primary-blue/90 transition-all hover:scale-105"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
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
            <Card className="p-6 sm:p-8 backdrop-blur-sm bg-card/50 border-skillmatch-primary-blue/20 hover:border-skillmatch-primary-blue/40 transition-all">
              <div className="space-y-5 sm:space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex items-start gap-3 sm:gap-4"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-skillmatch-primary-blue/10 flex items-center justify-center flex-shrink-0">
                    <Target className="h-5 w-5 sm:h-6 sm:w-6 text-skillmatch-primary-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-sm sm:text-base">Targeted Recruitment</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Post specific roles and reach students with matching
                      skill sets instantly
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex items-start gap-3 sm:gap-4"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-skillmatch-primary-blue/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-skillmatch-primary-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-sm sm:text-base">Verified Candidates</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      All students are verified QCU enrollees with validated
                      academic records
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="flex items-start gap-3 sm:gap-4"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-skillmatch-primary-blue/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-skillmatch-primary-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-sm sm:text-base">Fast Hiring Process</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
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
