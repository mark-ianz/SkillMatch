import React from "react";
import GettingStartedCard from "./GettingStartedCard";
import { User, FilePlus, Users, Handshake, Flag } from "lucide-react";
import { UserType } from "@/types/user.types";

const CARDS = [
  {
    title: "Create Your Profile",
    description:
      "Whether you're a company or an applicant, sign up and complete your profile with the details that matter.",
    icon: <User className="w-16 h-16 text-skillmatch-primary-yellow" />,
  },
  {
    title: "Post Opportunities",
    description:
      "Browse openings from trusted employers and apply to positions that match your goals and qualifications.",
    icon: <FilePlus className="w-16 h-16 text-skillmatch-primary-yellow" />,
  },
  {
    title: "Review or Connect",
    description:
      "Employers can review applications or directly connect with applicants who match their requirements.",
    icon: <Users className="w-16 h-16 text-skillmatch-primary-yellow" />,
  },
  {
    title: "Get Matched",
    description:
      "Applicants apply in one place — employers can manage who's shortlisted, interviewed, or hired.",
    icon: <Handshake className="w-16 h-16 text-skillmatch-primary-yellow" />,
  },
  {
    title: "Start Your Journey",
    description:
      "Once matched, both employers and applicants can connect outside the platform and begin the professional journey.",
    icon: <Flag className="w-16 h-16 text-skillmatch-primary-yellow" />,
  },
];

export default function GettingStartedSection({ type }: { type: UserType }) {
  return (
    <section className="max-w-7xl mx-auto mt-16 text-skillmatch-dark">
      <h2 className="text-2xl font-semibold ">Getting Started</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {CARDS.map((c, index) => {
          return (
            <GettingStartedCard
              title={index + 1 + ". " + c.title}
              key={index}
              description={c.description}
              icon={c.icon}
            />
          );
        })}
      </div>
    </section>
  );
}
