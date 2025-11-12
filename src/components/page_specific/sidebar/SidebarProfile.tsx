"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ambatublow from "@/images/ambatublow.jpg";
import OJTShortcut from "./OJTShortcut";
import CompanyShortcut from "./CompanyShortcut";
import { Building2 } from "lucide-react";

const image_url = ambatublow.src;

const OJT_DUMMY = {
  name: "Ooh Ambatublow",
  idNumber: "23-6967",
  course: "Bachelor of Science in Information Technology",
  location: "Novaliches, Quezon City",
  avatarSrc: image_url,
};

const COMPANY_DUMMY = {
  name: "Tech Solutions Inc.",
  location: "Makati City, Metro Manila",
  avatarSrc: null,
};

type ProfileData = {
  name: string;
  idNumber?: string;
  course?: string;
  location: string;
  avatarSrc: string | null;
};

function EmptyProfileImage({ isOjt }: { isOjt: boolean }) {
  if (isOjt) {
    return (
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
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Building2 className="w-12 h-12 text-muted-foreground/40" />
    </div>
  );
}

export default function SidebarProfile({ type }: { type: "ojt" | "company" }) {
  const isOjt = type === "ojt";
  const data: ProfileData = isOjt ? OJT_DUMMY : COMPANY_DUMMY;

  return (
    <Card className="pt-0 border-0">
      <div
        className={cn(
          "h-12 w-full bg-skillmatch-primary-blue rounded-t-lg",
          isOjt && "bg-skillmatch-primary-green"
        )}
      />

      {/* <ProfileBanner data={dummy_profile} /> */}
      <div className="relative -mt-12 flex justify-center">
        <div className="w-20 h-20 rounded-full bg-white p-1 shadow-md">
          <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-100">
            {data.avatarSrc ? (
              <Image
                src={data.avatarSrc}
                alt={data.name}
                fill
                className="object-cover"
              />
            ) : (
              <EmptyProfileImage isOjt={isOjt} />
            )}
          </div>
        </div>
      </div>

      <div className="px-6 space-y-4">
        <div className="flex flex-col gap-1 pt-2">
          <div className="flex items-center justify-between flex-wrap">
            <div>
              <div className="text-lg font-semibold text-slate-800">
                {data.name}
              </div>
            </div>

            {data.idNumber ? (
              <p className="text-xs text-slate-600">{data.idNumber}</p>
            ) : null}
          </div>
          <div>
            {data.course ? (
              <div className="text-xs text-slate-700">
                {data.course.replace("Bachelor of Science in ", "BS ")}
              </div>
            ) : null}

            {data.location ? (
              <div className="text-xs text-slate-500">{data.location}</div>
            ) : null}
          </div>
        </div>
        <hr />

        {isOjt ? <OJTShortcut /> : <CompanyShortcut />}
      </div>
    </Card>
  );
}
