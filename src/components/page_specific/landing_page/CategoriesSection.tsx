import HeaderText from "@/components/global/HeaderText";
import React from "react";
import {
  CirclePercent,
  Computer,
  Cpu,
  GraduationCap,
  HandCoins,
  HardHat,
  PenTool,
} from "lucide-react";
import { UserType } from "@/types/user.types";

export default function CategoriesSection({ type }: { type: UserType }) {
  const qualificationCategories = [
    { name: "Technology & IT", svg: <Cpu className="w-10 h-10" /> },
    { name: "Software Development", svg: <Computer className="w-10 h-10" /> },
    { name: "Business & Management", svg: <HandCoins className="w-10 h-10" /> },
    { name: "Creative & Design", svg: <PenTool className="w-10 h-10" /> },
    { name: "Sales & Marketing", svg: <CirclePercent className="w-10 h-10" /> },
    {
      name: "Education & Training",
      svg: <GraduationCap className="w-10 h-10" />,
    },
    {
      name: "Engineering & Architecture",
      svg: <HardHat className="w-10 h-10" />,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto mt-12">
      <HeaderText>Qualification Categories</HeaderText>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 mt-6">
        {qualificationCategories.map((cat, i) => (
          <li
            key={i}
            className="aspect-square flex gap-4 items-center p-4 py-6 rounded-md border flex-col text-sm text-center hover:shadow-md cursor-pointer duration-200 hover:scale-105 transition-all"
          >
            <div className="text-skillmatch-primary-green">{cat.svg}</div>
            <div className="text-sm font-medium text-skillmatch-dark">
              {cat.name}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
