"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CompanyCTA() {
  return (
    <section className="py-20">
      <div className="px-4 lg:px-8 container mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-skillmatch-primary-blue text-white p-12 text-center mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              Ready to Find Your Next OJT Trainee?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg mb-8 opacity-90 max-w-2xl mx-auto"
            >
              Join 200+ companies partnering with QCU to access skilled, motivated
              students for their OJT programs.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
            <Link href="/signup">
              <Button
                size="lg"
                className="text-sm bg-skillmatch-light text-skillmatch-dark hover:bg-skillmatch-light/90"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="text-sm bg-transparent hover:bg-skillmatch-light/10 hover:text-skillmatch-light"
              >
                Learn More
              </Button>
            </Link>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
