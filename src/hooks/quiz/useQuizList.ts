import { useEffect, useMemo, useState } from "react";
import { fetchQuizList } from "../../api/quizApi";
import {
  QuizCategory,
  QuizStatus,
  type QuizListItem,
} from "../../models/QuizModel";

const STATUS_PRIORITY: QuizStatus[] = [
  QuizStatus.PROGRESS, // 진행중
  QuizStatus.AVAILABLE, // 도전가능
  QuizStatus.COMPLETED, // 도전완료
  QuizStatus.LOCKED, // 잠김
];

export const useQuizList = (placeId?: number) => {
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>(
    QuizCategory.ALL,
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizListItem | null>(null);

  const [quizData, setQuizData] = useState<QuizListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect를 이용해 직접 데이터 호출
  useEffect(() => {
    const getQuizList = async () => {
      try {
        setIsLoading(true);
        const data = await fetchQuizList();
        setQuizData(data?.quizList ?? []);
      } catch (error) {
        console.error("퀴즈 리스트를 불러오는데 실패했습니다.", error);
      } finally {
        setIsLoading(false);
      }
    };

    getQuizList();
  }, []);

  // 전체 데이터에 우선순위 정렬 적용
  const sortedQuizData = useMemo(() => {
    return [...quizData].sort((a, b) => {
      const indexA = STATUS_PRIORITY.indexOf(a.quizStatus);
      const indexB = STATUS_PRIORITY.indexOf(b.quizStatus);

      const priorityA = indexA === -1 ? 999 : indexA;
      const priorityB = indexB === -1 ? 999 : indexB;

      return priorityA - priorityB;
    });
  }, [quizData]);

  // 정렬된 데이터 기반으로 필터링 수행
  const filteredQuizList = useMemo(() => {
    return sortedQuizData.filter((quiz) => {
      return (
        selectedCategory === QuizCategory.ALL ||
        quiz.quizStatus === selectedCategory
      );
    });
  }, [sortedQuizData, selectedCategory]);

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
    quizData: sortedQuizData,
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
