import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// 다국어 지원 언어 리스트
export const SUPPORTED_LANGUAGES = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
  { code: "zh", label: "中文" },
];

export interface QuizQuestion {
  questionTitle: Record<string, string>; 
  options: Record<string, string[]>;    
  answerIdx: number;
}

export interface QuizInfo {
  placeId: string;
  placeName: string;
  title: Record<string, string>;       
  description: Record<string, string>; 
  difficulty: string;
  points: number;
  isActive: boolean;
  questions: QuizQuestion[];
}

const quizData = {
  quizInfo: {
    placeId: "1",
    placeName: "경복궁 흥례문",
    title: { ko: "경복궁 역사 문화 퀴즈", en: "Gyeongbokgung History Quiz", ja: "景福宮歴史クイズ", zh: "景福宫历史文化测验" },
    description: { 
      ko: "경복궁의 중심 건물과 역사에 대해 얼마나 알고 계시나요?", 
      en: "How much do you know about Gyeongbokgung?", 
      ja: "景福宮についてどれくらい知っていますか？", 
      zh: "您对景福宫了解多少？" 
    },
    difficulty: "MEDIUM",
    points: 100,
    isActive: true,
    questions: [
      {
        questionTitle: { ko: "경복궁의 정문은?", en: "What is the main gate?", ja: "景福宮の正門は？", zh: "景福宫的正门是？" },
        options: { ko: ["광화문", "흥례문", "근정문", "수정문"], en: ["Gwanghwamun", "Heungnyemun", "Geunjeongmun", "Sujeongmun"], ja: ["光化門", "興礼門", "勤政門", "修政門"], zh: ["光化门", "兴礼门", "勤政门", "修政门"] },
        answerIdx: 1,
      },
    ],
  },
};

export const useAdminQuizForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  // 현재 선택된 다국어 탭 상태 ("ko", "en" 등)
  const [currentLanguage, setCurrentLanguage] = useState("ko");

  // 퀴즈 기본 정보 상태
  const [quizInfo, setQuizInfo] = useState<QuizInfo>({
    placeId: "",
    placeName: "",
    title: { ko: "", en: "", ja: "", zh: "" },
    description: { ko: "", en: "", ja: "", zh: "" },
    difficulty: "MEDIUM",
    points: 100,
    isActive: true,
    questions: [],
  });

  // 퀴즈 문제 목록 상태
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      questionTitle: { ko: "", en: "", ja: "", zh: "" },
      options: {
        ko: ["", "", "", ""],
        en: ["", "", "", ""],
        ja: ["", "", "", ""],
        zh: ["", "", "", ""],
      },
      answerIdx: 0,
    },
  ]);

  useEffect(() => {
    if (isEditMode) {
      setQuizInfo({
        placeId: quizData.quizInfo.placeId,
        placeName: quizData.quizInfo.placeName,
        title: quizData.quizInfo.title,
        description: quizData.quizInfo.description,
        difficulty: quizData.quizInfo.difficulty,
        points: quizData.quizInfo.points,
        isActive: quizData.quizInfo.isActive,
        questions: quizData.quizInfo.questions,
      });
      setQuestions(quizData.quizInfo.questions);
    }
  }, [isEditMode]);

  // 기본 정보 입력 핸들러 (다국어 필드 분기 처리 포함)
  const handleQuizInfoChange = (field: string, value: any) => {
    if (field === "title" || field === "description") {
      setQuizInfo((prev) => ({
        ...prev,
        [field]: { ...prev[field as "title" | "description"], [currentLanguage]: value },
      }));
    } else {
      setQuizInfo((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        questionTitle: { ko: "", en: "", ja: "", zh: "" },
        options: { ko: ["", "", "", ""], en: ["", "", "", ""], ja: ["", "", "", ""], zh: ["", "", "", ""] },
        answerIdx: 0,
      },
    ]);
  };

  const handleRemoveQuestion = (idx: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleQuestionTitleChange = (index: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === index
          ? { ...q, questionTitle: { ...q.questionTitle, [currentLanguage]: value } }
          : q
      )
    );
  };

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q, qi) => {
        if (qi !== qIndex) return q;
        const currentLangOptions = [...(q.options[currentLanguage] || ["", "", "", ""])];
        currentLangOptions[oIndex] = value;
        return {
          ...q,
          options: { ...q.options, [currentLanguage]: currentLangOptions },
        };
      })
    );
  };

  const handleAnswerChange = (qIndex: number, oIndex: number) => {
    setQuestions((prev) =>
      prev.map((q, qi) => (qi === qIndex ? { ...q, answerIdx: oIndex } : q))
    );
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const actionText = isEditMode ? "수정" : "등록";
    if (window.confirm(`${actionText}하시겠습니까?`)) {
      alert(`퀴즈가 성공적으로 ${actionText}되었습니다!`);
      navigate("/admin/quizzes");
    }
  };

  const handleDelete = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      alert("퀴즈가 삭제되었습니다.");
      navigate("/admin/quizzes");
    }
  };

  return {
    quizInfo,
    questions,
    isEditMode,
    currentLanguage,
    setCurrentLanguage,
    handleQuizInfoChange,
    handleAddQuestion,
    handleRemoveQuestion,
    handleQuestionTitleChange,
    handleOptionChange,
    handleAnswerChange,
    handleSubmit,
    handleDelete,
  };
};