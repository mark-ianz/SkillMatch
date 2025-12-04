"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { COMPANY_ACCOUNT_STATUSES, COMPANY_STATUS_COLORS } from "@/types/admin.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Mail,
  MapPin,
  Calendar,
  Globe,
  Facebook,
  Instagram,
  Twitter,
  FileText,
} from "lucide-react";
import Image from "next/image";
import { Company } from "@/types/company.types";
import { Status } from "@/types/status.types";

interface CompanyDetailsDialogProps {
  company: Company & Status;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CompanyDetailsDialog({
  company,
  open,
  onOpenChange,
}: CompanyDetailsDialogProps) {
  const [newStatus, setNewStatus] = useState<string>(
    company.status_id.toString()
  );
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: async (statusId: number) => {
      await api.patch(`/admin/companies/${company.company_id}`, {
        status_id: statusId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-companies"] });
      toast.success("Company status updated successfully");
      onOpenChange(false);
    },
    onError: () => {
      toast.error("Failed to update company status");
    },
  });

  const handleUpdateStatus = () => {
    const statusId = parseInt(newStatus);
    if (statusId !== company.status_id) {
      updateStatusMutation.mutate(statusId);
    } else {
      onOpenChange(false);
    }
  };

  const getStatusBadge = (statusId: number) => {
    const statusConfig = COMPANY_STATUS_COLORS[statusId] || {
      bg: "bg-gray-100",
      text: "text-gray-700",
      label: "Unknown"
    };
    return (
      <Badge
        variant="outline"
        className={`${statusConfig.bg} ${statusConfig.text} border-0 text-sm`}
      >
        {statusConfig.label}
      </Badge>
    );
  };

  const documents = [
    { label: "Memorandum of Understanding", path: company.mou_path },
    { label: "Letter of Intent", path: company.loi_path },
    { label: "Company Profile", path: company.cp_path },
    { label: "Business Permit", path: company.business_permit_path },
    { label: "Mayor's Permit", path: company.mayor_permit_path },
    { label: "DTI Permit", path: company.dti_permit_path },
    { label: "BIR Certificate", path: company.bir_cert_of_registration_path },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Company Details</DialogTitle>
          <DialogDescription>
            Review and manage company registration
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Company Header */}
          <div className="flex items-start gap-4">
            {company.company_image ? (
              <Image
                src={company.company_image}
                alt={company.company_name}
                width={80}
                height={80}
                className="rounded-lg object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center">
                <Building2 className="h-10 w-10 text-muted-foreground" />
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">{company.company_name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-muted-foreground">Status:</span>
                {getStatusBadge(company.status_id)}
              </div>
              <p className="text-sm text-muted-foreground">
                {company.description}
              </p>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Contact Information
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-sm font-medium">{company.company_email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="text-sm font-medium">{company.phone_number}</p>
              </div>
              {company.telephone_number && (
                <div>
                  <p className="text-sm text-muted-foreground">Telephone</p>
                  <p className="text-sm font-medium">
                    {company.telephone_number}
                  </p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Location */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </h4>
            <p className="text-sm">
              {company.barangay}, {company.city_municipality}
            </p>
          </div>

          <Separator />

          {/* Industry & Foundation */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-3">Industry</h4>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(company.industry) ? (
                  company.industry.map((ind, idx) => (
                    <Badge key={idx} variant="secondary">
                      {ind}
                    </Badge>
                  ))
                ) : (
                  <Badge variant="secondary">{company.industry}</Badge>
                )}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date Founded
              </h4>
              <p className="text-sm">
                {format(new Date(company.date_founded), "MMMM d, yyyy")}
              </p>
            </div>
          </div>

          <Separator />

          {/* Social Media */}
          {(company.website ||
            company.facebook_page ||
            company.instagram_page ||
            company.twitter_page) && (
            <>
              <div>
                <h4 className="font-semibold mb-3">Social Media & Website</h4>
                <div className="space-y-2">
                  {company.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {company.website}
                      </a>
                    </div>
                  )}
                  {company.facebook_page && (
                    <div className="flex items-center gap-2">
                      <Facebook className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={company.facebook_page}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {company.facebook_page}
                      </a>
                    </div>
                  )}
                  {company.instagram_page && (
                    <div className="flex items-center gap-2">
                      <Instagram className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={company.instagram_page}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {company.instagram_page}
                      </a>
                    </div>
                  )}
                  {company.twitter_page && (
                    <div className="flex items-center gap-2">
                      <Twitter className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={company.twitter_page}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {company.twitter_page}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Documents */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Submitted Documents
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 border rounded"
                >
                  <span className="text-sm">{doc.label}</span>
                  {doc.path ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-7"
                      onClick={() => window.open(doc.path, "_blank")}
                    >
                      View
                    </Button>
                  ) : (
                    <Badge variant="secondary" className="text-xs">
                      Missing
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Update Status */}
          <div>
            <h4 className="font-semibold mb-3">Update Status</h4>
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COMPANY_ACCOUNT_STATUSES.map((status) => (
                  <SelectItem key={status.value} value={status.value.toString()}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleUpdateStatus}
            disabled={updateStatusMutation.isPending}
          >
            {updateStatusMutation.isPending ? "Updating..." : "Update Status"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
