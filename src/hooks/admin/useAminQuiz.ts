import type { SelectChangeEvent } from "@mui/material";
import { useMemo, useState, type ChangeEvent } from "react";
import { useAdminQuizListQuery } from "../../queries/admin/useAdminQuizQuery";

export interface QuizItem {
  quizId: number;
  placeId: number;
  placeName: string;
  title: string;
  difficulty: string;
  isActive: boolean;
}

const dummyQuizData: QuizItem[] = [
  {
    quizId: 1,
    placeId: 101,
    placeName: "불국사",
    title: "불국사 다보탑의 비밀",
    difficulty: "HIGH",
    isActive: true,
  },
  {
    quizId: 2,
    placeId: 102,
    placeName: "석굴암",
    title: "석굴암 본존불의 방향",
    difficulty: "MEDIUM",
    isActive: true,
  },
  {
    quizId: 3,
    placeId: 103,
    placeName: "첨성대",
    title: "첨성대 구조 개수",
    difficulty: "LOW",
    isActive: false,
  },
  {
    quizId: 4,
    placeId: 104,
    placeName: "동궁과 월지",
    title: "동궁과 월지의 옛 이름",
    difficulty: "MEDIUM",
    isActive: true,
  },
]

export const useAdminQuiz = () => {

  const  { data, isLoading } = useAdminQuizListQuery();
  console.log(data);
   
  const [quizzes, setQuizzes] = useState<QuizItem[]>(dummyQuizData);
  const [keyword, setKeyword] = useState("");
  const [useFlag, setUseFlag] = useState("all");
  const [difficulty, setDifficulty] = useState("all");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // 퀴즈 필터링
  const filteredQuizzes = useMemo(() => {

    const targetKeyword = keyword.trim().toLowerCase();

    return quizzes.filter((quiz) => {

      // 1. 검색어 필터
      const matchesSearch =
        !targetKeyword ||
        quiz.title.toLowerCase().includes(targetKeyword) ||
        quiz.placeName.toLowerCase().includes(targetKeyword);
      
      // 2. 사용 상태 필터
      const matchesUsage = 
        useFlag === "all" ||
        (useFlag === "active" && quiz.isActive === true) ||
        (useFlag === "inactive" && quiz.isActive === false);

      // 3. 난이도 필터
      const matchesDifficulty = 
        difficulty === "all" || 
        quiz.difficulty === difficulty;

      return matchesSearch && matchesUsage && matchesDifficulty;
    })
  }, [quizzes, keyword, useFlag, difficulty]);

  // 퀴즈 페이징
  const paginatedQuizzes = useMemo(() => {

    const startIdx = page * rowsPerPage;

    return filteredQuizzes.slice(startIdx, startIdx + rowsPerPage);
  }, [filteredQuizzes, page, rowsPerPage]);

  const handleChangePage = (e: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setKeyword(e.target.value);
    setPage(0);
  };

  const handleUsageChange = (e: SelectChangeEvent) => {
    setUseFlag(e.target.value);
    setPage(0);
  };

  const handleDifficultyChange = (e: SelectChangeEvent) => {
    setDifficulty(e.target.value);
    setPage(0);
  };

  return {
    keyword,
    useFlag,
    difficulty,
    page,
    rowsPerPage,
    filteredQuizzes,
    paginatedQuizzes,
    handleSearchChange,
    handleUsageChange,
    handleDifficultyChange,
    handleChangePage,
    handleChangeRowsPerPage,
  };
};