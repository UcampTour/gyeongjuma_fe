import { useMemo, useState } from "react";
import { QuizCategory, type QuizListItem } from "../../models/QuizModel";
import { useQuizListQuery } from "../../queries/useQuizQuery";

export const useQuizList = (placeId?: number) => {
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>(
    QuizCategory.ALL,
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizListItem | null>(null);

  const { data, isLoading } = useQuizListQuery();
  const quizData = data?.quizList ?? [];

  const filteredQuizList = useMemo(() => {
    return quizData.filter((quiz) => {
      return (
        selectedCategory === QuizCategory.ALL ||
        quiz.quizStatus === selectedCategory
      );
    });
  }, [quizData, selectedCategory]);

  const handleQuizClick = (quiz: QuizListItem) => {
    setSelectedQuiz(quiz);
    setDrawerOpen(true);
  };

  const drawerClose = () => {
    setDrawerOpen(false);
    setSelectedQuiz(null);
  };

  const quizInfo = useMemo(
    () => quizData.find((quiz) => quiz.placeId === placeId),
    [quizData, placeId],
  );

  return {
    quizData,
    selectedCategory,
    setSelectedCategory,
    quizList: filteredQuizList,
    drawerOpen,
    selectedQuiz,
    handleQuizClick,
    drawerClose,
    isLoading,
    quizInfo,
  };
};
