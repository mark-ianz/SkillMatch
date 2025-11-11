import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

type UploadResult = { path: string };

export function useUploadResume(user_id: number) {
  return useMutation({
    mutationKey: ["upload-resume"],
    mutationFn: async (file: File) => {
      const fd = new FormData();
      fd.append("resume", file, file.name);
      const { data } = await api.post(`/ojt/resume/${user_id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data as UploadResult;
    },
  });
}

export function useUploadCompanyDocument(company_id: string | undefined | null, type?: string) {
  return useMutation({
    mutationKey: ["upload-company-document", type],
    mutationFn: async (file: File) => {
      if (!company_id) throw new Error("Missing company_id");
      const fd = new FormData();
      fd.append("file", file, file.name);
      const { data } = await api.post(
        `/company/documents/${company_id}`,
        fd,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return data as UploadResult;
    },
  });
}

export function useUploadCompanyImage(company_id: string | undefined | null) {
  return useMutation({
    mutationKey: ["upload-company-image"],
    mutationFn: async (file: File) => {
      if (!company_id) throw new Error("Missing company_id");
      const fd = new FormData();
      fd.append("file", file, file.name);
      const { data } = await api.post(
        `/company/image/${company_id}`,
        fd,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return data as UploadResult;
    },
  });
}