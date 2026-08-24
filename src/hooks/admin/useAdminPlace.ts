import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import type { SelectChangeEvent } from "@mui/material";

// 타입 정의
export interface PlaceContentItem {
  placeContentId?: number;
  difficulty: "EASY" | "NORMAL" | "HARD";
  language: string; 
  description: string;
}

export interface PlaceItem {
  placeId: number;
  placeName: string;
  category: string; 
  isActive: boolean;
  contents: PlaceContentItem[];
}

export const SUPPORTED_LANGUAGES = [
  { code: "KO", label: "KO" },
  { code: "EN", label: "EN" },
  { code: "JA", label: "JA" },
  { code: "ZH", label: "ZH" },
];

const initialPlaces: PlaceItem[] = [
  { 
    placeId: 1, 
    placeName: "불국사", 
    category: "TOURIST_SPOT", 
    isActive: true,
    contents: [
      { placeContentId: 1, difficulty: "EASY", language: "KO", description: "불국사는 신라 시대의 대표적인 절입니다." },
      { placeContentId: 2, difficulty: "EASY", language: "EN", description: "Bulguksa Temple is a representative temple of the Silla Dynasty." },
    ]
  },
  { 
    placeId: 2, 
    placeName: "첨성대", 
    category: "TOURIST_SPOT", 
    isActive: true,
    contents: [
      { placeContentId: 3, difficulty: "EASY", language: "KO", description: "첨성대는 동양에서 가장 오래된 천문대입니다." }
    ]
  },
  { 
    placeId: 3, 
    placeName: "국립경주박물관", 
    category: "CULTURAL_FACILITY", 
    isActive: false,
    contents: []
  },
];

export const useAdminPlace = () => {
  const [places] = useState<PlaceItem[]>(initialPlaces);
  
  // 검색 및 필터 상태
  const [keyword, setKeyword] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [useFlag, setUseFlag] = useState("all");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // 선택된 관광지 ID
  const [selectedPlaceId, setSelectedPlaceId] = useState<number>(initialPlaces[0]?.placeId || 1);
  const selectedPlace = places.find((p) => p.placeId === selectedPlaceId) || null;

  // 우측 패널 내부 탭 상태
  const [currentDifficulty, setCurrentDifficulty] = useState<"EASY" | "NORMAL" | "HARD">("EASY");
  const [currentLanguage, setCurrentLanguage] = useState<string>("KO");
  
  // 우측 패널에서 수정 중인 활성 상태
  const [editIsActive, setEditIsActive] = useState<boolean>(selectedPlace?.isActive ?? true);

  // 배열 형태의 임시 저장 상태
  const [draftContents, setDraftContents] = useState<PlaceContentItem[]>([]);

  // 관광지가 바뀔 때 탭 상태 및 임시 입력값 초기화
  useEffect(() => {
    if (selectedPlace) {
      setEditIsActive(selectedPlace.isActive);
      setDraftContents(JSON.parse(JSON.stringify(selectedPlace.contents)));

      setCurrentDifficulty("EASY");
      setCurrentLanguage("KO");
    }
  }, [selectedPlaceId]);

  // 현재 선택된 난이도와 언어에 해당하는 설명 찾기
  const currentContentItem = draftContents.find(
    (c) => c.difficulty === currentDifficulty && c.language === currentLanguage
  );
  const currentDescription = currentContentItem ? currentContentItem.description : "";

  // 텍스트 변경 시 배열 안의 해당 아이템을 수정하거나 추가
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;

    setDraftContents((prev) => {
      const existsIndex = prev.findIndex(
        (c) => c.difficulty === currentDifficulty && c.language === currentLanguage
      );

      if (existsIndex > -1) {
        const updated = [...prev];
        updated[existsIndex] = {
          ...updated[existsIndex],
          description: value,
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            difficulty: currentDifficulty,
            language: currentLanguage,
            description: value,
          },
        ];
      }
    });
  };

  // 행 변경 시 체크할 Dirty 여부
  const isPlaceDirty = () => {
    if (!selectedPlace) return false;
    
    if (draftContents.length !== selectedPlace.contents.length) return true;

    for (const draft of draftContents) {
      const original = selectedPlace.contents.find(
        (c) => c.difficulty === draft.difficulty && c.language === draft.language
      );
      if (!original || original.description !== draft.description) {
        return true;
      }
    }
    return false;
  };

  // 검색 및 필터링 로직
  const filteredPlaces = places.filter((place) => {
    const matchesKeyword = place.placeName.toLowerCase().includes(keyword.toLowerCase());
    const matchesUsage = 
      useFlag === "all" || 
      (useFlag === "active" && place.isActive) || 
      (useFlag === "inactive" && !place.isActive);

    const matchesCategory = 
      categoryFilter === "all" || place.category === categoryFilter;

    return matchesKeyword && matchesUsage && matchesCategory;
  });

  const paginatedPlaces = filteredPlaces.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setKeyword(e.target.value);
    setPage(0);
  };

  const handleCategoryChange = (e: SelectChangeEvent) => {
    setCategoryFilter(e.target.value);
    setPage(0);
  };

  const handleUsageChange = (e: SelectChangeEvent) => {
    setUseFlag(e.target.value);
    setPage(0);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleSelectPlace = (place: PlaceItem) => {
    if (place.placeId === selectedPlaceId) return;

    if (isPlaceDirty()) {
      const confirmMove = window.confirm("저장되지 않은 변경 사항이 있습니다. 다른 관광지로 이동하시겠습니까?");
      if (!confirmMove) return;
    }

    setSelectedPlaceId(place.placeId);
  };

  const handleTabChange = (newDiff: "EASY" | "NORMAL" | "HARD", newLang: string) => {
    setCurrentDifficulty(newDiff);
    setCurrentLanguage(newLang);
  };

  // 통합 저장 로직
  const handleSaveAll = () => {
    if (!selectedPlace) return;

    const validContents = draftContents.filter((c) => c.description.trim() !== "");

    const payload = {
      placeId: selectedPlaceId,
      isActive: editIsActive,
      contents: validContents,
    };

    console.log("서버로 전송할 페이로드:", payload);
    alert("저장 버튼 클릭됨 (백엔드 스펙과 일치하는 배열 페이로드 전송)");
  };

  return {
    keyword,
    categoryFilter,
    useFlag,
    page,
    rowsPerPage,
    selectedPlaceId,
    selectedPlace,
    currentDifficulty,
    currentLanguage,
    editIsActive,
    currentDescription,
    paginatedPlaces,
    filteredPlacesCount: filteredPlaces.length,
    supportedLanguages: SUPPORTED_LANGUAGES,
    setEditIsActive,
    handleSearchChange,
    handleCategoryChange,
    handleUsageChange,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSelectPlace,
    handleTabChange,
    handleDescriptionChange,
    handleSaveAll,
  };
};