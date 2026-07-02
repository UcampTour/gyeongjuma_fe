import { useEffect, useMemo, useState } from "react";
import { PlaceCategory, PlaceSortType } from "../models/PlaceModel";
import { dummyPlaceListData } from "../data/places/placesData";
import { getDistance } from "../utils/geo";

export const usePlaceList = () => {

  const [userLocation, setUserLocation] = useState<{ lat:number; lng:number } | null >(null);
  const [selectedCategory, setSelectedCategory] = useState<PlaceCategory>(PlaceCategory.ALL);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortBy, setSortBy] = useState<PlaceSortType>(PlaceSortType.DEFAULT);


  // 1. 내 위치 정보 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        (error) => {
          console.error("위치 정보를 가져오지 못했습니다.", error);
        }
      );
    }
  }, []);

  // 2. 내 위치와 장소 사이의 거리 계산
  const placesWithDistance = useMemo(() => {
    return dummyPlaceListData.map((place) => {
      const distance = userLocation ? getDistance(userLocation.lat, userLocation.lng, place.lat, place.lng) : null;
      return { ...place, distance };
    });
  }, [userLocation]);

  // 3. 데이터 필터링
  const filteredPlaces = useMemo(() => {
    return placesWithDistance.filter((place) => {
      
      // 카테고리 매칭 여부
      const matchesCategory = selectedCategory === PlaceCategory.ALL || place.category === selectedCategory;

      // 키워드 매칭 여부
      const cleanKeyword = searchKeyword.trim().toLocaleLowerCase();
      const matchesKeyword = place.name.toLowerCase().includes(cleanKeyword);

      return matchesCategory && matchesKeyword;

    });
  }, [placesWithDistance, selectedCategory, searchKeyword]);

  return {
    selectedCategory,
    setSelectedCategory,
    filteredPlaces,
    searchKeyword,
    setSearchKeyword,
    sortBy,
    setSortBy,
  };

};