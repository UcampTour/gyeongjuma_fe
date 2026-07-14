import { useEffect, useMemo, useState, useTransition } from "react";
import { PlaceFilterType, type PlaceMapMarker } from "../../models/MapModel";
import type { MapLegendConfig } from "../../components/map/MapLegend";
import { CongestionLevel, OperationStatus } from "../../models/commonModel";
import type { LoadingProps } from "../../components/common/CommonLoading";
import { useTranslation } from "react-i18next";

export const useMapFilter = (places: PlaceMapMarker[]) => {
  const { t } = useTranslation();
  const [filterLoading, setFilterLoading] = useState<LoadingProps | undefined>(
    undefined,
  );
  const [selectedFilter, setSelectedFilter] = useState<PlaceFilterType>(
    PlaceFilterType.NONE,
  );

  useEffect(() => {
    if (selectedFilter !== PlaceFilterType.NONE) {
      setFilterLoading({
        isLoading: true,
        loadingMsg: "관광지 정보 가져오는 중",
      });
    }

    setTimeout(() => {
      setFilterLoading({
        isLoading: false,
      });
    }, 800);
  }, [selectedFilter]);

  const filteredPlaces = useMemo(() => {
    switch (selectedFilter) {
      case PlaceFilterType.CONGESTION:
        return places.filter((place) => place.congestion !== "LOW");

      case PlaceFilterType.OPERATING:
        return places.filter((place) => place.status === "OPEN");

      case PlaceFilterType.UNVISITED:
        return places.filter((place) => !place.isVisited);

      default:
        return places;
    }
  }, [places, selectedFilter]);

  const getLegendConfig = (
    filter: PlaceFilterType,
    places: PlaceMapMarker[],
  ): MapLegendConfig | null => {
    switch (filter) {
      case PlaceFilterType.CONGESTION:
        return {
          title: "예상 혼잡도",
          items: [
            {
              label: "여유",
              value: CongestionLevel.LOW,
              color: "#4CAF50",
              count: places.filter((p) => p.congestion === CongestionLevel.LOW)
                .length,
            },
            {
              label: "보통",
              value: CongestionLevel.MEDIUM,
              color: "#FFC107",
              count: places.filter(
                (p) => p.congestion === CongestionLevel.MEDIUM,
              ).length,
            },
            {
              label: "혼잡",
              value: CongestionLevel.HIGH,
              color: "#F44336",
              count: places.filter((p) => p.congestion === CongestionLevel.HIGH)
                .length,
            },
            {
              label: "정보없음",
              value: CongestionLevel.NONE,
              color: "#dfdfdf",
              count: places.filter((p) => p.congestion === CongestionLevel.NONE)
                .length,
            },
          ],
        };

      case PlaceFilterType.OPERATING:
        return {
          title: "운영 상태",
          items: [
            {
              label: "운영중",
              value: OperationStatus.OPEN,
              color: "#4CAF50",
              count: places.filter((p) => p.status === "OPEN").length,
            },
            {
              label: "운영종료",
              value: OperationStatus.CLOSED,
              color: "#999",
              count: places.filter((p) => p.status === "CLOSED").length,
            },
            {
              label: "브레이크 타임",
              value: OperationStatus.BREAK_TIME,
              color: "#ffb46d",
              count: places.filter((p) => p.status === "BREAK_TIME").length,
            },
          ],
        };

      case PlaceFilterType.UNVISITED:
        return {
          title: "방문 여부",
          items: [
            {
              label: "미방문",
              value: "UNVISITED",
              color: "#A73831",
              count: places.filter((p) => !p.isVisited).length,
            },
            {
              label: "방문 완료",
              value: "VISITIED",
              color: "#29405F",
              count: places.filter((p) => p.isVisited).length,
            },
          ],
        };

      default:
        return null;
    }
  };

  const getFilteredList = () => {
    switch (selectedFilter) {
      case PlaceFilterType.CONGESTION:
        return places.filter((place) => place.congestion);
    }
  };

  const filterOptions = [
    {
      label: `${t("common:label.congestionLevel")}`, // 예상혼잡도
      value: PlaceFilterType.CONGESTION,
    },
    {
      label: t("common:label.isOpen"), // 운영중
      value: PlaceFilterType.OPERATING,
    },
    {
      label: t("common:label.unvisited"), // 미방문지
      value: PlaceFilterType.UNVISITED,
    },
  ];

  return {
    filterLoading,
    selectedFilter,
    setSelectedFilter,
    filteredPlaces,
    getLegendConfig,
    getFilteredList,
    filterOptions,
  };
};
