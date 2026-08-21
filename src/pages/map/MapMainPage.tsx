import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useKakaoMap } from "../../hooks/map/useKakaoMap";

import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CommonFilterChip from "../../components/common/CommonFilterChip";
import CommonLoading from "../../components/common/CommonLoading";
import CommonSearchBar from "../../components/common/CommonSearchBar";
import IconCircleButton from "../../components/common/IconCircleButton";
import CurrentLocationMarker from "../../components/map/CurrentLocationMarker";
import MapLegend from "../../components/map/MapLegend";
import NearbyPlaceSheet, {
  type HandleInfoSheetRef,
} from "../../components/map/NearbyPlaceSheet.tsx";
import PlaceMarker from "../../components/map/PlaceMarker";
import PlaceSummarySheet, {
  type HandleSheetRef,
} from "../../components/map/PlaceSummarySheet";
import { useCommonLoading } from "../../hooks/common/useCommonLoading";
import { useMapEvent } from "../../hooks/map/useMapEvent";
import { useMapFilter } from "../../hooks/map/useMapFilter";
import { useMapNavigation } from "../../hooks/map/useMapNavigation";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import { PlaceFilterType } from "../../models/MapModel";
import type { PlaceListBase } from "../../models/PlaceModel";
import { useNearbyPlaceListQuery } from "../../queries/useNearbyPlaceListQuery";
import { usePlaceListQuery } from "../../queries/usePlaceListQuery";
import { useWeatherQuery } from "../../queries/useWeatherQuery.ts";

/**
 * 지도 메인 페이지
 */
export interface Weather {
  temperature: number;
  feelsLike: number;
  humidity: number;
  weather: string;
  description: string;
  icon: string;
  windSpeed: number;
}

