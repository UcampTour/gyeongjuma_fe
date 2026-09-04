import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import type { SelectChangeEvent } from "@mui/material";
import { useAdminCourseListQuery } from "../../queries/admin/useAdminCourseQuery";
import { updatePlaceContent } from "../../api/admin/AdminPlaceApi";

export interface PlaceContentItem {
  placeContentId?: number;
  difficulty: "EASY" | "NORMAL" | "HARD";
  description: string;
}

export interface PlaceItem {
  placeId: number;
  placeName: string;
  language: string; 
  isActive: boolean;
  contents: PlaceContentItem[];
}

export const useAdminPlace = () => {
  const { data, refetch } = useAdminCourseListQuery();
  const placeList = data?.places ?? [];
  console.log(placeList);

  // 검색 및 필터 상태 (category -> language)
  const [keyword, setKeyword] = useState("");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [useFlag, setUseFlag] = useState("all");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // 선택된 관광지 ID
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);

  useEffect(() => {
    if (placeList.length > 0 && selectedPlaceId === null) {
      setSelectedPlaceId(placeList[0].placeId);
    }
  }, [placeList, selectedPlaceId]);

  const selectedPlace = placeList.find((p) => p.placeId === selectedPlaceId) || null;

  // 우측 패널 내부 탭 상태 (난이도만 존재)
  const [currentDifficulty, setCurrentDifficulty] = useState<"EASY" | "NORMAL" | "HARD">("EASY");
  
  // 수정 중인 활성 상태
  const [editIsActive, setEditIsActive] = useState<boolean>(true);

  // 임시 저장 상태 (난이도별 해설 배열)
  const [draftContents, setDraftContents] = useState<PlaceContentItem[]>([]);

  useEffect(() => {
    if (selectedPlace) {
      setEditIsActive(selectedPlace.isActive);
      setDraftContents(JSON.parse(JSON.stringify(selectedPlace.contents ?? [])));
      setCurrentDifficulty("EASY");
    }
  }, [selectedPlaceId, selectedPlace]);

  // 현재 선택된 난이도에 해당하는 설명 찾기
  const currentContentItem = draftContents.find((c) => c.difficulty === currentDifficulty);
  const currentDescription = currentContentItem ? currentContentItem.description : "";

  // 텍스트 변경 시 해당 난이도 아이템 수정 또는 추가
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;

    setDraftContents((prev) => {
      const existsIndex = prev.findIndex((c) => c.difficulty === currentDifficulty);

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
            description: value,
          },
        ];
      }
    });
  };

  // 변경 사항(Dirty) 체크
  const isPlaceDirty = () => {
    if (!selectedPlace) return false;
    if (draftContents.length !== (selectedPlace.contents?.length ?? 0)) return true;

    for (const draft of draftContents) {
      const original = selectedPlace.contents?.find((c) => c.difficulty === draft.difficulty);
      if (!original || original.description !== draft.description) {
        return true;
      }
    }
    return false;
  };

  // 검색 및 필터링 로직
  const filteredPlaces = placeList.filter((place) => {
    const matchesKeyword = place.placeName.toLowerCase().includes(keyword.toLowerCase());
    const matchesUsage = 
      useFlag === "all" || 
      (useFlag === "active" && place.isActive) || 
      (useFlag === "inactive" && !place.isActive);

    const matchesLanguage = 
      languageFilter === "all" || place.language === languageFilter;

    return matchesKeyword && matchesUsage && matchesLanguage;
  });

  const paginatedPlaces = filteredPlaces.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setKeyword(e.target.value);
    setPage(0);
  };

  const handleLanguageChange = (e: SelectChangeEvent) => {
    setLanguageFilter(e.target.value);
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

  const handleDifficultyChange = (newDiff: "EASY" | "NORMAL" | "HARD") => {
    setCurrentDifficulty(newDiff);
  };

  // 5번 API 연동 (해설 저장/수정)
  const handleSaveAll = async () => {
    if (!selectedPlace || selectedPlaceId === null) return;

    try {
      const validContents = draftContents.filter((c) => c.description.trim() !== "");

      for (const content of validContents) {
        await updatePlaceContent(selectedPlaceId, {
          language: selectedPlace.language,
          difficulty: content.difficulty,
          description: content.description,
        });
      }

      alert("관광지 해설을 성공적으로 저장했습니다.");
      refetch(); // 데이터 최신화
    } catch (error) {
      console.error("해설 저장 실패:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  return {
    keyword,
    languageFilter,
    useFlag,
    page,
    rowsPerPage,
    selectedPlaceId,
    selectedPlace,
    currentDifficulty,
    editIsActive,
    currentDescription,
    paginatedPlaces,
    filteredPlacesCount: filteredPlaces.length,
    setEditIsActive,
    handleSearchChange,
    handleLanguageChange,
    handleUsageChange,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSelectPlace,
    handleDifficultyChange,
    handleDescriptionChange,
    handleSaveAll,
  };
};