import useSignupStore from "@/store/SignupStore";
import { Check } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

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
    <ol className="flex flex-col gap-6 h-full justify-between">
      {steps.map((step, index) => {
        const isCurrent = currentStep === index + 1;
        const isCompleted = farthestStep > index + 1;

        return (
          <li
            key={index}
            className={cn(
              isCurrent ? "text-skillmatch-light" : "text-skillmatch-muted-dark"
            )}
          >
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "border border-skillmatch-muted-light text-skillmatch-muted-light rounded-full w-7 h-7 text-xs flex items-center justify-center font-bold",
                  isCurrent &&
                    "text-skillmatch-primary-green bg-skillmatch-light border-skillmatch-light"
                )}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : index + 1}
              </span>
              <div className={cn(!isCurrent && " text-skillmatch-muted-light")}>
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
