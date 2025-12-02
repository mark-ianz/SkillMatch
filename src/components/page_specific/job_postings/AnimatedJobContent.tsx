"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedJobContentProps {
  children: ReactNode;
}

export function AnimatedJobContent({ children }: AnimatedJobContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-4 w-full"
    >
      {children}
    </motion.div>
  );
}
