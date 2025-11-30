import { Building2 } from "lucide-react";

export function CompanyFallbackSVG() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Building2 className="w-12 h-12 text-muted-foreground/40" />
    </div>
  );
}

export function ApplicantFallbackSVG() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12 text-slate-400"
      >
        <circle cx="12" cy="8" r="3" fill="currentColor" />
        <path
          d="M4 20c0-3.3137 2.6863-6 6-6h4c3.3137 0 6 2.6863 6 6"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function GenericImageFallbackSVG() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12 text-slate-300"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
        <path
          d="M3 16l5-5 4 4 6-6 3 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
