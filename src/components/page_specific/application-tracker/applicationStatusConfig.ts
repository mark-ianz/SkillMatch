import {
  FileText,
  Calendar,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";

// Status IDs: 8=applied, 9=interview_scheduled, 10=selected, 11=offer_accepted, 12=offer_declined, 3=rejected
export const statusConfig = {
  "8": {
    label: "Applied",
    icon: FileText,
    color: "bg-blue-100 text-blue-700 border-blue-200",
    dotColor: "bg-blue-600",
  },
  "9": {
    label: "Interview Scheduled",
    icon: Calendar,
    color: "bg-indigo-100 text-indigo-700 border-indigo-200",
    dotColor: "bg-indigo-600",
  },
  "10": {
    label: "Selected",
    icon: AlertCircle,
    color: "bg-cyan-100 text-cyan-700 border-cyan-200",
    dotColor: "bg-cyan-600",
  },
  "11": {
    label: "Offer Accepted",
    icon: CheckCircle2,
    color: "bg-green-100 text-green-700 border-green-200",
    dotColor: "bg-green-600",
  },
  "12": {
    label: "Selection Offer Declined",
    icon: XCircle,
    color: "bg-gray-100 text-gray-700 border-gray-200",
    dotColor: "bg-gray-600",
  },
  "3": {
    label: "Rejected",
    icon: XCircle,
    color: "bg-red-100 text-red-700 border-red-200",
    dotColor: "bg-red-600",
  },
};
