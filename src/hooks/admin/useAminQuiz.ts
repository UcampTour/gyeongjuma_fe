import { useState } from "react";

const dummyQuizData = [
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

const useAdminQuiz = () => {

  const [quizzes, setQuizzes] = useState(dummyQuizData);
  const [keyword, setKeyword] = useState("");
  const [useFlag, setUseFlag] = useState("all");
  const [difficulty, setDifficulty] = useState("all");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
}