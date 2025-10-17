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

export default useUploadResume;
