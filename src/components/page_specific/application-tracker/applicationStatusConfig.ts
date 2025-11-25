import {
  FileText,
  Calendar,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export const statusConfig = {
  APPLIED: {
    label: "Applied",
    icon: FileText,
    color: "bg-blue-100 text-blue-700 border-blue-200",
    dotColor: "bg-blue-600",
  },
  INTERVIEW_SCHEDULED: {
    label: "Interview Scheduled",
    icon: Calendar,
    color: "bg-indigo-100 text-indigo-700 border-indigo-200",
    dotColor: "bg-indigo-600",
  },
  OFFER_SENT: {
    label: "Offer Sent",
    icon: AlertCircle,
    color: "bg-orange-100 text-orange-700 border-orange-200",
    dotColor: "bg-orange-600",
  },
  OFFER_ACCEPTED: {
    label: "Offer Accepted",
    icon: CheckCircle2,
    color: "bg-green-100 text-green-700 border-green-200",
    dotColor: "bg-green-600",
  },
  OFFER_DECLINED: {
    label: "Offer Declined",
    icon: XCircle,
    color: "bg-gray-100 text-gray-700 border-gray-200",
    dotColor: "bg-gray-600",
  },
  REJECTED: {
    label: "Rejected",
    icon: XCircle,
    color: "bg-red-100 text-red-700 border-red-200",
    dotColor: "bg-red-600",
  },
};
