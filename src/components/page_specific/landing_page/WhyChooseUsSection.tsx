import React from "react";
import { ShieldCheck, IdCard, Users, Globe } from "lucide-react";
import GettingStartedCard from "./GettingStartedCard";

const REASONS = [
  {
    title: "Verified Candidates",
    description:
      "Gain access to a pool of trusted OJT applicants from QCU, carefully verified to ensure every candidate is safe, qualified, and legitimate before they reach you.",
    icon: <ShieldCheck className="w-16 h-16 text-skillmatch-primary-green" />,
  },
  {
    title: "Employer's Profile",
    description:
      "Create a professional profile where you can post job openings, describe available opportunities, and give students a clear view of what your company offers.",
    icon: <IdCard className="w-16 h-16 text-skillmatch-primary-green" />,
  },
  {
    title: "Direct Talent Connections",
    description:
      "Easily connect with students actively looking for OJT placements, giving you direct access for interviews, training, and potential future hires.",
    icon: <Users className="w-16 h-16 text-skillmatch-primary-green" />,
  },
  {
    title: "Fair Visibility",
    description:
      "Enjoy equal visibility across the platform, where all employers get the same chance to showcase opportunities — not just those with referrals or inside connections.",
    icon: <Globe className="w-16 h-16 text-skillmatch-primary-green" />,
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="mt-16 bg-skillmatch-primary-green py-12 text-skillmatch-light flex flex-col justify-center items-center">
      <div className="max-w-7xl flex flex-col justify-center items-center">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-semibold">Why Choose SkillMatch?</h2>
          <blockquote className="mt-2 text-white/90 italic">
            <q>
              Connecting students, alumni, and employers in one trusted platform
              for real opportunities and meaningful careers.
            </q>
          </blockquote>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          {REASONS.map((r) => (
            <GettingStartedCard
              className="h-[300px]"
              description={r.description}
              title={r.title}
              icon={r.icon}
              key={r.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
