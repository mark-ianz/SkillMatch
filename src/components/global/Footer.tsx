import React from "react";
import Link from "next/link";
import { MapPin, Mail, Phone, ArrowUp } from "lucide-react";
import FacebookSVG from "../svg/FacebookSVG";
import InstagramSVG from "../svg/InstagramSVG";
import XSVG from "../svg/XSVG";
import TextLogo from "./TextLogo";
import LogoOnly from "./LogoOnly";

export default function Footer() {
  return (
    <footer className="bg-skillmatch-secondary-dark text-skillmatch-light">
      <div className="max-w-7xl mx-auto py-12">
        <div className="flex justify-between flex-wrap gap-8">
          {/* Logo & description */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <LogoOnly />
              <TextLogo />
            </div>

            <p className="text-sm text-skillmatch-light/80 max-w-sm">
              Connecting QCU students with verified partner companies for
              meaningful on-the-job training experiences. Empowering the next
              generation of professionals through quality internship
              opportunities and industry partnerships.
            </p>
          </div>

          <div className="flex gap-10">
            {/* Links */}
            <div>
              <h4 className="font-semibold">Links</h4>
              <ul className="mt-3 space-y-2 text-sm text-skillmatch-light/80">
                <li>
                  <Link href="/">For Applicants</Link>
                </li>
                <li>
                  <Link href="/company">For Companies</Link>
                </li>
                <li>
                  <Link href="/faqs">FAQs</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold">Legal</h4>
              <ul className="mt-3 space-y-2 text-sm text-skillmatch-light/80">
                <li>
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms">Terms of Service</Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="max-w-[300px]">
              <h4 className="font-semibold">Contact</h4>
              <div className="mt-3 text-sm text-skillmatch-light/80">
                For complete and updated contact information, please
                visit:&nbsp;
                <a
                  className="underline"
                  href="https://qcu.edu.ph/contact-us/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://qcu.edu.ph/contact-us/
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-skillmatch-light/80">
            © SkillMatch 2025
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#top"
              className="flex items-center gap-2 text-sm text-skillmatch-light/80"
            >
              <ArrowUp className="w-4 h-4" /> Back to Top
            </a>

            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="github"
                className="text-skillmatch-light/80"
              >
                <FacebookSVG className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="linkedin"
                className="text-skillmatch-light/80"
              >
                <InstagramSVG className="w-5 h-5" />
              </a>
              <a href="#" aria-label="twitter" className="">
                <XSVG className="text-skillmatch-light/80 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
