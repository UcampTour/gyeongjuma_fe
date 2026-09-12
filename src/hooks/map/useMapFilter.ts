import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { LoadingProps } from "../../components/common/CommonLoading";
import type { MapLegendConfig } from "../../components/map/MapLegend";
import { CongestionLevel, OperationStatus } from "../../models/commonModel";
import { PlaceFilterType } from "../../models/MapModel";
import type { PlaceListBase } from "../../models/PlaceModel";

export const useMapFilter = (places: PlaceListBase[]) => {
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
        loadingMsg: t("places:message.loadingPlaceInfo"),
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
        return places.filter((place) => place.operationStatus === "OPEN");

      case PlaceFilterType.UNVISITED:
        return places.filter((place) => !place.isVisited);

      default:
        return places;
    }
  }, [places, selectedFilter]);

  const getLegendConfig = (
    filter: PlaceFilterType,
    places: PlaceListBase[],
  ): MapLegendConfig | null => {
    switch (filter) {
      case PlaceFilterType.CONGESTION:
        return {
          title: "map:legend.congestion.title",
          items: [
            {
              label: "map:legend.congestion.low",
              value: CongestionLevel.LOW,
              color: "#4CAF50",
              count: places.filter((p) => p.congestion === CongestionLevel.LOW)
                .length,
            },
            {
              label: "map:legend.congestion.medium",
              value: CongestionLevel.MEDIUM,
              color: "#FFC107",
              count: places.filter(
                (p) => p.congestion === CongestionLevel.MEDIUM,
              ).length,
            },
            {
              label: "map:legend.congestion.high",
              value: CongestionLevel.HIGH,
              color: "#F44336",
              count: places.filter((p) => p.congestion === CongestionLevel.HIGH)
                .length,
            },
            {
              label: "map:legend.congestion.none",
              value: CongestionLevel.NONE,
              color: "#dfdfdf",
              count: places.filter((p) => p.congestion === CongestionLevel.NONE)
                .length,
            },
          ],
        };

      case PlaceFilterType.OPERATING:
        return {
          title: "map:legend.operating.title",
          items: [
            {
              label: "map:legend.operating.open",
              value: OperationStatus.OPEN,
              color: "#4CAF50",
              count: places.filter(
                (p) => p.operationStatus === OperationStatus.OPEN,
              ).length,
            },
            {
              label: "map:legend.operating.closed",
              value: OperationStatus.CLOSED,
              color: "#f09898",
              count: places.filter(
                (p) => p.operationStatus === OperationStatus.CLOSED,
              ).length,
            },
            {
              label: "map:legend.operating.breakTime",
              value: OperationStatus.BREAK_TIME,
              color: "#ffb46d",
              count: places.filter(
                (p) => p.operationStatus === OperationStatus.BREAK_TIME,
              ).length,
            },
            {
              label: "map:legend.operating.none",
              value: OperationStatus.NONE,
              color: "#c5c4c4",
              count: places.filter(
                (p) => p.operationStatus === OperationStatus.NONE,
              ).length,
            },
          ],
        };

      case PlaceFilterType.UNVISITED:
        return {
          title: "map:legend.visited.title",
          items: [
            {
              label: "map:legend.visited.unvisited",
              value: "UNVISITED",
              color: "#A73831",
              count: places.filter((p) => !p.isVisited).length,
            },
            {
              label: "map:legend.visited.completed",
              value: "VISITED",
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
