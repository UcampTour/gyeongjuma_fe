import { Box, Card, Typography, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageHeader from "../../components/common/PageHeader";
import CommonDialog from "../../components/common/CommonDialog";
import { logout as logoutApi, withdraw as withdrawApi } from "../../api/authApi";
import { useAuthStore } from "../../store/useAuthStore";

const ProfileMorePage = () => {
  const { t } = useTranslation("profile"); // 필요한 키들이 포함된 네임스페이스 지정
  const navigate = useNavigate();
  const { logout: clearAuthStore } = useAuthStore(); // authStore의 로그아웃(상태 초기화) 함수

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"alert" | "confirm">("alert");
  const [modalConfig, setModalConfig] = useState({
    title: t("modalServiceTitle"),
    message: t("modalServiceMessage"),
  });
  
  // 현재 어떤 모달(작업)이 열려있는지 구분하기 위한 상태
  const [currentAction, setCurrentAction] = useState<"service" | "logout" | "withdraw">("service");

  const handleOpenModal = (type: "service" | "logout" | "withdraw") => {
    setCurrentAction(type);
    if (type === "logout") {
      setModalType("confirm"); 
      setModalConfig({
        title: t("modalLogoutTitle"),
        message: t("modalLogoutMessage"),
      });
    } else if (type === "withdraw") {
      setModalType("confirm"); 
      setModalConfig({
        title: t("modalWithdrawTitle"),
        message: t("modalWithdrawMessage"),
      });
    } else {
      setModalType("alert"); 
      setModalConfig({
        title: t("modalServiceTitle"),
        message: t("modalServiceMessage"),
      });
    }
    setModalOpen(true);
  };

  // 💡 모달 확인 버튼 클릭 시 실행될 실제 로직
  const handleConfirm = async () => {
    setModalOpen(false);

    if (currentAction === "logout") {
      try {
        await logoutApi(); // 서버 로그아웃 API 호출
      } catch (error) {
        console.error("로그아웃 API 호출 실패:", error);
      } finally {
        clearAuthStore(); // 스토어 상태 초기화 및 토큰 삭제
        alert(t("alertLogoutSuccess"));
        navigate("/login", { replace: true });
      }
    } else if (currentAction === "withdraw") {
      try {
        await withdrawApi(); // 회원 탈퇴 API 호출
        clearAuthStore(); // 스토어 상태 초기화 및 토큰 삭제
        alert(t("alertWithdrawSuccess"));
        navigate("/login", { replace: true });
      } catch (error) {
        console.error("회원 탈퇴 실패:", error);
        alert(t("alertWithdrawFail"));
      }
    }
  };

  // 서비스 안내 목록 데이터 (컴포넌트 외부 또는 내부 상수화)
  const serviceItems = [
    { title: t("noticeTitle"), icon: "📌", desc: t("noticeDesc") },
    { title: t("faqTitle"), icon: "💬", desc: t("faqDesc") },
    { title: t("termsTitle"), icon: "📜", desc: t("termsDesc") },
    { title: t("versionTitle"), icon: "🚀", desc: t("versionDesc") },
  ];

  return (
    <>
      <Box sx={{ bgcolor: "#F7F5EE", minHeight: "100vh", pb: 16 }}>
        <PageHeader title={t("pageTitleMore")} />

        <Box sx={{ px: 2, pt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          
          {/* 서비스 안내 및 지원 카드 */}
          <Card
            elevation={0}
            sx={{
              bgcolor: "#FFFFFF",
              borderRadius: "20px",
              p: 2.5,
              boxShadow: "0 8px 24px rgba(142,114,73,0.06)",
              border: "1px solid #EFECE6",
            }}
          >
            <Typography sx={{ fontWeight: 800, fontSize: "15px", color: "#111111", mb: 2 }}>
              {t("serviceSectionTitle")}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
              {serviceItems.map((item, index) => (
                <Box
                  key={index}
                  onClick={() => handleOpenModal("service")}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    bgcolor: "#FAF8F5",
                    border: "1px solid #F0ECE1",
                    borderRadius: "14px",
                    px: 2,
                    py: 1.5,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    "&:hover": { 
                      borderColor: "#AC8E61",
                      bgcolor: "#F5F1EB",
                    }
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box 
                      sx={{ 
                        width: "36px", 
                        height: "36px", 
                        borderRadius: "10px", 
                        bgcolor: "#FFFFFF", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        fontSize: "16px",
                        boxShadow: "0 2px 6px rgba(142,114,73,0.04)"
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "14px", fontWeight: 700, color: "#111111" }}>
                        {item.title}
                      </Typography>
                      <Typography sx={{ fontSize: "11px", fontWeight: 500, color: "#958D80" }}>
                        {item.desc}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography sx={{ fontSize: "13px", color: "#AC8E61", fontWeight: 700 }}>
                    &gt;
                  </Typography>
                </Box>
              ))}
            </Box>
          </Card>

          {/* 계정 관리 카드 */}
          <Card
            elevation={0}
            sx={{
              bgcolor: "#FFFFFF",
              borderRadius: "20px",
              p: 2.5,
              boxShadow: "0 8px 24px rgba(142,114,73,0.06)",
              border: "1px solid #F0ECE1",
            }}
          >
            <Typography sx={{ fontWeight: 800, fontSize: "15px", color: "#111111", mb: 2 }}>
              {t("accountSectionTitle")}
            </Typography>

            <Box sx={{ display: "flex", gap: 1.5 }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => handleOpenModal("logout")}
                sx={{
                  borderColor: "#EFECE6",
                  bgcolor: "#FAF8F5",
                  color: "#555555",
                  borderRadius: "14px",
                  py: 1.5,
                  fontWeight: 700,
                  fontSize: "13px",
                  "&:hover": {
                    bgcolor: "#F5F1EB",
                    borderColor: "#AC8E61",
                  }
                }}
              >
                {t("btnLogout")}
              </Button>
              
              <Button
                variant="outlined"
                fullWidth
                onClick={() => handleOpenModal("withdraw")}
                sx={{
                  borderColor: "#FFCDD2",
                  bgcolor: "#FFF8F8",
                  color: "#D32F2F",
                  borderRadius: "14px",
                  py: 1.5,
                  fontWeight: 700,
                  fontSize: "13px",
                  "&:hover": {
                    bgcolor: "#FFEBEE",
                    borderColor: "#E57373",
                  }
                }}
              >
                {t("btnWithdraw")}
              </Button>
            </Box>
          </Card>

        </Box>
      </Box>

      <CommonDialog
        open={modalOpen}
        type={modalType}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={t("dialogConfirm")}
        cancelText={t("dialogCancel")}
        onConfirm={handleConfirm}
        onCancel={() => setModalOpen(false)}
      />
    </>
  );
};

export default ProfileMorePage;