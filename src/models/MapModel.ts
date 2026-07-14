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
}

// 관광지 마커 목록
export interface PlaceMapMarker {
  placeId: number; // 관광지 고유 ID
  placeName: string; // 관광지 이름 (예: 경주 감은사지)
  add1: string; // 전체 주소 (도로명/지번)
  add2: string; // 상세 주소 번지
  tel: string; // 전화번호
  contentTypeId: number; // 관광 타입 ID (예: 12-관광지, 14-문화시설 등)
  mapX: number; // 경도 (Longitude)
  mapY: number; // 위도 (Latitude)
  firstImage: string; // 대표 이미지 URL
  lclsSystm1: string; // 대분류 시스템 코드
  lclsSystm2: string; // 중분류 시스템 코드
  lclsSystm3: string; // 소분류 시스템 코드
  radiusMeters: string; // 반경 거리 (string형)

  // 예상
  congestion: CongestionLevel; // 혼잡도 상태 (LOW, MEDIUM, HIGH)
  status: OperationStatus; // 운영 상태 (OPEN, BREAK_TIME, CLOSED)
  isVisited: boolean; // 유저 방문 여부 상태
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

export interface NearByPlaceInfo {
  id: string; // 관광지 고유 ID
  title: string;
  distance: number; // 단위: m
  isOpen: boolean;
  congestion: CongestionLevel;
  image: string;
}
