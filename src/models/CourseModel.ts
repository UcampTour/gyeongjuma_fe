import type { CourseType } from "../pages/course/courseConstants";

export interface CourseListItem {
  courseId: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  type: CourseType;
  placeCnt: number;
}

export interface CourseListResponse {
  totalCnt: number;
  courses: CourseListItem[];
}

export interface CoursePlace {
  courseSeqNo: number;
  placeId: number;
  placeName: string;
  image: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface CourseDetail {
  courseId: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  type: CourseType;
  placeCnt: number;
  courseList: CoursePlace[];
}
