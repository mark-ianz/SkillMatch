import { api } from "@/lib/axios";
import useSignupStore from "@/store/SignupStore";
import { useMutation } from "@tanstack/react-query";

type UploadResult = { path: string };

export function useUploadResume() {
  const nextStep = useSignupStore.getState().nextStep;
  const setResumePath = useSignupStore.getState().setResumePath;
  
  return useMutation<UploadResult, Error, File>({
    mutationKey: ["upload-resume"],
    mutationFn: async (file: File) => {
      const fd = new FormData();
      fd.append("resume", file, file.name);
      const { data } = await api.post("/ojt/resume", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data as UploadResult;
    },
    onSuccess: (data) => {
      if (data?.path) {
        setResumePath(data.path);
      }
      nextStep();
    },
  });
}

export default useUploadResume;
