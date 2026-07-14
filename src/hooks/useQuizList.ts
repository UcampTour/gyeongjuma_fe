import { useMemo, useState } from "react"
import { QuizCategory } from "../models/QuizModel"
import { dummyQuizListData } from "../data/quiz/QuizData";

export const useQuizList = () => {

  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>(QuizCategory.ALL);

  const filteredQuizList = useMemo(() => {

    return dummyQuizListData.filter((quiz) => {
      return selectedCategory === QuizCategory.ALL || quiz.quizStatus === selectedCategory;
    });
  }, [selectedCategory]);

  return {
    selectedCategory,
    setSelectedCategory,
    quizList: filteredQuizList,
  }
}

