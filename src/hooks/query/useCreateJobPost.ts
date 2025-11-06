import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { JobPostingFormData } from "@/schema/job-posting.schema";
import { toast } from "sonner";

export function useCreateJobPost() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (
      payload: JobPostingFormData & { company_id: number | null }
    ) => {
      const { data } = await api.post("/company/job-post/create", payload);
      return data.job_post;
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Job posted successfully");
      // Invalidate feed so new post appears
      qc.invalidateQueries({ queryKey: ["feed"] });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to post job");
    },
  });
}

export default useCreateJobPost;
