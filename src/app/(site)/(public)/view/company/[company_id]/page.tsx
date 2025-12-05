import MainLayout from "@/components/layout/MainLayout";
import CompanyServices from "@/services/company.services";
import { AnimatedCompanyContent } from "@/components/page_specific/explore/company/AnimatedCompanyContent";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { getRoleName } from "@/lib/utils";
import { notFound } from "next/navigation";

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
  // Show 404 if company doesn't exist or has no active job posts
  if (!company_profile) {
    notFound();
  }

  return (
    <MainLayout className="items-center" wrapperClassName="w-full">
      <AnimatedCompanyContent
        company_profile={company_profile}
        job_posted={job_posted}
      />
    </MainLayout>
  );
}
