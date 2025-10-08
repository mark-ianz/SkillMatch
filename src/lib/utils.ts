import { ParsedError } from "@/types/zod.types";
import { steps } from "@/const/steps";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import z, { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatZodError(error: ZodError) {
  const errors: ParsedError[] = JSON.parse(error.message);

  return errors.map((err) => err.message);
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getStepDetails(step: number) {
  return steps.find((s) => s.step === step);
}
