import type { SelectChangeEvent } from "@mui/material";
import { useMemo, useState, type ChangeEvent } from "react";
import { useAdminQuizListQuery } from "../../queries/admin/useAdminQuizQuery";

export interface QuizItem {
  description: string;
  difficulty: string;
  isActive: boolean;
  language: string;
  placeId: number;
  placeName: string;
  placeQuizInfoId: number;
  questionCnt: number;
  title: string;
}

export const useAdminQuiz = () => {

  const  { data, isLoading } = useAdminQuizListQuery();
  console.log(data);
  const quizList = data?.quizSets ?? [];
   
  const [keyword, setKeyword] = useState("");
  const [useFlag, setUseFlag] = useState("all");
  const [difficulty, setDifficulty] = useState("all");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // 퀴즈 필터링
  const filteredQuizzes = useMemo(() => {

    const targetKeyword = keyword.trim().toLowerCase();

    return quizList.filter((quiz: QuizItem) => {

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
  }, [quizList, keyword, useFlag, difficulty]);

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