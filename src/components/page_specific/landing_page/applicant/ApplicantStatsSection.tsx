"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ApplicantStatsSection() {
  // dummy pa lang, baka hindi to isama sa final
  return (
    <section className="py-12 border-y bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="text-3xl md:text-4xl font-bold text-skillmatch-primary-green mb-2">
              500+
            </div>
            <div className="text-sm text-muted-foreground">
              Active Opportunities
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-3xl md:text-4xl font-bold text-skillmatch-primary-green mb-2">
              200+
            </div>
            <div className="text-sm text-muted-foreground">
              Partner Companies
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="text-3xl md:text-4xl font-bold text-skillmatch-primary-green mb-2">
              3,000+
            </div>
            <div className="text-sm text-muted-foreground">
              QCU Students Placed
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="text-3xl md:text-4xl font-bold text-skillmatch-primary-green mb-2">
              95%
            </div>
            <div className="text-sm text-muted-foreground">
              Satisfaction Rate
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
