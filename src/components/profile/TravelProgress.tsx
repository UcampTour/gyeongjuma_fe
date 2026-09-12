import { Box, Card, LinearProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

// 컴포넌트에서 받을 props 인터페이스 정의 (총 이동거리 제외)
interface TravelProgressProps {
  visitCount: number; // 방문 장소 수
  quizCount: number;  // 완료한 퀴즈 수
  courseCount: number;// 완료한 코스 수
} 

const TravelProgress = ({
  visitCount,
  quizCount,
  courseCount,
}: TravelProgressProps) => {
  const { t } = useTranslation("profile");

  // 1. 모든 활동(방문, 퀴즈, 코스)의 총 합산 계산
  const totalActions = visitCount + quizCount + courseCount;
  
  // 2. 최대 레벨 상한선을 위한 제한 (최대 50개 기준)
  const maxActions = 50;
  const clampedTotal = Math.min(totalActions, maxActions);
  
  // 3. 레벨 산정 로직
  // - 0 ~ 24개: Lv.1
  // - 25 ~ 49개: Lv.2
  // - 50개 이상: Lv.3 (최대 레벨)
  const currentLevel = clampedTotal >= 50 ? 3 : Math.floor(clampedTotal / 25) + 1;
  
  // 4. 레벨별 칭호 지정 (Lv.1: 초보 탐험가, Lv.2: 중급 탐험가, Lv.3: 경주 마스터)
  // 다국어 처리 키가 있다면 해당 키를 사용하고, 없다면 아래와 같이 분기할 수 있습니다.
  // 예시: t("noviceExplorer") -> 레벨별로 다른 텍스트 매핑
  const getLevelTitle = (level: number) => {
    switch (level) {
      case 1:
        return t("noviceExplorer") || "초보 탐험가"; // Lv.1
      case 2:
        return t("intermediateExplorer") || "중급 탐험가"; // Lv.2 (필요시 i18n 키 추가)
      case 3:
        return t("gyeongjuMaster") || "경주 마스터"; // Lv.3 (경주마스터)
      default:
        return t("noviceExplorer") || "초보 탐험가";
    }
  };

  // 5. 현재 레벨 구간 내 퍼센트 계산
  // - 레벨 3(50개 이상) 도달 시 프로그레스바가 가득 찬 상태(100%)로 유지
  // - 그 외 구간에서는 25개 단위를 기준으로 현재 진행률(%) 계산
  const levelPercent = currentLevel === 3 
    ? 100 
    : Math.round(((clampedTotal % 25) / 25) * 100);
  
  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: "#FFFFFF",
        borderRadius: "20px",
        p: 2.5,
        mb: 3,
        boxShadow: "0 8px 24px rgba(142,114,73,0.06)",
        border: "1px solid #EFECE6",
      }}
    >
      {/* 카드 타이틀 */}
      <Typography sx={{ fontWeight: 800, fontSize: "15px", color: "#111111", mb: 2 }}>
        ✈️ {t("travelProgressTitle")}
      </Typography>

      {/* 레벨 및 프로그레스바 영역 */}
      <Box sx={{ bgcolor: "#F7F5EE", p: 2, borderRadius: "16px", border: "1px solid #EFECE6", mb: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
          {/* 현재 레벨 및 동적 칭호 표시 */}
          <Typography sx={{ fontWeight: 800, fontSize: "14px", color: "#AC8E61" }}>
            Lv.{currentLevel} {getLevelTitle(currentLevel)}
          </Typography>
          {/* 달성률 퍼센트 표시 */}
          <Typography sx={{ fontSize: "11px", color: "#7A7265", fontWeight: 700 }}>
            {t("achievementRate")} {levelPercent}%
          </Typography>
        </Box>
        
        {/* 선형 프로그레스바 */}
        <LinearProgress 
          variant="determinate" 
          value={levelPercent} 
          sx={{
            height: 8, 
            borderRadius: 4, 
            bgcolor: "#E3DCCE",
            "& .MuiLinearProgress-bar": { bgcolor: "#AC8E61", borderRadius: 4 }
          }} 
        />
      </Box>

      {/* 하단 통계 지표 영역 (방문장소, 완료퀴즈, 완료코스 3개 배치) */}
      <Box sx={{ display: "flex", gap: 1 }}>
        {/* 방문 장소 통계 */}
        <Box sx={{ flex: 1, bgcolor: "#FAF8F5", p: 1.5, borderRadius: "12px", textAlign: "center", border: "1px solid #F0ECE1" }}>
          <Typography sx={{ fontSize: "11px", color: "#958D80", mb: 0.5, fontWeight: 600 }}>{t("visitedPlaces")}</Typography>
          <Typography sx={{ fontSize: "14px", fontWeight: 800, color: "#111111" }}>{visitCount}{t("placesUnit")}</Typography>
        </Box>

        {/* 완료 퀴즈 통계 */}
        <Box sx={{ flex: 1, bgcolor: "#FAF8F5", p: 1.5, borderRadius: "12px", textAlign: "center", border: "1px solid #F0ECE1" }}>
          <Typography sx={{ fontSize: "11px", color: "#958D80", mb: 0.5, fontWeight: 600 }}>{t("completedQuizzes")}</Typography>
          <Typography sx={{ fontSize: "14px", fontWeight: 800, color: "#4A709C" }}>{quizCount}{t("countUnit")}</Typography>
        </Box>

        {/* 완료 코스 통계 */}
        <Box sx={{ flex: 1, bgcolor: "#FAF8F5", p: 1.5, borderRadius: "12px", textAlign: "center", border: "1px solid #F0ECE1" }}>
          <Typography sx={{ fontSize: "11px", color: "#958D80", mb: 0.5, fontWeight: 600 }}>{t("completedCourses")}</Typography>
          <Typography sx={{ fontSize: "14px", fontWeight: 800, color: "#C05656" }}>{courseCount}{t("countUnit")}</Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default TravelProgress;