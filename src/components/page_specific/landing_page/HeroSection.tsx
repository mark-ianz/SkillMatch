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
import { getImageProps } from "next/image";
import Link from "next/link";
import React from "react";

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

  function getBackgroundImage(srcSet = "") {
    const imageSet = srcSet
      .split(", ")
      .map((str) => {
        const [url, dpi] = str.split(" ");
        return `url("${url}") ${dpi}`;
      })
      .join(", ");
    return `image-set(${imageSet})`;
  }

  const {
    props: { srcSet },
  } = getImageProps({
    alt: "hero-section",
    width: 1920,
    height: 1080,
    src: "/hero_section_image.png",
  });

  const backgroundImage = getBackgroundImage(srcSet);

  return (
    <section id="hero" className="h-[calc(100vh-5rem)]">
      <div className="flex flex-col justify-center">
        <div
          className="text-white bg-orange-50 py-10 h-[calc(100vh-25rem)] flex justify-center items-center bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage }}
        >
          <div className="flex flex-col max-w-7xl w-full">
            <div className="max-w-xl">
              <h1 className="text-5xl md:text-6xl font-sansation font-semibold leading-tight">
                Build your future.
                <br />
                Find your path.
              </h1>
              <p className="mt-6 text-skillmatch-light/90 text-md">
                Discover verified opportunities, connect with employers, and
                start a meaningful career path tailored to your skills.
              </p>
            </div>
            <div className="flex flex-col gap-4 max-w-xl">
              <Input
                type="text"
                placeholder="Search for jobs and companies"
                className="w-full mt-6 bg-white text-black"
              />
              <ul className="flex flex-wrap gap-2">
                {searchRecommendations.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm flex items-center justify-center gap-2 border p-1 px-4 rounded-md bg-black/50 cursor-pointer hover:bg-black/70 duration-200 transition-all"
                  >
                    {item}
                    <ChevronRight className="w-4 h-4" />
                  </li>
                ))}
              </ul>
              <Link
                href="/explore?categories=jobs"
                className="text-sm flex items-center justify-center w-fit underline"
              >
                Explore More <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
        <div className="py-10 flex items-center justify-center">
          <div className=" max-w-7xl">
            <HeaderText>Qualification Categories</HeaderText>
            <ul className="grid grid-cols-7 gap-4 mt-4">
              {qualificationCategories.map((category, index) => (
                <li
                  key={index}
                  className="text-skillmatch-primary-green flex gap-4 items-center p-4 py-6 rounded-md border flex-col text-sm text-center hover:shadow-md cursor-pointer duration-200 hover:scale-105 transition-all"
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
