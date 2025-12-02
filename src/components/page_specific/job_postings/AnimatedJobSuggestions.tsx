"use client";

import { motion } from "framer-motion";
import { JobPostPreview } from "@/components/page_specific/explore/job-postings/JobPostPreview";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { JobPost } from "@/types/job_post.types";

interface AnimatedJobSuggestionsProps {
  suggestions: JobPost[];
}

export function AnimatedJobSuggestions({ suggestions }: AnimatedJobSuggestionsProps) {
  return (
    <ScrollArea className="h-96">
      <div className="grid grid-cols-1 gap-4 pr-4">
        {suggestions.map((job, index) => (
          <motion.div
            key={job.job_post_id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 20 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.3, delay: index * 0.07 }}
          >
            <Link href={"/view/job-postings/" + job.job_post_id}>
              <JobPostPreview job={job} />
            </Link>
          </motion.div>
        ))}
      </div>
    </ScrollArea>
  );
}
