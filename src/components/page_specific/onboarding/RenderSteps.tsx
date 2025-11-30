import { Check } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { employer_steps, steps } from "@/const/steps";
import useOnboardingStore from "@/store/onboarding/shared.onboarding.store";

export default function RenderSteps({ type }: { type: "applicant" | "employer" }) {
  const farthestStep = useOnboardingStore((state) => state.farthestStep);
  const currentStep = useOnboardingStore((state) => state.currentStep);

  const goToStep = useOnboardingStore((state) => state.goToStep);

  const stepsToRender = type === "employer" ? employer_steps : steps;

  return (
    <ol className="flex flex-col h-full justify-between">
      {stepsToRender.map((step, index) => {
        const isCurrent = currentStep === step.step;
        const isCompleted = farthestStep > step.step;

        // User can jump if they are on a previous step and this step is either completer or their farthest step.
        const canJump =
          farthestStep > step.step ||
          (farthestStep === step.step && !isCurrent);

        return (
          <li
            onClick={() => goToStep(step.step)}
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
                <p className="text-xs">
                  Step {step.step}/{stepsToRender.length}
                </p>
                <p className="text-sm">{step.title}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
