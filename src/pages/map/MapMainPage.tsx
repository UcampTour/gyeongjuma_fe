import { useEffect, useMemo, useRef, useState } from "react";
import { useKakaoMap } from "../../hooks/map/useKakaoMap";

import { Box, Stack } from "@mui/material";
import IconCircleButton from "../../components/common/IconCircleButton";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import CurrentLocationMarker from "../../components/map/CurrentLocationMarker";
import { dummyPlaceMarkerList } from "../../data/map/mapMarkerList"; // dummy test data
import MapCommonInfoSheet, {
  SheetState,
  type HandleInfoSheetRef,
} from "../../components/map/MapCommonInfoSheet";
import type { LoadingProps } from "../../components/common/CommonLoading";
import CommonLoading from "../../components/common/CommonLoading";
import PlaceMarker from "../../components/map/PlaceMarker";
import CommonSearchBar from "../../components/common/CommonSearchBar";
import { useTranslation } from "react-i18next";
import CommonFilterChip from "../../components/common/CommonFilterChip";
import MapBottomSheet, {
  type HandleSheetRef,
} from "../../components/map/MapBottomSheet";
import { useNavigate } from "react-router-dom";
import { PlaceFilterType, type PlaceMapMarker } from "../../models/MapModel";
import { usePlaceMarkers } from "../../hooks/queries/usePlaceMarkers";
import { nearbyPlaceList } from "../../data/map/nearbyPlaceList";
import { useCurrentLocation } from "../../hooks/useCurrentLocaton";
import MapLegend from "../../components/map/MapLegend";
import { useMapFilter } from "../../hooks/map/useMapFilter";
import { useMapNavigation } from "../../hooks/map/useMapNavigation";
import { useCommonLoading } from "../../hooks/common/useCommonLoading";
import { useMapEvent } from "../../hooks/map/useMapEvent";

/**
 * 지도 메인 페이지
 */

export interface CommonSearchForm {
  keyword: string;
}
const MapMainPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HandleSheetRef>(null);
  const infoSheetRef = useRef<HandleInfoSheetRef>(null);
  const map = useKakaoMap(mapRef);

  /* 관광지 목록 데이터 */
  const { data: placeData = [], isLoading, error } = usePlaceMarkers();

  /* 현재 위치 상태 */
  const { loading, currentLocation, updateCurrentLocation } =
    useCurrentLocation();

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

  const [selectedPlace, setSelectedPlace] = useState<PlaceMapMarker | null>(
    null,
  );
  const [isRecommendOpen, setIsRecommendOpen] = useState(true);
  const recommendInitialSnap = SheetState.DEFAULT;
  useMapEvent({
    map,
    selectedPlace,
    setSelectedPlace,
    setIsRecommendOpen,
    infoSheetRef,
    sheetRef,
  });

  useEffect(() => {
    if (!selectedFilter) return;
    sheetRef?.current?.close();
    infoSheetRef?.current?.close();
  }, [selectedFilter]);

  /**
   * 마커 클릭 이벤트 핸들러
   */
  const handleMarkerClick = (place: PlaceMapMarker) => {
    setIsRecommendOpen(false);
    setSelectedPlace(place);
    sheetRef.current?.expand(); // BottomSheet를 기본 높이로 열기
  };

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
                onClick={() =>
                  setSelectedFilter((prev) =>
                    prev === item.value ? PlaceFilterType.NONE : item.value,
                  )
                }
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
          <MapBottomSheet
            ref={sheetRef}
            open={!!selectedPlace}
            place={selectedPlace}
            onClose={() => setSelectedPlace(null)}
          />
        )}
        {/* 하단 관광지 정보 드로어 */}
        {isRecommendOpen && selectedFilter === PlaceFilterType.NONE && (
          <MapCommonInfoSheet
            ref={infoSheetRef}
            open={isRecommendOpen}
            initialSnap={recommendInitialSnap}
            onClose={() => setIsRecommendOpen(false)}
            placeList={nearbyPlaceList}
          />
        )}
      </Box>

      {/* 관광지 마커 렌더링 */}
      {!loading &&
        map &&
        placeData.map((place) => (
          <PlaceMarker
            filter={selectedFilter}
            key={place.placeId}
            place={place}
            map={map}
            onClick={handleMarkerClick}
          />
        ))}

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
