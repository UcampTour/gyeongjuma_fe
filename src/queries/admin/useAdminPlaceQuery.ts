import { useQuery } from "@tanstack/react-query"
import { fetchAdminPlaceLIst } from "../../api/admin/AdminPlaceApi";

export const useAdminPlaceListQuery = () => {
  return useQuery({
    queryKey: ["adminPlaces"],
    queryFn: fetchAdminPlaceLIst,
  });
};