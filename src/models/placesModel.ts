//관광지 리스트

import type { CongestionLevel, OperationStatus } from "./MapModel";

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

export interface PlaceListItem extends PlaceListBase {
  distance: number | null; 
}
