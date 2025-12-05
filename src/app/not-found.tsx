import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoSkillMatch from "@/components/global/LogoSkillMatch";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="flex justify-center mb-6">
            <LogoSkillMatch className="w-32 h-16" />
          </div>
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <FileQuestion className="w-10 h-10 text-red-600" />
            </div>
          </div>

          <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Page Not Found
          </h2>

          <p className="text-gray-600 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Please check the URL or navigate back to a safe place.
          </p>

          <Button asChild className="w-full h-12" size="lg">
            <Link href="/">Go to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
