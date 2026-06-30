/**
 * 지도 모델
 * @file src/models/MapModel.ts
 * @author minsun
 * @since 2024-06-20
 */

// 마커 인스턴스

// 예상 혼잡도 상태 타입
export const enum CongestionLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

// 운영상태 타입
export const enum OperationStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  BREAK_TIME = "BREAK_TIME",
}

export interface MapLocation {
  lat: number;
  lng: number;
}

// 관광지 정보
export interface PlaceMapMarker {
  id: string; // 관광지 고유 ID
  title: string; // 관광지 이름 (예: 첨성대)
  lat: number; // 위도
  lng: number; // 경도
  congestion: CongestionLevel; // 혼잡도
  status: OperationStatus; // 운영 상태
  isVisited: boolean; // 방문 여부 상태
  image?: string;
}
