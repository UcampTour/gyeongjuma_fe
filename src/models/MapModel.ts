/**
 * 지도 모델
 * @file src/models/mapModel.ts
 * @author minsun
 * @since 2026-06-20
 */

import type { CongestionLevel, OperationStatus } from "./commonModel";

// 마커 인스턴스

export interface MapLocation {
  lat: number;
  lng: number;
  address?: string;
}

// 관광지 요약 정보 SUMMARY
export interface PlaceSummary {
  placeId: number; // 장소 ID
  placeName: string; // 장소 이름
  mapX: number; // 경도 (Longitude)
  mapY: number; // 위도 (Latitude)
  visitYn: boolean; // 방문 인증 여부
  status: boolean; // 운영 상태
  address: string; // 주소
  parkingYn: boolean; // 주차 가능 여부
  distance: number; // 거리
  imageUrl: string; // 이미지 URL
  congestion: CongestionLevel; // 예측 혼잡도
}

// 필터링 종류
export enum PlaceFilterType {
  NONE = "NONE",
  CONGESTION = "CONGESTION",
  OPERATING = "OPERATING",
  UNVISITED = "UNVISITED",
}
