import BookmarkIcon from "@mui/icons-material/Bookmark";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EditIcon from "@mui/icons-material/Edit";
import MapIcon from "@mui/icons-material/Map";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, Card, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CommonDialog from "../common/CommonDialog";

const ProfileMenu = () => {
  const { t } = useTranslation("profile");
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
                {t("timelineMenuTitle")}
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#958D80" }}>
                {t("timelineMenuDesc")}
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
                {t("bookmarkMenuTitle")}
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#958D80" }}>
                {t("bookmarkMenuDesc")}
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
                {t("exchangeMenuTitle")}
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#958D80" }}>
                {t("exchangeMenuDesc")}
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
                {t("editMenuTitle")}
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#958D80" }}>
                {t("editMenuDesc")}
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
                {t("moreMenuTitle")}
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#958D80" }}>
                {t("moreMenuDesc")}
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
        title={t("dialogTitle")}
        message={t("dialogMessage")}
        confirmText={t("dialogConfirm")}
        onConfirm={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      />
    </>
  );
};

export default ProfileMenu;