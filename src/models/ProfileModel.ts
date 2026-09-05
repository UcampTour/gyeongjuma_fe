export interface MyInfoResponse {
  memberId: number;
  nickname: string;
  profileImage: string;
  difficulty: string;
  point: number;
  totalPoint: number;
  distance: number;
  visitPlaceCnt: number;
  quizCount: number;
  courseCount: number;
}

export interface ProfileData extends MyInfoResponse {
  locale: string;
}
