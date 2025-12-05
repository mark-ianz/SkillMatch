import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoSkillMatch from "@/components/global/LogoSkillMatch";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="flex justify-center mb-6">
            <LogoSkillMatch className="w-32 h-16" />
          </div>
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
              <ShieldAlert className="w-10 h-10 text-yellow-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Authentication Required
          </h1>
          
          <p className="text-gray-600 mb-8">
            You need to be signed in to access this page. Please log in to continue.
          </p>

          <div className="space-y-3">
            <Button asChild className="w-full h-12" size="lg">
              <Link href="/signin">
                Sign In
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
