import { useMemo, useState } from "react"
import { QuizFilter, type QuizFilterType } from "../models/QuizModel"
import { dummyQuizListData } from "../data/quiz/QuizData";

export const useQuizList = () => {

  const [selectedCategory, setSelectedCategory] = useState<QuizFilterType>(QuizFilter.ALL);

  const filteredQuizList = useMemo(() => {

    return dummyQuizListData.filter((quiz) => {
      return selectedCategory === QuizFilter.ALL || quiz.quizStatus === selectedCategory;
    });
  }, [selectedCategory]);

  return {
    selectedCategory,
    setSelectedCategory,
    quizList: filteredQuizList,
  }
}

