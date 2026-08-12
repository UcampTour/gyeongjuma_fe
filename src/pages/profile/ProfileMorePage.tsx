import { Box, Card, Typography, Button } from "@mui/material";
import PageHeader from "../../components/common/PageHeader";
import CommonDialog from "../../components/common/CommonDialog";
import { useState } from "react";

const ProfileMorePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"alert" | "confirm">("alert");
  const [modalConfig, setModalConfig] = useState({
    title: "서비스 준비 중",
    message: "업데이트 예정입니다.",
  });

  const handleOpenModal = (type: "service" | "logout" | "withdraw") => {
    if (type === "logout") {
      setModalType("confirm"); 
      setModalConfig({
        title: "로그아웃",
        message: "정말 로그아웃 하시겠습니까?",
      });
    } else if (type === "withdraw") {
      setModalType("confirm"); 
      setModalConfig({
        title: "회원 탈퇴",
        message: "정말 회원탈퇴를 진행하시겠습니까? 데이터는 복구할 수 없습니다.",
      });
    } else {
      setModalType("alert"); 
      setModalConfig({
        title: "서비스 준비 중",
        message: "업데이트 예정입니다.",
      });
    }
    setModalOpen(true);
  };

  return (
    <>
      <Box sx={{ bgcolor: "#F7F5EE", minHeight: "100vh", pb: 16 }}>
        <PageHeader title="더보기" />

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
              📢 서비스 안내
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
              {[
                { title: "공지사항", icon: "📌", desc: "서비스 최신 소식을 확인하세요" },
                { title: "자주 묻는 질문", icon: "💬", desc: "궁금하신 점을 빠르게 찾아보세요" },
                { title: "서비스 이용약관", icon: "📜", desc: "이용약관 및 정책 안내" },
                { title: "버전 정보", icon: "🚀", desc: "현재 v1.0.4 최신 버전을 사용 중입니다" },
              ].map((item, index) => (
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
              ⚙️ 계정 관리
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
                로그아웃
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
                회원탈퇴
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
        confirmText="확인"
        cancelText="취소"
        onConfirm={() => {
          setModalOpen(false);
        }}
        onCancel={() => setModalOpen(false)}
      />
    </>
  );
};

export default ProfileMorePage;