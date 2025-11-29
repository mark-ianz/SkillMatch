import type { Metadata } from "next";
import { Geist, Geist_Mono, Sansation } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import AppProviders from "@/components/providers/AppProviders";

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  preload: false,
});

const sansation = Sansation({
  variable: "--font-sansation",
  subsets: ["latin"],
  weight: ["400", "700"],
  adjustFontFallback: false,
  fallback: ["system-ui", "arial"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SkillMatch - Connect QCU Students with Top Companies",
    template: "%s | SkillMatch",
  },
  description:
    "SkillMatch connects Quezon City University students with top companies for internships and OJT opportunities. Find your perfect career match today.",
  keywords: [
    "QCU",
    "Quezon City University",
    "internship",
    "OJT",
    "job matching",
    "student jobs",
    "career opportunities",
  ],
  authors: [{ name: "SkillMatch Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "SkillMatch",
    title: "SkillMatch - Connect QCU Students with Top Companies",
    description:
      "Connect with top companies partnered with Quezon City University. Find internships and OJT opportunities that match your skills.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillMatch - QCU Student Job Platform",
    description: "Find your perfect internship or OJT opportunity at QCU partner companies.",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentPath
  const shared_protected_routes = ["/notifications", "/settings"];
  const ojt_protected_routes = ["/application-tracker"];
  const session = await getServerSession(authConfig);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sansation.variable} antialiased overflow-y-scroll`}
      >
        <AppProviders session={session}>{children}</AppProviders>
        <Toaster />
      </body>
    </html>
  );
}
