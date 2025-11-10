import { ParsedError } from "@/types/zod.types";
import { employer_steps, steps } from "@/const/steps";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";
import college_courses from "@/data/college_courses.json";
import { ItemList } from "@/components/common/input/ComboBox";
import industry_categories from "@/data/industry_categories.json";

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

export function getAllCourses(asItems?: boolean): string[] | ItemList[] {
  const COLLEGE_LIST = Object.keys(college_courses).map((college) => ({
    college: college,
    courses: college_courses[college as keyof typeof college_courses].courses,
  }));

  if (asItems) {
    return COLLEGE_LIST.flatMap((c) =>
      c.courses.map((course) => ({
        value: course.course_name,
        label: course.course_name,
      }))
    );
  }

  return COLLEGE_LIST.flatMap((c) =>
    c.courses.map((course) => course.course_name)
  );
}

export function getAllIndustry(asItems?: boolean): string[] | ItemList[] {
  if (asItems) {
    return industry_categories.map((industry) => ({
      value: industry.industry,
      label: industry.industry,
    }));
  }

  return industry_categories.map((industry) => industry.industry);
}

export function getAllJobCategories(asItems?: boolean, sort?: boolean): string[] | ItemList[] {
  if (asItems) {
    return industry_categories.flatMap((industry) =>
      industry.job_categories.map((job) => ({
        value: job,
        label: job,
      }))
    );
  }

  return industry_categories.flatMap((industry) => industry.job_categories).sort((a, b) => sort ? a.localeCompare(b) : 0);
}