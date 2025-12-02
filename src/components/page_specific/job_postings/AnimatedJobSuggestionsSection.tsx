"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { JobPostPreview } from "../explore/job-postings/JobPostPreview";
import type { JobPost } from "@/types/job_post.types";

interface AnimatedJobSuggestionsSectionProps {
  suggestions: JobPost[] | null;
}

export function AnimatedJobSuggestionsSection({
  suggestions,
}: AnimatedJobSuggestionsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4 }}
      className="space-y-6 w-full"
    >
      <div className="flex items-center justify-between px-4">
        <h2 className="text-2xl font-bold text-foreground">
          Recommended Jobs For You
        </h2>
        {suggestions && suggestions.length > 0 && (
          <Badge variant="secondary" className="text-sm font-medium px-4 py-2">
            {suggestions.length} Suggestion
            {suggestions.length !== 1 ? "s" : ""}
          </Badge>
        )}
      </div>

      {suggestions && suggestions.length > 0 ? (
        <ScrollArea className="h-96 overflow-y-visible">
          <div className="grid grid-cols-1 gap-4 px-4 py-1">
            {suggestions.map((job) => (
              <Link
                key={job.job_post_id}
                href={"/view/job-postings/" + job.job_post_id}
              >
                <JobPostPreview job={job} />
              </Link>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="px-4">
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">
              No similar job opportunities found.
            </p>
          </Card>
        </div>
      )}
    </motion.div>
  );
}
