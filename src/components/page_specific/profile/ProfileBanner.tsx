import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type ProfileData = {
  name: string;
  idNumber?: string;
  course?: string;
  location?: string;
  avatarSrc?: string;
};

export default function ProfileBanner({
  data,
  className,
}: {
  data: ProfileData;
  className?: string;
}) {
  const { name, idNumber, course, location, avatarSrc } = data;

  return (
    <div className={cn("max-w-md rounded-lg overflow-hidden shadow-md bg-white", className)}>
      <div className={cn("h-12 w-full bg-skillmatch-primary-green")} />

      {/* avatar */}
      <div className="relative -mt-6 flex justify-center">
        <div className="w-20 h-20 rounded-full bg-white p-1 shadow-md">
          <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-100">
            {avatarSrc ? (
              <Image src={avatarSrc} alt={name} fill className="object-cover" />
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-slate-700"
              >
                <circle cx="12" cy="8" r="3" fill="currentColor" />
                <path
                  d="M4 20c0-3.3137 2.6863-6 6-6h4c3.3137 0 6 2.6863 6 6"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 px-6 pb-6 pt-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-lg font-semibold text-slate-800">{name}</div>
          </div>

          {idNumber ? <div className="text-sm text-slate-600">{idNumber}</div> : null}
        </div>

        {course ? <div className="text-sm text-slate-700">{course}</div> : null}

        {location ? <div className="text-sm text-slate-500">{location}</div> : null}
      </div>
    </div>
  );
}
