import { Box, Card, Chip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface ProfileCardProps {
  profileImgUrl: string | null;
  difficulty: string;
  locale: string;
  nickname: string;
  point: number;
  totalPoint: number;
}

const ProfileCard = ({
  profileImgUrl,
  difficulty,
  locale,
  nickname,
  point,
  totalPoint
}: ProfileCardProps) => {
  const { t } = useTranslation("profile"); // 💡 네임스페이스 지정

  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: "#FFFFFF",
        borderRadius: "20px",
        p: 2.5,
        mb: 2,
        boxShadow: "0 8px 24px rgba(142,114,73,0.06)",
        border: "1px solid #EFECE6",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2.5 }}>
        <Box
          sx={{
            width: 60, height: 60, borderRadius: "50%", bgcolor: "#F5F2EB",
            display: "flex", alignItems: "center", justifyContent: "center", mr: 2,
            overflow: "hidden", border: "2px solid #E3DCCE",
            flexShrink: 0
          }}
        >
          {profileImgUrl ? (
            <img src={profileImgUrl} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <Typography sx={{ fontSize: "24px" }}>🧑‍💻</Typography>
          )}
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.8, flexWrap: "wrap" }}>
            <Chip 
              label={`${t("difficultyLabel")}: ${difficulty}`} 
              size="small" 
              sx={{ height: 18, fontSize: "10px", fontWeight: 700, bgcolor: "#FAF8F5", color: "#AC8E61", border: "1px solid #E3DCCE" }} 
            />
            <Chip 
              label={`${t("localeLabel")}: ${locale}`} 
              size="small" 
              sx={{ height: 18, fontSize: "10px", fontWeight: 700, bgcolor: "#FAF8F5", color: "#958D80", border: "1px solid #E3DCCE" }} 
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
            <Typography sx={{ fontWeight: 800, fontSize: "18px", color: "#111111" }}>
              {nickname}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex", bgcolor: "#FAF8F5", borderRadius: "14px", py: 1.5,
          border: "1px solid #F0ECE1",
        }}
      >
        <Box sx={{ flex: 1, textAlign: "center" }}>
          <Typography sx={{ fontSize: "12px", color: "#958D80", mb: 0.3 }}>{t("currentPoint")}</Typography>
          <Typography sx={{ fontWeight: 800, fontSize: "16px", color: "#AC8E61" }}>{point.toLocaleString()}P</Typography>
        </Box>
        <Box sx={{ width: "1px", bgcolor: "#E3DCCE", my: 0.5 }} />
        <Box sx={{ flex: 1, textAlign: "center" }}>
          <Typography sx={{ fontSize: "12px", color: "#958D80", mb: 0.3 }}>{t("totalPoint")}</Typography>
          <Typography sx={{ fontWeight: 800, fontSize: "16px", color: "#111111" }}>{totalPoint.toLocaleString()}P</Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default ProfileCard;