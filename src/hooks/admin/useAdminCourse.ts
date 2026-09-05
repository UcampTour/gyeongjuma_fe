import { useState } from "react";
import { useAdminCourseListQuery } from "../../queries/admin/useAdminCourseQuery";
import { createAdminCourseApi, updateAdminCourseApi } from "../../api/admin/AdminCourseApi";

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
  type: "WALK" | "BIKE" | "DRIVE" | "TRANSIT";
  isUse: boolean;
  places: SelectedPlace[];
  name: string;
  description: string;
  placeCnt: number;
  contents: CourseContentItem[];
}

export const SUPPORTED_LANGUAGES = [
  { code: "ko", label: "KO" },
  { code: "en", label: "EN" },
  { code: "ja", label: "JA" },
  { code: "zh", label: "ZH" },
];

export const useAdminCourse = () => {
  const { data, isLoading, refetch } = useAdminCourseListQuery();
  const courseList = data?.courses ?? [];

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
  const [formType, setFormType] = useState<"WALK" | "BIKE" | "DRIVE" | "TRANSIT">("WALK");
  const [formIsUse, setFormIsUse] = useState(true);
  const [formPlaces, setFormPlaces] = useState<SelectedPlace[]>([]);

  // 다국어 탭 상태 및 임시 콘텐츠 배열
  const [currentLanguage, setCurrentLanguage] = useState<string>("ko");
  const [draftContents, setDraftContents] = useState<CourseContentItem[]>([]);

  // 제출 로딩 상태
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // 필터링 로직
  const filteredCourses = courseList.filter((course: CourseItem) => {
    const matchesKeyword = 
      course.name.toLowerCase().includes(filter.keyword.toLowerCase()) ||
      course.description.toLowerCase().includes(filter.keyword.toLowerCase());

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
    setCurrentLanguage("ko");
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
    setCurrentLanguage("ko");
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

  // 코스 저장 로직 (일반 비동기 함수 + try/catch 연동)
  const handleSaveCourse = async () => {
    const koContent = draftContents.find((c) => c.language === "ko");
    if (!koContent || !koContent.courseName.trim()) {
      alert("기본 언어(KO) 코스명은 반드시 입력해야 합니다.");
      return;
    }
    if (formPlaces.length < 1) {
      alert("관광지는 최소 1개 이상 추가해야 합니다.");
      return;
    }

    const validContents = draftContents
      .filter((c) => c.courseName.trim() !== "" || c.description.trim() !== "")
      .map((c) => ({
        language: c.language,
        courseName: c.courseName,
        description: c.description,
      }));

    const payload = {
      type: formType,
      isUse: formIsUse,
      placeIds: formPlaces.map((p) => p.id),
      contents: validContents,
    };

    try {
      setIsSubmitting(true);

      if (dialogMode === "CREATE") {
        await createAdminCourseApi(payload);
        alert("코스가 성공적으로 등록되었습니다.");
      } else {
        if (editingId === null) return;
        await updateAdminCourseApi(editingId, payload);
        alert("코스가 성공적으로 수정되었습니다.");
      }

      setOpenDialog(false);
      refetch?.();
    } catch (error: any) {
      alert(`요청 실패: ${error?.response?.data?.message || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case "WALK": return "도보";
      case "BIKE": return "자전거";
      case "DRIVE": return "운전";
      case "TRANSIT": return "대중교통";
      default: return type;
    }
  };

  return {
    courses: courseList,
    isLoading,
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
    isSubmitting,
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