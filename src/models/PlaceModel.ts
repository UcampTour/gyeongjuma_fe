import { CongestionLevel, OperationStatus } from "./commonModel";

/* -------- Interface -------- */

/**
 * API 서버로부터 받아오는 관광지 데이터 인터페이스
 */

/**
 * 관광지 목록 Request
 */
export interface PlaceSearchParams {
  search?: string;
  sort?: string; // 기본값 "distance"
  latitude: number; // 필수
  longitude: number; // 필수
}
/**
 * 관광지 목록 Response
 */
export interface PlaceListBase {
  placeId: number; // 관광지 고유 ID
  placeName: string; // 관광지 이름 (예: 첨성대)
  description: string; // 관광지 간단 설명
  category: string; // 관광지 카테고리 (추후 ENUM 변경)
  rating: number; // 관광지 평점
  reviewCount: number; // 평점 참여자 수
  likes: number; // 좋아요 수
  lat: number; // 위도
  lng: number; // 경도
  congestion: CongestionLevel; // 혼잡도
  operationStatus: OperationStatus; // 운영 상태
  isVisited: boolean; // 방문 여부 상태
  imageUrl: string; // 대표 이미지
  distance: number; // 내 위치로부터의 거리 (Integer -> number)
}

/* -------- Constants -------- */

/**
 * 혼잡도 & 운영상태 Style Constants
 */
export const statusBadgeStyles: Record<
  CongestionLevel | OperationStatus,
  { label: string; bgColor: string }
> = {
  [CongestionLevel.HIGH]: { label: "혼잡", bgColor: "#C05656" },
  [CongestionLevel.MEDIUM]: { label: "보통", bgColor: "#E0A928" },
  [CongestionLevel.LOW]: { label: "여유", bgColor: "#3F8E72" },
  [CongestionLevel.NONE]: { label: "정보없음", bgColor: "#d8d8d8" },
  [OperationStatus.CLOSED]: { label: "종료", bgColor: "#757575" },
  [OperationStatus.BREAK_TIME]: { label: "준비중", bgColor: "#E2723B" },
  [OperationStatus.OPEN]: { label: "영업중", bgColor: "#3F8E72" },
};

/* -------- ENUM -------- */

/**
 * 관광지 카테고리 ENUM
 */
export const enum PlaceCategory {
  ALL = "ALL",
  TOURIST = "TOURIST",
  HISTORIC = "HISTORIC",
  OTHER = "OTHER",
}

/**
 * 관광지 정렬 타입 Enum
 */
export enum PlaceSortType {
  DEFAULT = "DEFAULT",
  LIKES = "LIKES",
  DISTANCE = "DISTANCE",
}

// types/place.ts (타입 정의는 프로젝트 구조에 맞게 위치시켜 주세요)
export interface PlaceSearchResponse {
  id: number;
  name: string;
  // 백엔드 PlaceSearchResponse의 필드들을 여기에 정의해주세요.
  latitude: number;
  longitude: number;
  address?: string;
}

export interface PlaceSearchParams {
  search?: string;
  sort?: string; // 기본값 "distance"
  latitude: number; // 필수
  longitude: number; // 필수
}
