import { useEffect, useMemo, useState } from "react"
import { QuizCategory, type QuizListItem } from "../models/QuizModel"
import { fetchQuizList } from "../api/quizService";

export const useQuizList = () => {

  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>(QuizCategory.ALL);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizListItem | null>(null);
  const [quizData, setQuizData] = useState<QuizListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getQuizzes = async () => {
      try {
        setIsLoading(true);
        const data = await fetchQuizList();
        console.log("호출 성공!!!");
        setQuizData(data.quizList);
      } catch (error) {
        console.error("퀴즈 목록 불러오기 실패: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    getQuizzes();
  }, []);

  const filteredQuizList = useMemo(() => {

    return quizData.filter((quiz) => {
      return selectedCategory === QuizCategory.ALL || quiz.quizStatus === selectedCategory;
    });
  }, [quizData, selectedCategory]);

  const handleQuizClick = (quiz: QuizListItem) => {
    setSelectedQuiz(quiz);
    setDrawerOpen(true);
  }

  const drawerClose = () => {
    setDrawerOpen(false);
    setSelectedQuiz(null);
  }

  return {
    selectedCategory,
    setSelectedCategory,
    quizList: filteredQuizList,
    drawerOpen,
    selectedQuiz,
    handleQuizClick,
    drawerClose,
    isLoading
  }
}

