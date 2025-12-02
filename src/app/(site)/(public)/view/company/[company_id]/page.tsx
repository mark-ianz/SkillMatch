import MainLayout from "@/components/layout/MainLayout";
import CompanyServices from "@/services/company.services";
import { AnimatedCompanyContent } from "@/components/page_specific/explore/company/AnimatedCompanyContent";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { getRoleName } from "@/lib/utils";

export default async function CompanyProfilePage({
  params,
}: {
  params: Promise<{ company_id: string }>;
}) {
  const { company_id } = await params;
  
  // Get server-side session
  const session = await getServerSession(authConfig);
  const user_id = session?.user?.user_id;
  const role_name = getRoleName(session?.user?.role_id);
  
  const { company_profile, job_posted } =
    await CompanyServices.getCompanyWithJobs(company_id, user_id, role_name);

  if (!company_profile) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center">
          <p className="text-destructive">
            Failed to load company profile. Please try again later.
          </p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout className="items-center">
      <AnimatedCompanyContent
        company_profile={company_profile}
        job_posted={job_posted}
      />
    </MainLayout>
  );
}
