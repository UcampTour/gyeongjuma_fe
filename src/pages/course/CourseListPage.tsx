import { Box, Chip, Stack } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CommonSearchBar from "../../components/common/CommonSearchBar";
import PageHeader from "../../components/common/PageHeader";
import CourseItem from "../../components/course/CourseItem";
import { useCourseListQuery } from "../../queries/useCourseListQuery";
import { courseFilters } from "./courseConstants";

const CoursePage = () => {
  const { t } = useTranslation();

  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const { data, isLoading, isError } = useCourseListQuery();

  const courses = data?.courses ?? [];

  // 캐싱된 코스 목록에서 필터링 + 검색
  const filteredCourses = courses.filter((course) => {
    // 유형 필터
    const matchesType = selectedType === "ALL" || course.type === selectedType;

    // 코스 이름 검색
    const matchesKeyword = course.title
      .toLowerCase()
      .includes(searchKeyword.trim().toLowerCase());

    return matchesType && matchesKeyword;
  });

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>코스 목록을 불러오지 못했습니다.</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        bgcolor: "#F7F5EE",
        overflow: "hidden",
      }}
    >
      <Box sx={{ flexShrink: 0 }}>
        <PageHeader title={t("course:title")} />

        {/* 코스 필터 */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            px: 3,
            mb: 2,
            overflowX: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {courseFilters.map((filter) => {
            const isSelected = selectedType === filter.type;

            return (
              <Chip
                key={filter.type}
                label={filter.emoji + t(`course:tabLabel.${filter.type}`)}
                onClick={() => setSelectedType(filter.type)}
                sx={{
                  flexShrink: 0,
                  height: 36,
                  borderRadius: 5,
                  fontSize: 13,
                  fontWeight: 600,

                  bgcolor: isSelected ? "#BC9A5D" : "#FFFFFF",
                  color: isSelected ? "#FFFFFF" : "#555",
                  border: isSelected
                    ? "1px solid #BC9A5D"
                    : "1px solid #E5E1D8",

                  "&:hover": {
                    bgcolor: isSelected ? "#BC9A5D" : "#F5F2EA",
                  },

                  "& .MuiChip-label": {
                    px: 1.5,
                  },
                }}
              />
            );
          })}
        </Stack>

        {/* 검색창 */}
        <Stack sx={{ width: "100%", px: 3, pb: 1 }}>
          <CommonSearchBar
            placeholder={t("course:search")}
            keyword={searchKeyword}
            setKeyword={setSearchKeyword}
          />
        </Stack>
      </Box>

      {/* 리스트 */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 3,
          pb: 15,
          "&::-webkit-scrollbar": {
            width: 6,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: 999,
          },
        }}
      >
        <Stack spacing={1.5}>
          {filteredCourses.map((course) => (
            <CourseItem key={course.courseId} item={course} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default CoursePage;
