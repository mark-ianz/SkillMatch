import HeaderText from "@/components/global/HeaderText";
import { Input } from "@/components/ui/input";
import {
  ChevronRight,
  Cpu,
  Computer,
  HandCoins,
  PenTool,
  CirclePercent,
  GraduationCap,
  HardHat,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import hero_section_image from "@/images/background/hero_section_image.png";

export default function HeroSection() {
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

  const searchRecommendations = [
    "web-developer",
    "ui/ux-designer",
    "project-management",
    "data-analyst",
    "software-engineer",
    "database-administrator",
  ];

  return (
    <section id="hero" className="h-[calc(100vh-5rem)]">
      <div className="flex flex-col h-full items-center justify-center">
        <div className="relative flex-1 w-full flex items-center justify-center bg-no-repeat bg-center">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={hero_section_image}
              alt="hero"
              fill
              quality={100}
              priority
              className="object-cover object-center w-full h-full"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Overlay content */}
          <div className="relative z-10 flex flex-col w-full py-10 max-w-7xl">
            <div className="max-w-xl text-white">
              <h1 className="text-4xl md:text-6xl font-sansation font-semibold leading-tight">
                Build your future.
                <br />
                Find your path.
              </h1>
              <p className="mt-4 md:mt-6 text-skillmatch-light/90 text-md">
                Discover verified opportunities, connect with employers, and
                start a meaningful career path tailored to your skills.
              </p>
            </div>

            <div className="flex flex-col gap-4 max-w-xl mt-6">
              <Input
                type="text"
                placeholder="Search for jobs and companies"
                className="w-full bg-white text-black"
              />
              <ul className="flex flex-wrap gap-2">
                {searchRecommendations.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm flex items-center justify-center gap-2 border p-1 px-4 rounded-md bg-black/30 cursor-pointer hover:bg-black/50 duration-200 transition-all text-white"
                  >
                    {item}
                    <ChevronRight className="w-4 h-4" />
                  </li>
                ))}
              </ul>
              <Link
                href="/explore?categories=jobs"
                className="text-sm flex items-center justify-center w-fit underline text-white"
              >
                Explore More <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Qualification Categories */}
        <div className="py-6 flex items-center justify-center max-w-7xl">
          <div className="max-w-7xl w-full">
            <HeaderText>Qualification Categories</HeaderText>
            <ul className="grid grid-cols-2 md:grid-cols-7 gap-4 mt-4">
              {qualificationCategories.map((category, index) => (
                <li
                  key={index}
                  className="text-skillmatch-primary-green flex gap-4 items-center p-4 py-6 rounded-md border flex-col text-sm text-center hover:shadow-md cursor-pointer duration-200 hover:scale-105 transition-all bg-white"
                >
                  {category.svg}
                  <span className="font-sansation items-end">
                    {category.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
