import { useQuery } from "@tanstack/react-query"
import { fetchMyInfo } from "../api/profileApi"
import { useAuthStore } from "../store/useAuthStore";

export const useMyInfoQuery = () => {
  const { member } = useAuthStore();
  const locale = member?.locale ?? "ko";
  const difficulty = member?.difficulty ?? "NORMAL";
  const nickname = member?.nickname;

  return useQuery({
    queryKey: ["myinfo", locale, difficulty, nickname],
    queryFn: fetchMyInfo,
  });
};