export interface CommonSearchForm {
  keyword: string;
}
const MapMainPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HandleSheetRef>(null);
  const infoSheetRef = useRef<HandleInfoSheetRef>(null);
  const { map, clusterer } = useKakaoMap(mapRef);
  /* 현재 위치 상태 */
  const {
    loading,
    currentLocation,
    updateCurrentLocation,
    getCurrentAddress,
    startWatchingLocation,
    stopWatchingLocation,
  } = useCurrentLocation();

  /* 관광지 목록 데이터 */
  const { data: placeData = [], isFetching } = usePlaceListQuery({
    latitude: 0,
    longitude: 0,
  });

  const { data: nearbyPlaceData = [] } = useNearbyPlaceListQuery({
    latitude: currentLocation?.lat ?? 0,
    longitude: currentLocation?.lng ?? 0,
    sort: "distance",
  });

  /* 지도 네비게이션 */
  const { moveToGyeongjuCenter, moveToCurrentLocation, locationLoading } =
    useMapNavigation({ map });

  /* 필터링 */
  const {
    filterOptions,
    selectedFilter,
    setSelectedFilter,
    getLegendConfig,
    filterLoading,
  } = useMapFilter(placeData);

  const [selectedPlace, setSelectedPlace] = useState<PlaceListBase | null>(
    null,
  );
  const [isRecommendOpen, setIsRecommendOpen] = useState(true);

  useMapEvent({
    map,
    selectedPlace,
    setSelectedPlace,
    setIsRecommendOpen,
    infoSheetRef,
    sheetRef,
  });
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);

  useEffect(() => {
    if (!map) return; // 지도 생성 완료 후에만 실행

    /**
     * 최초 위치
     */
    const initLocation = async () => {
      const location = await updateCurrentLocation();

      if (location) {
        const address = await getCurrentAddress(location.lat, location.lng);

        setCurrentAddress(address);
      }

      // 최초 위치 조회가 끝난 후 실시간 추적 시작
      startWatchingLocation();
    };

    initLocation();

    return () => {
      stopWatchingLocation();
    };
  }, [
    map,
    updateCurrentLocation,
    getCurrentAddress,
    startWatchingLocation,
    stopWatchingLocation,
  ]);

  const { data: weather } = useWeatherQuery({
    latitude: currentLocation?.lat,
    longitude: currentLocation?.lng,
  });

  /**
   * 마커 클릭 이벤트 핸들러
   */
  const handleMarkerClick = useCallback((place: PlaceListBase) => {
    setIsRecommendOpen(false);
    setSelectedPlace(place);
    sheetRef.current?.expand();
  }, []);

  const legendConfig = useMemo(
    () => getLegendConfig(selectedFilter, placeData),
    [selectedFilter, placeData],
  );

  const handleGoToFilterList = () => {
    navigate("/explore/filter", { state: { filter: selectedFilter } });
  };

  /**
   * 현재 위치로 이동
   */
  const handleGoToCurrentLocation = async () => {
    sheetRef.current?.close();
    if (!map) return;

    const location = await updateCurrentLocation();
    if (!location) return;

    moveToCurrentLocation(location, "현재 위치로 이동 중");
  };

  const commonLoading = useCommonLoading(locationLoading, filterLoading);

  // 1. 컴포넌트 내부 상단에 마커 리스트 메모이제이션 추가
  const renderedMarkers = useMemo(() => {
    if (isFetching || !map || !placeData) return null;

    return placeData.map((place) => (
      <PlaceMarker
        filter={selectedFilter}
        key={place.placeId}
        place={place}
        map={map}
        clusterer={clusterer}
        onClick={handleMarkerClick}
      />
    ));
  }, [
    placeData,
    map,
    clusterer,
    selectedFilter,
    isFetching,
    handleMarkerClick,
  ]); // 의존성 배열 관리

  return (
    <>
      <Box
        style={{
          position: "relative",
          width: "100%",
          height: "calc(100vh - 80px)",
        }}
      >
        {/* 지도 렌더링 */}
        <div
          ref={mapRef}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
        {/* 검색바 */}
        <Box
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            right: 16,
            zIndex: 20,
          }}
        >
          {/* 검색창 페이지로 이동 */}
          <CommonSearchBar
            placeholder={t("map:search.placeholder")}
            mode="navigate"
            onClick={() => navigate("/explore/search")}
          />
          {/* 필터링 옵션 */}
          <Stack direction="row" spacing={1}>
            {filterOptions.map((item) => (
              <CommonFilterChip
                key={item.value}
                label={item.label}
                selected={selectedFilter === item.value}
                onClick={() => {
                  setSelectedFilter((prev) =>
                    prev === item.value ? PlaceFilterType.NONE : item.value,
                  );
                  if (!selectedFilter) {
                    sheetRef?.current?.close();
                    infoSheetRef?.current?.close();
                  }
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* 우측 상단 버튼 */}
        <Stack
          spacing={1}
          sx={{
            position: "absolute",
            right: 16,
            top: 70, // 하단에서 32px
            zIndex: 20,
            alignItems: "flex-end",
          }}
        >
          <IconCircleButton
            icon={<LocationOnIcon />}
            ariaLabel="경주 중심지로 이동"
            onClick={moveToGyeongjuCenter}
          />

          <IconCircleButton
            icon={<GpsFixedIcon />}
            ariaLabel="현재 위치로 이동"
            onClick={handleGoToCurrentLocation}
          />
        </Stack>

        <Stack
          spacing={1}
          sx={{
            position: "absolute",
            width: "100%",
            right: 16,
            bottom: 8, // 하단에서 32px
            zIndex: 20,
            alignItems: "flex-end",
          }}
        >
          {/* 우측 하단 혼잡도 범례 */}
          {legendConfig && (
            <MapLegend config={legendConfig} onClick={handleGoToFilterList} />
          )}
        </Stack>

        {/* 하단 관광지 정보 드로어 */}
        {selectedPlace && (
          // 특정 관광지 정보 시트
          <PlaceSummarySheet
            ref={sheetRef}
            open={!!selectedPlace}
            place={selectedPlace}
            onClose={() => setSelectedPlace(null)}
          />
        )}
        {/* 하단 관광지 정보 드로어 */}
        {isRecommendOpen && selectedFilter === PlaceFilterType.NONE && (
          <NearbyPlaceSheet
            ref={infoSheetRef}
            open={isRecommendOpen}
            onClose={() => setIsRecommendOpen(false)}
            placeList={nearbyPlaceData}
            currentAddress={currentAddress}
            weather={weather}
          />
        )}
      </Box>

      {/* 관광지 마커 렌더링 */}
      {renderedMarkers}

      {/* 현재 위치 마커 렌더링 */}
      {currentLocation && (
        <CurrentLocationMarker
          map={map}
          lat={currentLocation.lat}
          lng={currentLocation.lng}
        />
      )}
      {/* 로딩창 */}
      <CommonLoading loading={commonLoading} />
    </>
  );
};

export default MapMainPage;
