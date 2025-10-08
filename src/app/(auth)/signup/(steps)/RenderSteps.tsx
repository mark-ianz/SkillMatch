import useSignupStore from "@/app/store/SignupStore";
import { CheckCircle, Circle } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

export default function RenderSteps() {
  const farthestStep = useSignupStore((state) => state.farthestStep);
  const currentStep = useSignupStore((state) => state.currentStep);

  const steps = [
    "Personal Details",
    "Address",
    "Academic Details",
    "Skills",
    "Certifications",
    "Review & Submit",
  ];

  return (
    <ol className="flex flex-col gap-4 h-full justify-between py-10">
      <p className="px-10 text-xl text-skillmatch-light">Join SkillMatch Now</p>
      {steps.map((step, index) => {
        const isCurrent = currentStep === index + 1;
        const isCompleted = farthestStep > index + 1;

        return (
          <li
            key={index}
            className={twMerge(
              "px-10 py-2",
              isCurrent ? "text-skillmatch-light" : "text-skillmatch-muted-dark"
            )}
          >
            <div className="flex items-center gap-2">
              {isCompleted ? <CheckCircle /> : <Circle />}
              <div>
                <p className="text-xs">Step {index + 1}/6</p>
                <p className="text-sm">{step}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
