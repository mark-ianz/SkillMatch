import { Input } from "@/components/ui/input";
import {
  ChevronRight,
  CirclePercent,
  Computer,
  Cpu,
  GraduationCap,
  HandCoins,
  HardHat,
  PenTool,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { getImageProps } from "next/image";
import HeaderText from "../_components/global/HeaderText";

export default function LandingPage() {
  const searchRecommendations = [
    "web-developer",
    "frontend-developer",
    "backend-developer",
    "fullstack-developer",
    "designer",
    "product-manager",
  ];

  const qualificationCategories = [
    {
      name: "Technology & IT",
      svg: <Cpu className="w-10 h-10" />,
    },
    // Software Development
    {
      name: "Software Development",
      svg: <Computer className="w-10 h-10" />,
    },
    // Business & Management
    {
      name: "Business & Management",
      svg: <HandCoins className="w-10 h-10" />,
    },
    // Creative & Design
    {
      name: "Creative & Design",
      svg: <PenTool className="w-10 h-10" />,
    },
    // Sales & Marketing
    {
      name: "Sales & Marketing",
      svg: <CirclePercent className="w-10 h-10" />,
    },
    // Education & Training
    {
      name: "Education & Training",
      svg: <GraduationCap className="w-10 h-10" />,
    },
    // Engineering & Architecture
    {
      name: "Engineering & Architecture",
      svg: <HardHat className="w-10 h-10" />,
    },
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
  } = getImageProps({ alt: 'hero-section', width: 1920, height: 1080, src: '/hero_section_image.png' })
  const backgroundImage = getBackgroundImage(srcSet)

  return (
    <main>
      <section id="hero" className="h-[calc(100vh-5rem)]">
        <div className="text-white bg-orange-50 py-10 px-96 h-[calc(100vh-25rem)] flex items-center bg-no-repeat bg-cover bg-center" style={{ backgroundImage }}>
          <div className="w-[600px] flex flex-col">
            <div>
              <p className="text-6xl font-sansation">Kickstart your career.</p>
              <p className="font-sansation text-6xl">Carve your path.</p>
            </div>
            <div className="flex flex-col gap-4">
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
        <div className="px-96 py-10">
          <HeaderText>Qualification Categories</HeaderText>
          <ul className="grid grid-cols-7 gap-4 mt-4">
            {qualificationCategories.map((category, index) => (
              <li
                key={index}
                className="aspect-square flex gap-4 items-center p-4 py-6 rounded-md border flex-col text-sm text-center hover:shadow-md cursor-pointer duration-200 hover:scale-105 transition-all"
              >
                {category.svg}
                <span className="font-sansation items-end">
                  {category.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
