import { Box } from "@mui/material";
import PageHeader from "../../components/common/PageHeader";
import ProfileCard from "../../components/profile/ProfileCard";
import TravelProgress from "../../components/profile/TravelProgress";
import ProfileMenu from "../../components/profile/ProfileMenu";

const profileData = {
  nickname: "경주마스터99",
  profileImgUrl: null,
  difficulty: "NORMAL",
  locale: "KO",
  distance: 12500,
  point: 1000,
  totalPoint: 3500,
  visitCount: 4,
  quizCount: 3,
  courseCount: 1,
}

const ProfilePage = () => {

  return (
    <Box sx={{ bgcolor: "#F7F5EE", minHeight: "100vh", pb: 16 }}>
      <PageHeader title="프로필" />

      <Box sx={{ px: 2, pt: 1 }}>
        
        {/* 1. 기본 프로필 정보 카드 */}
        <ProfileCard
          difficulty={profileData.difficulty}
          locale={profileData.locale}
          nickname={profileData.nickname}
          point={profileData.point}
          totalPoint={profileData.totalPoint}
          profileImgUrl={profileData.profileImgUrl}
        />

        {/* 2. 나의 여행 진행도 카드 */}
        <TravelProgress
          courseCount={profileData.courseCount}
          distance={profileData.distance}
          quizCount={profileData.quizCount}
          visitCount={profileData.visitCount}
        />
      

        {/* 3. 상세 페이지 이동 내비게이션 카드들 */}
        <ProfileMenu />
      
      </Box>

    </Box>
  );
};

export default ProfilePage;