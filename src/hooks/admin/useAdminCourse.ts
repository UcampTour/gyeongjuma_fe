import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { useAdminCourseListQuery } from "../../queries/admin/useAdminCourseQuery";

export interface SelectedPlace {
  id: number;
  name: string;
}

export interface CourseContentItem {
  courseContentId?: number;
  language: string;
  courseName: string;
  description: string;
}

export interface CourseItem {
  id: number;
  type: "WALK" | "PUBLIC" | "DRIVE";
  isUse: boolean;
  places: SelectedPlace[];
  contents: CourseContentItem[];
}

export const SUPPORTED_LANGUAGES = [
  { code: "KO", label: "KO" },
  { code: "EN", label: "EN" },
  { code: "JA", label: "JA" },
  { code: "ZH", label: "ZH" },
];

const initialCourses: CourseItem[] = [
  { 
    id: 1, 
    type: "WALK", 
    isUse: true, 
    places: [{ id: 103, name: "첨성대" }, { id: 105, name: "대릉원" }],
    contents: [
      { 
        courseContentId: 1, 
        language: "KO", 
        courseName: "경주 역사 탐방 도보 코스", 
        description: "대릉원과 첨성대를 걸어서 둘러보는 추천 코스입니다." 
      },
      { 
        courseContentId: 2, 
        language: "EN", 
        courseName: "Gyeongju History Walking Course", 
        description: "A recommended walking course around Daereungwon and Cheomseongdae." 
      }
    ]
  },
];

export const useAdminCourse = () => {
  const { data, isLoading } = useAdminCourseListQuery();
  const courseData = data?.courses ?? [];
  console.log(data); 
  const [courses] = useState<CourseItem[]>(initialCourses);
  
  // 검색 및 필터 상태
  const [filter, setFilter] = useState({
    keyword: "",
    courseType: "all",
    useFlag: "all",
  });
  
  // 페이지네이션
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // 다이얼로그 및 모드 제어
  const [dialogMode, setDialogMode] = useState<"CREATE" | "EDIT">("CREATE");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // 장소 검색 팝업 제어
  const [openPlaceSearch, setOpenPlaceSearch] = useState(false);

  // 폼 공통 상태 (타입, 사용여부, 장소)
  const [formType, setFormType] = useState<"WALK" | "PUBLIC" | "DRIVE">("WALK");
  const [formIsUse, setFormIsUse] = useState(true);
  const [formPlaces, setFormPlaces] = useState<SelectedPlace[]>([]);

  // 다국어 탭 상태 및 임시 콘텐츠 배열
  const [currentLanguage, setCurrentLanguage] = useState<string>("KO");
  const [draftContents, setDraftContents] = useState<CourseContentItem[]>([]);

  // 현재 선택된 언어의 콘텐츠 찾기
  const currentContentItem = draftContents.find((c) => c.language === currentLanguage);
  const currentCourseName = currentContentItem ? currentContentItem.courseName : "";
  const currentDescription = currentContentItem ? currentContentItem.description : "";

  // 다국어 입력값(코스명/설명) 변경 핸들러
  const handleFieldChange = (field: "courseName" | "description", value: string) => {
    setDraftContents((prev) => {
      const existsIndex = prev.findIndex((c) => c.language === currentLanguage);

      if (existsIndex > -1) {
        const updated = [...prev];
        updated[existsIndex] = {
          ...updated[existsIndex],
          [field]: value,
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            language: currentLanguage,
            courseName: field === "courseName" ? value : "",
            description: field === "description" ? value : "",
          },
        ];
      }
    });
  };

  // 필터링 로직 (한국어 혹은 전체 콘텐츠 기준 검색)
  const filteredCourses = courses.filter((course) => {
    const koContent = course.contents.find((c) => c.language === "KO") || course.contents[0];
    const courseName = koContent ? koContent.courseName : "";
    const description = koContent ? koContent.description : "";

    const matchesKeyword = 
      courseName.toLowerCase().includes(filter.keyword.toLowerCase()) ||
      description.toLowerCase().includes(filter.keyword.toLowerCase());

    const matchesType = filter.courseType === "all" || course.type === filter.courseType;
    const matchesUsage =
      filter.useFlag === "all" ||
      (filter.useFlag === "active" && course.isUse) ||
      (filter.useFlag === "inactive" && !course.isUse);

    return matchesKeyword && matchesType && matchesUsage;
  });

  const paginatedCourses = filteredCourses.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // 다이얼로그 열기 (등록)
  const handleOpenCreateDialog = () => {
    setDialogMode("CREATE");
    setEditingId(null);
    setFormType("WALK");
    setFormIsUse(true);
    setFormPlaces([]);
    setDraftContents([]);
    setCurrentLanguage("KO");
    setOpenDialog(true);
  };

  // 다이얼로그 열기 (수정)
  const handleOpenEditDialog = (course: CourseItem) => {
    setDialogMode("EDIT");
    setEditingId(course.id);
    setFormType(course.type);
    setFormIsUse(course.isUse);
    setFormPlaces([...course.places]);
    setDraftContents(JSON.parse(JSON.stringify(course.contents)));
    setCurrentLanguage("KO");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  // 장소 선택/삭제/이동 핸들러
  const handleSelectPlace = (place: { id: number; name: string }) => {
    if (formPlaces.some((p) => p.id === place.id)) {
      alert("이미 추가된 관광지입니다.");
      return;
    }
    setFormPlaces([...formPlaces, place]);
    setOpenPlaceSearch(false);
  };

  const handleRemovePlace = (index: number) => {
    setFormPlaces((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMovePlace = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= formPlaces.length) return;

    const updated = [...formPlaces];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    
    setFormPlaces(updated);
  };

  // 코스 저장 로직
  const handleSaveCourse = () => {
    const koContent = draftContents.find((c) => c.language === "KO");
    if (!koContent || !koContent.courseName.trim()) {
      alert("기본 언어(KO) 코스명은 반드시 입력해야 합니다.");
      return;
    }
    if (formPlaces.length < 2) {
      alert("관광지는 최소 2개 이상 추가해야 합니다.");
      return;
    }

    const validContents = draftContents.filter((c) => c.courseName.trim() !== "" || c.description.trim() !== "");

    const payload = {
      type: formType,
      isUse: formIsUse,
      placeCount: formPlaces.length,
      places: formPlaces,
      contents: validContents,
    };

    if (dialogMode === "CREATE") {
      console.log("코스 등록 API Payload:", payload);
      alert("등록 API 호출 (구현 예정)");
    } else {
      console.log("코스 수정 API Payload (ID:", editingId, "):", payload);
      alert("수정 API 호출 (구현 예정)");
    }

    setOpenDialog(false);
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case "WALK": return "도보";
      case "PUBLIC": return "대중교통";
      case "DRIVE": return "운전";
      default: return type;
    }
  };

  return {
    courses,
    filter,
    setFilter,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    dialogMode,
    openDialog,
    openPlaceSearch,
    setOpenPlaceSearch,
    filteredCourses,
    paginatedCourses,
    formType,
    setFormType,
    formIsUse,
    setFormIsUse,
    formPlaces,
    currentLanguage,
    currentCourseName,
    currentDescription,
    supportedLanguages: SUPPORTED_LANGUAGES,
    setCurrentLanguage,
    handleFieldChange,
    handleOpenCreateDialog,
    handleOpenEditDialog,
    handleCloseDialog,
    handleSelectPlace,
    handleRemovePlace,
    handleMovePlace,
    handleSaveCourse,
    getTypeText,
  };
};