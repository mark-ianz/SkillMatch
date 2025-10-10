import useSignupStore from "@/store/SignupStore";
import { Check } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { steps } from "@/const/steps";

export default function RenderSteps() {
  const farthestStep = useSignupStore((state) => state.farthestStep);
  const currentStep = useSignupStore((state) => state.currentStep);

  return (
    <ol className="flex flex-col h-full justify-between">
      {steps.map((step, index) => {
        const isCurrent = currentStep === step.step;
        const isCompleted = farthestStep > step.step;

        // User can jump if they are on a previous step and this step is either completer or their farthest step.
        const canJump =
          farthestStep > step.step ||
          (farthestStep === step.step + 1 && !isCurrent);

        return (
          <li
            key={index}
            className={cn(
              "py-5 px-4",
              // If the step is completed or the step is not the
              isCurrent && "bg-skillmatch-muted-dark/20",
              canJump &&
                "cursor-pointer hover:bg-skillmatch-muted-dark/20 transition-colors"
            )}
          >
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "border border-skillmatch-muted-light text-skillmatch-muted-light rounded-full w-7 h-7 text-xs flex items-center justify-center font-bold",
                  (isCurrent || isCompleted || canJump) &&
                    "text-skillmatch-primary-green bg-skillmatch-light border-skillmatch-light"
                )}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 text-skillmatch-primary-green" />
                ) : (
                  index + 1
                )}
              </span>
              <div
                className={cn(
                  isCurrent || isCompleted || canJump
                    ? "text-skillmatch-light"
                    : "text-skillmatch-muted-light"
                )}
              >
                <p className="text-xs">Step {step.step}/6</p>
                <p className="text-sm">{step.title}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
