import { useEffect, useState } from "react";
import { PlaceCategory, PlaceSortType, type PlaceListBase } from "../../models/PlaceModel";
import { CongestionLevel, OperationStatus } from "../../models/commonModel";

export const useBookmark = () => {

  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: 35.856171,
    lng: 129.224748,
  });

  const data = bookmarkList;
  const [selectedCategory, setSelectedCategory] = useState<PlaceCategory>(PlaceCategory.ALL);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortBy, setSortBy] = useState<PlaceSortType>(PlaceSortType.DEFAULT);

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
}

const bookmarkList = [
    {
      placeId: 250270,
      placeName: "굴불사지 석조사면불상",
      description: "경주 굴불사지 석조사면불상은 경주 굴불사터에 있는 통일신라시대 바위 불상으로...",
      category: "HS020300",
      rating: 0.0,
      reviewCount: 0,
      likes: 0,
      lat: 35.8578721,
      lng: 129.23034334,
      distance: 0.54,
      congestion: CongestionLevel.NONE,
      operationStatus: OperationStatus.OPEN,
      operationHour: "상시 개방",
      add1: "경상북도 경주시 산업로 4214-76",
      add2: "(동천동) 부근",
      parking: "UNAVAILABLE",
      imageUrl: "http://tong.visitkorea.or.kr/cms/resource/40/3542540_image2_1.jpg",
      isVisited: false,
    },
    {
      placeId: 126165,
      placeName: "백률사",
      description: "경주시 북쪽 소금강산 중턱에 자리한 백률사는 신라 법흥왕 14년(527) 불교 공인을 위해 순교한...",
      category: "HS030100",
      rating: 0.0,
      reviewCount: 0,
      likes: 0,
      lat: 35.85910253,
      lng: 129.23120711,
      distance: 0.67,
      congestion: "NONE",
      operationStatus: "OPEN",
      operationHour: "09:00~18:00",
      add1: "경상북도 경주시 산업로 4214-110 (동천동)",
      add2: "",
      parking: "AVAILABLE",
      imageUrl: "http://tong.visitkorea.or.kr/cms/resource/85/3575785_image2_1.jpg",
      isVisited: false,
    },
    {
      placeId: 129523,
      placeName: "탈해왕릉",
      description: "경주 동천동에 있는 신라 제4대 탈해왕(재위 57~80)의 무덤으로 소나무 숲으로 둘러싸여 있다...",
      category: "HS010800",
      rating: 0.0,
      reviewCount: 0,
      likes: 0,
      lat: 35.85201168,
      lng: 129.23211557,
      distance: 0.81,
      congestion: "NONE",
      operationStatus: "OPEN",
      operationHour: "상시 개방",
      add1: "경상북도 경주시 동천동",
      add2: "산17",
      parking: "AVAILABLE",
      imageUrl: "http://tong.visitkorea.or.kr/cms/resource/30/3542530_image2_1.jpg",
      isVisited: false,
    },
    {
      placeId: 2756611,
      placeName: "읍성",
      description: "경주 시가지 중심부에 신라 이후의 천년 경주를 상징하는 주요 유적인 경주읍성이 자리해 있다...",
      category: "HS010200",
      rating: 0.0,
      reviewCount: 0,
      likes: 0,
      lat: 35.8473202,
      lng: 129.21390619,
      distance: 1.39,
      congestion: "NONE",
      operationStatus: "OPEN",
      operationHour: "상시 개방",
      add1: "경상북도 경주시 동문로 31",
      add2: "(북부동)",
      parking: "AVAILABLE",
      imageUrl: "http://tong.visitkorea.or.kr/cms/resource/23/3542523_image2_1.jpg",
      isVisited: false,
    },
  ];

