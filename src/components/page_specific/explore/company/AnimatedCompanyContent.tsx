"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CompanyProfile } from "./CompanyProfile";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { JobPostPreview } from "../job-postings/JobPostPreview";
import { Card } from "@/components/ui/card";
import type { CompanyProfile as CompanyProfileType } from "@/types/company.types";
import type { JobPost } from "@/types/job_post.types";

interface AnimatedCompanyContentProps {
  company_profile: CompanyProfileType;
  job_posted: JobPost[];
}

export function AnimatedCompanyContent({
  company_profile,
  job_posted,
}: AnimatedCompanyContentProps) {
  return (
    <div className="gap-10 flex flex-col items-center w-full">
      {/* Back Button & Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-4"
      >
        <Link href="/explore/companies" className="self-start">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Companies
          </Button>
        </Link>

        {/* Company Profile Card */}
        <CompanyProfile className="p-10 w-5xl" company={company_profile} />
      </motion.div>

      {/* Job Posts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="space-y-6 grow"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            Available Positions
          </h2>
          <Badge variant="secondary" className="text-sm font-medium px-4 py-2">
            {job_posted.length} Opening{job_posted.length !== 1 ? "s" : ""}
          </Badge>
        </div>

        {job_posted.length > 0 ? (
          <ScrollArea className="h-96">
            <div className="grid grid-cols-1 gap-4 pr-4">
              {job_posted.map((job, index) => (
                <motion.div
                  key={job.job_post_id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link href={"/view/job-postings/" + job.job_post_id}>
                    <JobPostPreview job={job} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">
              No job openings available at the moment.
            </p>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
