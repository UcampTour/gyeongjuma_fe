import { useQuery } from "@tanstack/react-query";
import { getCourseList } from "../api/placeApi";
import type { CourseListResponse } from "../models/CourseModel";

export const useCourseListQuery = () => {
  return useQuery<CourseListResponse>({
    queryKey: ["courseList"],
    queryFn: getCourseList,

    // 5분 동안 fresh 상태
    staleTime: 1000 * 60 * 5,

    // 사용하지 않아도 30분 동안 캐시 유지
    gcTime: 1000 * 60 * 30,

    refetchOnWindowFocus: false,
    retry: 1,
  });
};
