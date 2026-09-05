import { useEffect, useMemo, useState } from "react";
import { PlaceSortType } from "../../models/PlaceModel";
import { usePlaceListQuery } from "../../queries/usePlaceListQuery";
import type { FilterOperationStatus } from "../../components/places/placelist/PlaceCategoryFilter";

export const usePlaceList = () => {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: 35.856171,
    lng: 129.224748,
  });

  const { data: placeData = [], isLoading } = usePlaceListQuery({
    latitude: userLocation?.lat,
    longitude: userLocation?.lng,
  });

  const [selectedStatus, setSelectedStatus] = useState<FilterOperationStatus>("ALL");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortBy, setSortBy] = useState<PlaceSortType>(PlaceSortType.DEFAULT);

  // 내 위치 정보 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("위치 정보를 가져오지 못했습니다.", error);
        },
      );
    }
  }, []);

  // 운영 상태(operationStatus) 기준 데이터 필터링
  const filteredPlaces = useMemo(() => {
    return placeData.filter((place) => {
      const matchesStatus =
        selectedStatus === "ALL" ||
        place.operationStatus === selectedStatus;

      // 키워드 매칭 여부
      const cleanKeyword = searchKeyword.trim().toLocaleLowerCase();
      const matchesKeyword = place.placeName
        .toLowerCase()
        .includes(cleanKeyword);

      return matchesStatus && matchesKeyword;
    });
  }, [placeData, selectedStatus, searchKeyword]);

  // 데이터 정렬
  const sortedPlaces = useMemo(() => {
    const result = [...filteredPlaces];

    switch (sortBy) {
      case PlaceSortType.DISTANCE:
        return result.sort((a, b) => {
          if (a.distance === null) return 1;
          if (b.distance === null) return -1;
          return a.distance - b.distance;
        });

      case PlaceSortType.LIKES:
        return result.sort((a, b) => {
          if (a.likes === null) return 1;
          if (b.likes === null) return -1;
          return b.likes - a.likes;
        });

      default:
        return result;
    }
  }, [filteredPlaces, sortBy]);

  return {
    selectedStatus,
    setSelectedStatus,
    placeList: sortedPlaces,
    searchKeyword,
    setSearchKeyword,
    sortBy,
    setSortBy,
    isLoading,
  };
};