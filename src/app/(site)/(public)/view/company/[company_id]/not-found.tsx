import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import Link from "next/link";
import { GoBackButton } from "@/components/common/button/GoBackButton";

export default function NotFound() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <Building2 className="h-24 w-24 text-muted-foreground" />
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Company Not Found</h1>
          <p className="text-muted-foreground max-w-md">
            The company profile you&apos;re looking for doesn&apos;t exist or is no longer available.
          </p>
        </div>
        <div className="flex gap-4">
          <GoBackButton />
          <Button asChild variant="default">
            <Link href="/explore/companies">Browse Companies</Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
