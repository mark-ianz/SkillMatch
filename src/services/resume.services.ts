import { api } from "@/lib/axios";

export const ResumeService = {
  upload: async (file: File) => {
    const fd = new FormData();
    fd.append("resume", file, file.name);
    const { data } = await api.post("/onboarding/resume", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },
};

export default ResumeService;
