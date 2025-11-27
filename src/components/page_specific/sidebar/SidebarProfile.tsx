import { Card } from "@/components/ui/card";
import { cn, getCourseByAbbr, getRoleName } from "@/lib/utils";
import Image from "next/image";
import OJTShortcut from "./OJTShortcut";
import CompanyShortcut from "./CompanyShortcut";
import { Building2 } from "lucide-react";
import LoadingGeneric from "@/components/global/LoadingGeneric";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { UserService } from "@/services/user.services";
import CompanyServices from "@/services/company.services";

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

export default async function SidebarProfile() {
  const session = await getServerSession(authConfig);
  
  if (!session) {
    return <LoadingGeneric />;
  }

  const role_id = session?.user.role_id;
  const user_id = session?.user.user_id;
  const company_id = session?.user.company_id;

  if (!role_id) {
    return <LoadingGeneric />;
  }

  const isOjt = getRoleName(role_id) === "OJT";
  const isCompany = getRoleName(role_id) === "Company";
  
  // Fetch profile data from database
  let ojtProfile;
  let companyProfile;
  
  if (isOjt && user_id) {
    ojtProfile = await UserService.getOJTProfileForSidebar(user_id);
  } else if (isCompany && company_id) {
    companyProfile = await CompanyServices.getCompanyProfileForSidebar(company_id);
  }

  if (!ojtProfile && !companyProfile) {
    return <LoadingGeneric />;
  }

  const displayName = isOjt 
    ? ojtProfile?.name || "OJT User"
    : companyProfile?.company_name || "Company User";
  const profileImage = (isOjt ? ojtProfile?.ojt_image_path : companyProfile?.company_image) || null;
  const studentId = ojtProfile?.student_id || null;
  const course = getCourseByAbbr(ojtProfile?.course || "") || null;
  const location = (isOjt ? ojtProfile?.location : companyProfile?.location) || null;

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
            {profileImage ? (
              <Image
                src={profileImage}
                alt={displayName}
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
                {displayName}
              </div>
            </div>

            {studentId && (
              <p className="text-xs text-slate-600">{studentId}</p>
            )}
          </div>
          <div>
            {course && (
              <div className="text-xs text-slate-700">
                {course.replace("Bachelor of Science in ", "BS ")}
              </div>
            )}

            {location && (
              <div className="text-xs text-slate-500">{location}</div>
            )}
          </div>
        </div>
        <hr />

        {isOjt ? <OJTShortcut /> : <CompanyShortcut />}
      </div>
    </Card>
  );
}
