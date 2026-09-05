import { useMyInfoQuery } from "../../queries/useProfileQuery";
import type { ProfileData } from "../../models/ProfileModel";
import { useAuthStore } from "../../store/useAuthStore";

export const useProfile = () => {
  const { data, isLoading } = useMyInfoQuery();
  const { member } = useAuthStore(); 

  const profileData: ProfileData | null = data
    ? {
        ...data,
        locale: member?.locale || "ko", 
      }
    : null;

  return {
    profileData,
    isLoading,
  };
};