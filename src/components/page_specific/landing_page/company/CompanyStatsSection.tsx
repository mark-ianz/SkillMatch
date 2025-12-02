"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CompanyStatsSection() {
  return (
    <section className="py-12 border-y bg-gradient-to-r from-skillmatch-primary-blue/5 via-transparent to-company-secondary/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="text-3xl md:text-4xl font-bold text-skillmatch-primary-blue mb-2">
              3,000+
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Active Students
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-3xl md:text-4xl font-bold text-skillmatch-primary-blue mb-2">
              200+
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Partner Companies
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="text-3xl md:text-4xl font-bold text-skillmatch-primary-blue mb-2">
              14 Days
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Avg. Time to Hire
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="text-3xl md:text-4xl font-bold text-skillmatch-primary-blue mb-2">
              92%
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Match Success Rate
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
