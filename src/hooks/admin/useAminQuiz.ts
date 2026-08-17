import type { SelectChangeEvent } from "@mui/material";
import { useMemo, useState, type ChangeEvent } from "react";

export interface QuizItem {
  place_quiz_info_id: number;
  place_id: number;
  place_name: string;
  title: string;
  difficulty: string;
  is_active: boolean;
}

const dummyQuizData: QuizItem[] = [
  {
    place_quiz_info_id: 1,
    place_id: 101,
    place_name: "불국사",
    title: "불국사 다보탑의 비밀",
    difficulty: "HIGH",
    is_active: true,
  },
  {
    place_quiz_info_id: 2,
    place_id: 102,
    place_name: "석굴암",
    title: "석굴암 본존불의 방향",
    difficulty: "MEDIUM",
    is_active: true,
  },
  {
    place_quiz_info_id: 3,
    place_id: 103,
    place_name: "첨성대",
    title: "첨성대 구조 개수",
    difficulty: "LOW",
    is_active: false,
  },
  {
    place_quiz_info_id: 4,
    place_id: 104,
    place_name: "동궁과 월지",
    title: "동궁과 월지의 옛 이름",
    difficulty: "MEDIUM",
    is_active: true,
  },
]

export const useAdminQuiz = () => {

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
        quiz.place_name.toLowerCase().includes(targetKeyword);
      
      // 2. 사용 상태 필터
      const matchesUsage = 
        useFlag === "all" ||
        (useFlag === "active" && quiz.is_active === true) ||
        (useFlag === "inactive" && quiz.is_active === false);

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