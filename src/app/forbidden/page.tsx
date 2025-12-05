import Link from "next/link";
import { ShieldX } from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoSkillMatch from "@/components/global/LogoSkillMatch";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-red-50 to-gray-100">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="flex justify-center mb-6">
            <LogoSkillMatch className="w-32 h-16" />
          </div>
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <ShieldX className="w-10 h-10 text-red-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          
          <p className="text-gray-600 mb-8">
            You don&apos;t have permission to access this page. This area is restricted to authorized users only.
          </p>

          <div className="space-y-3">
            <Button asChild className="w-full h-12" size="lg">
              <Link href="/feed">
                Go to Feed
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full h-12" size="lg">
              <Link href="/">
                Go to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
