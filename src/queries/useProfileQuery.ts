import { useQuery } from "@tanstack/react-query"
import { fetchMyInfo } from "../api/profileApi"

export const useMyInfoQuery = () => {
  return useQuery({
    queryKey: ["myinfo"],
    queryFn: fetchMyInfo,
  });
};