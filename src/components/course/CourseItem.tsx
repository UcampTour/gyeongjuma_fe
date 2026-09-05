import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { CourseListItem } from "../../models/CourseModel";
import { getCourseTypeLabel } from "../../pages/course/courseConstants";

interface CourseItemProps {
  item: CourseListItem;
}

const CourseItem = ({ item }: CourseItemProps) => {
  const navigate = useNavigate();

  console.log("item: ", item);

  return (
    <Box
      onClick={() => navigate(`/course/${item.courseId}`)}
      sx={{
        position: "relative",
        width: "100%",
        height: 110,
        overflow: "hidden",
        borderRadius: 3,
        cursor: "pointer",
      }}
    >
      {/* 배경 이미지 */}
      <Box
        component="img"
        src={item.thumbnailUrl}
        alt={item.title}
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "blur(2px)",
          transform: "scale(1.03)",
        }}
      />

      {/* 어두운 그라데이션 */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.7), rgba(0,0,0,0.1))",
        }}
      />

      {/* 콘텐츠 */}
      <Box
        sx={{
          position: "absolute",
          left: 16,
          right: 60,
          top: "50%",
          transform: "translateY(-50%)",
          color: "white",
        }}
      >
        {/* 제목 */}
        <Typography
          sx={{
            fontSize: 17,
            fontWeight: 700,
            mb: 0.5,
            lineHeight: 1.3,
          }}
        >
          {item.title}
        </Typography>

        {/* 설명 */}
        <Typography
          sx={{
            fontSize: 12,
            opacity: 0.9,
            lineHeight: 1.4,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.description}
        </Typography>

        {/* 코스 정보 */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
            mt: 1,
          }}
        >
          {/* 이동 방식 */}
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 500,
              color: "rgba(255,255,255,0.95)",
            }}
          >
            {getCourseTypeLabel(item?.type)}
          </Typography>
        </Stack>
      </Box>

      {/* 이동 버튼 */}
      <IconButton
        onClick={(event) => {
          event.stopPropagation();
          navigate(`/course/${item.courseId}`);
        }}
        sx={{
          position: "absolute",
          right: 12,
          top: "50%",
          transform: "translateY(-50%)",
          width: 40,
          height: 40,
          bgcolor: "#afafaf94",
          color: "#333",
          backdropFilter: "blur(4px)",

          "&:hover": {
            bgcolor: "rgba(255,255,255,0.9)",
          },
        }}
      >
        <Typography
          sx={{
            fontSize: 22,
            lineHeight: 1,
            fontWeight: 400,
          }}
        >
          ›
        </Typography>
      </IconButton>
    </Box>
  );
};

export default CourseItem;
