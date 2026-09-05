import { useQuery } from "@tanstack/react-query"
import { fetchAdiminQuizDetail, fetchAdminQuizList, fetchAdminQuizTranslations } from "../../api/admin/AdminQuizApi"

export const useAdminQuizListQuery = () => {
  return useQuery({
    queryKey: ["adminQuizzes"],
    queryFn: fetchAdminQuizList,
  });
};

export const useAdminQuizDetailQuery = (placeQuizInfoId: number) => {
  return useQuery({
    queryKey: ["adminQuizzesDetail"],
    queryFn: () => fetchAdiminQuizDetail(placeQuizInfoId),
  })
}

export const useAdminQuizTransQuery = (placeQuizInfoId: number) => {
  return useQuery({
    queryKey: ["adminQuizzesTrans"],
    queryFn: () => fetchAdminQuizTranslations(placeQuizInfoId),
  })
}