import { Card } from "@/components/ui/card";
import { cn, getCourseByAbbr, getRoleName } from "@/lib/utils";
import Image from "next/image";
import OJTShortcut from "./OJTShortcut";
import CompanyShortcut from "./CompanyShortcut";
import LoadingGeneric from "@/components/global/LoadingGeneric";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { UserService } from "@/services/user.services";
import CompanyServices from "@/services/company.services";
import { CompanyFallbackSVG, OJTFallbackSVG } from "@/components/common/fallback/ImageFallback";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";

export default async function SidebarProfile() {
  const session = await getServerSession(authConfig);
  
  // Show CTA for non-logged-in users
  if (!session) {
    return (
      <Card className="p-6 border-2 border-dashed">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-skillmatch-primary-blue to-skillmatch-primary-green mx-auto flex items-center justify-center">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Join SkillMatch</h3>
            <p className="text-sm text-muted-foreground">
              Create an account to explore opportunities, connect with companies, and manage your career journey.
            </p>
          </div>
          <div className="space-y-2">
            <Button asChild className="w-full">
              <Link href="/signin">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/signup">
                <UserPlus className="h-4 w-4 mr-2" />
                Create Account
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    );
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
            ) : isOjt ? (
              <OJTFallbackSVG />
            ) : (
              <CompanyFallbackSVG />
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
