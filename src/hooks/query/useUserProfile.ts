import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { User } from "@/types/user.types";
import { ApplicantProfile } from "@/types/applicant_profile.types";

export type UserProfileData = User & ApplicantProfile;

// Query: Get user profile data (combined user + Applicant profile)
export function useUserProfile(user_id?: number) {
  return useQuery({
    queryKey: ["user-profile", user_id],
    queryFn: async () => {
      const { data } = await api.get<{ user: UserProfileData }>(`/user/${user_id}`);
      return data.user;
    },
    enabled: !!user_id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
