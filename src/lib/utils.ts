import { ParsedError } from "@/types/zod.types";
import { employer_steps, steps } from "@/const/steps";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";
import college_courses from "@/data/college_courses.json";

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

export function getStepDetails(step: number, type: "ojt" | "employer" = "ojt") {
  if (type === "employer") {
    return employer_steps.find((s) => s.step === step);
  } else {
    return steps.find((s) => s.step === step);
  }
}

export function getAllCourses() {
  const COLLEGE_LIST = Object.keys(college_courses).map((college) => ({
    college: college,
    courses: college_courses[college as keyof typeof college_courses].courses,
  }));

  return COLLEGE_LIST.flatMap((c) =>
    c.courses.map((course) => course.course_name)
  );
}
