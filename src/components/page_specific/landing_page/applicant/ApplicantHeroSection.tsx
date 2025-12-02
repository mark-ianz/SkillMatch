"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import SearchBar from "./SearchBar";
import PopularCategories from "./PopularCategories";
import { motion } from "framer-motion";

export default function ApplicantHeroSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-skillmatch-primary-green/15 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="secondary"
              className="mb-6 border-skillmatch-primary-green"
            >
              <Sparkles className="h-3 w-3 mr-1" />
              Exclusive to QCU Students
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance"
          >
            Launch Your Career.
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-skillmatch-primary-green block mt-2"
            >
              Find Your Perfect OJT.
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty"
          >
            Connect with top companies partnered with Quezon City University.
            Discover opportunities that match your skills and kickstart your
            professional journey.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <SearchBar />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <PopularCategories />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
