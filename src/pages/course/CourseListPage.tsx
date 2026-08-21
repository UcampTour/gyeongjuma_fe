import { Box, Chip, Stack } from "@mui/material";
import { useState } from "react";
import CommonSearchBar from "../../components/common/CommonSearchBar";
import PageHeader from "../../components/common/PageHeader";
import type { CourseListItem } from "../../components/course/CourseItem";
import CourseItem from "../../components/course/CourseItem";

export const dummyCourseList: CourseListItem[] = [
  {
    courseId: 1,
    title: "신라의 천년을 걷다",
    description: "경주의 대표적인 신라 문화유산을 따라 걷는 코스",
    image:
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80",
    type: "WALK",
    duration: 240,
  },
  {
    courseId: 2,
    title: "경주 역사 여행",
    description: "불국사부터 첨성대까지 경주의 역사를 한눈에",
    image:
      "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?auto=format&fit=crop&w=800&q=80",
    type: "TRANSIT",
    duration: 240,
  },
  {
    courseId: 3,
    title: "밤에 만나는 경주",
    description: "동궁과 월지와 월정교의 아름다운 야경 코스",
    image:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80",
    type: "DRIVE",
    duration: 240,
  },
  {
    courseId: 4,
    title: "경주 왕릉 산책",
    description: "신라 왕들의 이야기를 따라 떠나는 역사 산책",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
    type: "WALK",
    duration: 240,
  },
  {
    courseId: 5,
    title: "경주의 숨은 명소",
    description: "잘 알려지지 않은 경주의 매력적인 장소들을 만나보세요",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
    type: "DRIVE",
    duration: 240,
  },
];

export interface CourseFilter {
  type: string;
  label: string;
  emoji: string;
}
export const courseFilters: CourseFilter[] = [
  {
    type: "ALL",
    label: "전체",
    emoji: "🌟",
  },
  {
    type: "WALK",
    label: "도보",
    emoji: "🚶",
  },
  {
    type: "TRANSIT",
    label: "대중교통",
    emoji: "🚌",
  },
  {
    type: "DRIVE",
    label: "드라이브",
    emoji: "🚗",
  },
];

const CoursePage = () => {
  const [selectedType, setSelectedType] = useState<string>("ALL");

  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const filteredCourses =
    selectedType === "ALL"
      ? dummyCourseList
      : dummyCourseList.filter((course) => course.type === selectedType);

  return (
    <Box sx={{ bgcolor: "#F7F5EE", minHeight: "100vh", pb: 16 }}>
      <PageHeader title="경주 여행 코스" />

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
              label={`${filter.emoji} ${filter.label}`}
              onClick={() => setSelectedType(filter.type)}
              sx={{
                flexShrink: 0,
                height: 36,
                borderRadius: 5,
                fontSize: 13,
                fontWeight: 600,

                bgcolor: isSelected ? "#BC9A5D" : "#FFFFFF",
                color: isSelected ? "#FFFFFF" : "#555",
                border: isSelected ? "1px solid #BC9A5D" : "1px solid #E5E1D8",

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
      {/* 검색창 및 정렬 영역 */}
      <Stack sx={{ width: "100%", px: 3 }}>
        <Box sx={{ height: "100%" }}>
          <CommonSearchBar
            placeholder="관광지를 검색해보세요"
            keyword={searchKeyword}
            setKeyword={setSearchKeyword}
          />
        </Box>
      </Stack>

      <Stack
        spacing={1.5}
        sx={{
          px: 3,
          pt: 2,
        }}
      >
        {filteredCourses.map((course) => (
          <CourseItem key={course.courseId} item={course} />
        ))}
      </Stack>
    </Box>
  );
};

export default CoursePage;
