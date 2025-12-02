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
      <div className="max-w-7xl mx-auto py-8 md:py-12 px-4 md:px-6">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
          {/* Logo & description */}
          <div className="flex flex-col gap-4 max-w-sm">
            <div className="flex items-center gap-2">
              <LogoOnly />
              <TextLogo />
            </div>

            <p className="text-sm text-skillmatch-light/80">
              Connecting QCU students with verified partner companies for
              meaningful on-the-job training experiences. Empowering the next
              generation of professionals through quality internship
              opportunities and industry partnerships.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
            {/* Links */}
            <div>
              <p className="font-semibold">Links</p>
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
              <p className="font-semibold">Legal</p>
              <ul className="mt-3 space-y-2 text-sm text-skillmatch-light/80">
                <li>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms-of-service">Terms of Service</Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="col-span-2 md:col-span-1 text-sm flex flex-col gap-2">
              <p className="font-semibold">Contact</p>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-skillmatch-light/80" />
                <div className="text-skillmatch-light/80">
                  673 Quirino Highway, San Bartolome, Novaliches, Quezon City, Philippines
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-skillmatch-light/80" />
                <a href="mailto:QCUniversity@quezoncity.gov.ph" className="text-skillmatch-light/80 hover:text-skillmatch-light break-all">
                  QCUniversity@quezoncity.gov.ph
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-skillmatch-light/80" />
                <a href="mailto:skillmatch.qcu@gmail.com" className="text-skillmatch-light/80 hover:text-skillmatch-light break-all">
                  skillmatch.qcu@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-skillmatch-light/80" />
                <a href="tel:280003479" className="text-skillmatch-light/80 hover:text-skillmatch-light">8806-3324, 8681-9135, 8806-3470</a>
              </div>
              <div className="mt-2 text-skillmatch-light/80 text-xs">
                For complete contact info:&nbsp;
                <a
                  className="underline hover:text-skillmatch-light break-all"
                  href="https://qcu.edu.ph/contact-us/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  qcu.edu.ph/contact-us
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-skillmatch-light/80">
            © SkillMatch 2025
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <a
              href="#top"
              className="flex items-center gap-2 text-sm text-skillmatch-light/80 hover:text-skillmatch-light transition-colors"
            >
              <ArrowUp className="w-4 h-4" /> Back to Top
            </a>

            <div className="flex items-center gap-4">
              <a
                href="#"
                aria-label="facebook"
                className="text-skillmatch-light/80 hover:text-skillmatch-light transition-colors"
              >
                <FacebookSVG className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="instagram"
                className="text-skillmatch-light/80 hover:text-skillmatch-light transition-colors"
              >
                <InstagramSVG className="w-5 h-5" />
              </a>
              <a href="#" aria-label="twitter" className="text-skillmatch-light/80 hover:text-skillmatch-light transition-colors">
                <XSVG className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
