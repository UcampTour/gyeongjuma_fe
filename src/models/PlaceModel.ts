import { CongestionLevel, OperationStatus } from "./MapModel";

/* -------- Interface -------- */

/**
 * API 서버로부터 받아오는 관광지 데이터 인터페이스
 */
export interface PlaceListBase {
  id: number; // 관광지 고유 ID
  name: string; // 관광지 이름 (예: 첨성대)
  description: string; // 관광지 간단 설명
  category: string; // 관광지 카테고리(추후 ENUM 변경)
  rating: number; // 관광지 평점
  reviewCount: number; // 평점 참여자 수
  likes: number; // 좋아요 수
  lat: number; // 위도
  lng: number; // 경도
  congestion: CongestionLevel; // 혼잡도
  operationStatus: OperationStatus; // 운영 상태
  isVisited: boolean; // 방문 여부 상태
  imageUrl: string  // 대표 이미지
}

/**
 * 실제 화면 렌더링용 데이터 인터페이스
 */
export interface PlaceListItem extends PlaceListBase {
  distance: number | null; // 내 위치로부터 거리
}

/* -------- Constants -------- */

/**
 * 혼잡도 & 운영상태 Style Constants
 */
export const statusBadgeStyles: Record<CongestionLevel | OperationStatus, { label: string; bgColor: string }> = {
  [CongestionLevel.HIGH]: { label: "혼잡", bgColor: "#C05656" }, 
  [CongestionLevel.MEDIUM]: { label: "보통", bgColor: "#E0A928" },
  [CongestionLevel.LOW]: { label: "여유", bgColor: "#3F8E72" },
  [OperationStatus.CLOSED]: { label: "종료", bgColor: "#757575" },
  [OperationStatus.BREAK_TIME]: { label: "준비중", bgColor: "#E2723B" },
  [OperationStatus.OPEN]: { label: "영업중", bgColor: "#3F8E72" }, 
};

/* -------- Enum -------- */

/**
 * 관광지 카테고리 ENUM
 */
export const enum PlaceCategory {
  ALL = "ALL",
  TOURIST = "TOURIST",
  HISTORIC = "HISTORIC",
  OTHER = "OTHER",
}