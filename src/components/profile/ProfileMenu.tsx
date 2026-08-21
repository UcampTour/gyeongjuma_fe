import BookmarkIcon from "@mui/icons-material/Bookmark";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EditIcon from "@mui/icons-material/Edit";
import MapIcon from "@mui/icons-material/Map";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, Card, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonDialog from "../common/CommonDialog";

const ProfileMenu = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {/* 발자취 메뉴*/}
        <Card
          elevation={0}
          onClick={() => navigate("/profile/timeline")}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "#FFFFFF",
            borderRadius: "16px",
            p: 2.2,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(142,114,73,0.04)",
            border: "1px solid #EFECE6",
            transition: "transform 0.15s ease, border-color 0.15s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              borderColor: "#AC8E61",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: "12px",
                bgcolor: "#F5F2EB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#AC8E61",
              }}
            >
              <MapIcon />
            </Box>
            <Box>
              <Typography
                sx={{ fontWeight: 800, fontSize: "15px", color: "#111111" }}
              >
                내 발자취 모음
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#958D80" }}>
                나의 탐험 기록 보기
              </Typography>
            </Box>
          </Box>
          <ChevronRightIcon sx={{ color: "#B8B0A2" }} />
        </Card>

        {/* 찜한 관광지 메뉴*/}
        <Card
          elevation={0}
          onClick={() => navigate("/profile/bookmark")}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "#FFFFFF",
            borderRadius: "16px",
            p: 2.2,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(142,114,73,0.04)",
            border: "1px solid #EFECE6",
            transition: "transform 0.15s ease, border-color 0.15s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              borderColor: "#AC8E61",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: "12px",
                bgcolor: "#FAF1F1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#C05656",
              }}
            >
              <BookmarkIcon />
            </Box>
            <Box>
              <Typography
                sx={{ fontWeight: 800, fontSize: "15px", color: "#111111" }}
              >
                즐겨찾기 장소
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#958D80" }}>
                내가 찜한 관광지 리스트 확인
              </Typography>
            </Box>
          </Box>
          <ChevronRightIcon sx={{ color: "#B8B0A2" }} />
        </Card>

        {/* 포인트 교환소 메뉴 */}
        <Card
          elevation={0}
          onClick={() => setModalOpen(true)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "#FFFFFF",
            borderRadius: "16px",
            p: 2.2,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(142,114,73,0.04)",
            border: "1px solid #EFECE6",
            transition: "transform 0.15s ease, border-color 0.15s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              borderColor: "#AC8E61",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: "12px",
                bgcolor: "#FDF8F0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#D4A373",
              }}
            >
              <CardGiftcardIcon />
            </Box>
            <Box>
              <Typography
                sx={{ fontWeight: 800, fontSize: "15px", color: "#111111" }}
              >
                포인트 교환소
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#958D80" }}>
                모은 포인트로 상품 및 쿠폰 교환
              </Typography>
            </Box>
          </Box>
          <ChevronRightIcon sx={{ color: "#B8B0A2" }} />
        </Card>

        {/* 프로필 수정 메뉴 */}
        <Card
          elevation={0}
          onClick={() => navigate("/profile/edit")}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "#FFFFFF",
            borderRadius: "16px",
            p: 2.2,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(142,114,73,0.04)",
            border: "1px solid #EFECE6",
            transition: "transform 0.15s ease, border-color 0.15s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              borderColor: "#AC8E61",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: "12px",
                bgcolor: "#F0F4F8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#4A709C",
              }}
            >
              <EditIcon />
            </Box>
            <Box>
              <Typography
                sx={{ fontWeight: 800, fontSize: "15px", color: "#111111" }}
              >
                내 정보 수정
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#958D80" }}>
                닉네임 및 기타 정보 변경
              </Typography>
            </Box>
          </Box>
          <ChevronRightIcon sx={{ color: "#B8B0A2" }} />
        </Card>

        {/* 더보기 메뉴 */}
        <Card
          elevation={0}
          onClick={() => navigate("/profile/more")}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "#FFFFFF",
            borderRadius: "16px",
            p: 2.2,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(142,114,73,0.04)",
            border: "1px solid #EFECE6",
            transition: "transform 0.15s ease, border-color 0.15s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              borderColor: "#AC8E61",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: "12px",
                bgcolor: "#F3F3F3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#666666",
              }}
            >
              <MoreHorizIcon />
            </Box>
            <Box>
              <Typography
                sx={{ fontWeight: 800, fontSize: "15px", color: "#111111" }}
              >
                더보기
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#958D80" }}>
                계정 및 서비스 안내
              </Typography>
            </Box>
          </Box>
          <ChevronRightIcon sx={{ color: "#B8B0A2" }} />
        </Card>
      </Box>

      {/* 포인트 교환소 미구현 안내 다이얼로그 */}
      <CommonDialog
        open={modalOpen}
        type="alert"
        title="서비스 준비 중"
        message="업데이트 예정입니다."
        confirmText="확인"
        onConfirm={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      />
    </>
  );
};

export default ProfileMenu;
