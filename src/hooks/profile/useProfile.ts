import { useState } from "react";

export interface ProfileData {
  nickname: string;
  profileImgUrl: string | null;
  difficulty: string;
  locale: string;
  distance: number;
  point: number;
  totalPoint: number;
  visitCount: number;
  quizCount: number;
  courseCount: number;
}

export const useProfile = () => {

  const [profileData, setProfileData] = useState<ProfileData>({
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
  });

  return {
    profileData,
    setProfileData,
  };
  
};