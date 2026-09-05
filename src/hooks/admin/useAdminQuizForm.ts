import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  fetchAdiminQuizDetail, 
  fetchAdminQuizTranslations 
} from "../../api/admin/AdminQuizApi";
import { 
  createAdminQuiz, 
  createAdminQuizTranslation 
} from "../../api/admin/AdminQuizApi";

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
  placeId: string | number;
  placeName: string;
  title: Record<string, string>;       
  description: Record<string, string>; 
  difficulty: string;
  points: number;
  isActive: boolean;
  questions: QuizQuestion[];
}

export const useAdminQuizForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  // 현재 선택된 다국어 탭 상태 ("ko", "en" 등)
  const [currentLanguage, setCurrentLanguage] = useState("ko");
  const [isLoading, setIsLoading] = useState(false);

  // 퀴즈 기본 정보 상태
  const [quizInfo, setQuizInfo] = useState<QuizInfo>({
    placeId: "",
    placeName: "",
    title: { ko: "", en: "", ja: "", zh: "" },
    description: { ko: "", en: "", ja: "", zh: "" },
    difficulty: "NORMAL", 
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
    let isMounted = true;

    const loadQuizData = async () => {
      // 1. 모드가 바뀌거나 id가 바뀔 때 즉시 폼 초기화 (이전 데이터 잔상 방지)
      if (!isEditMode || !id) {
        if (isMounted) {
          setQuizInfo({
            placeId: "",
            placeName: "",
            title: { ko: "", en: "", ja: "", zh: "" },
            description: { ko: "", en: "", ja: "", zh: "" },
            difficulty: "NORMAL",
            points: 100,
            isActive: true,
            questions: [],
          });
          setQuestions([
            {
              questionTitle: { ko: "", en: "", ja: "", zh: "" },
              options: { ko: ["", "", "", ""], en: ["", "", "", ""], ja: ["", "", "", ""], zh: ["", "", "", ""] },
              answerIdx: 0,
            },
          ]);
        }
        return;
      }

      // 수정 모드 진입 시 로딩 시작 및 화면 초기화
      if (isMounted) {
        setIsLoading(true);
        setQuizInfo({
          placeId: "",
          placeName: "",
          title: { ko: "", en: "", ja: "", zh: "" },
          description: { ko: "", en: "", ja: "", zh: "" },
          difficulty: "NORMAL",
          points: 100,
          isActive: true,
          questions: [],
        });
        setQuestions([]);
      }

      try {
        // 2. 새로운 id의 상세 정보와 번역 데이터를 병렬로 직접 호출
        const numericId = Number(id);
        const [detailData, transData] = await Promise.all([
          fetchAdiminQuizDetail(numericId),
          fetchAdminQuizTranslations(numericId).catch(() => []), 
        ]);

        console.log(transData);

        if (!isMounted) return;

        const qSet = detailData?.quizSet;
        const originQuestions = detailData?.questions || [];

        const newTitle: Record<string, string> = {
          ko: qSet?.title || "",
          en: "",
          ja: "",
          zh: "",
        };

        const newDescription: Record<string, string> = {
          ko: qSet?.description || "",
          en: "",
          ja: "",
          zh: "",
        };

        const langDataMap: Record<string, { title: string; desc: string; questionsMap: Map<number, any> }> = {
          en: { title: "", desc: "", questionsMap: new Map() },
          ja: { title: "", desc: "", questionsMap: new Map() },
          zh: { title: "", desc: "", questionsMap: new Map() },
        };

        if (Array.isArray(transData)) {
          transData.forEach((transItem: any) => {
            const lang = transItem.language;
            if (langDataMap[lang]) {
              langDataMap[lang].title = transItem.title || "";
              langDataMap[lang].desc = transItem.description || "";
              newTitle[lang] = transItem.title || "";
              newDescription[lang] = transItem.description || "";

              if (Array.isArray(transItem.questions)) {
                transItem.questions.forEach((q: any) => {
                  langDataMap[lang].questionsMap.set(q.originQuizId, q);
                });
              }
            }
          });
        }

        setQuizInfo({
          placeId: qSet?.placeId || "",
          placeName: qSet?.placeName || "",
          title: newTitle,
          description: newDescription,
          difficulty: qSet?.difficulty || "NORMAL",
          points: 100,
          isActive: qSet?.isActive ?? true,
          questions: [],
        });

        const mappedQuestions: QuizQuestion[] = originQuestions.map((originQ: any) => {
          const qId = originQ.quizId;

          const questionTitleMap: Record<string, string> = {
            ko: originQ.question || "",
            en: langDataMap["en"].questionsMap.get(qId)?.question || "",
            ja: langDataMap["ja"].questionsMap.get(qId)?.question || "",
            zh: langDataMap["zh"].questionsMap.get(qId)?.question || "",
          };

          const optionsMap: Record<string, string[]> = {
            ko: ["", "", "", ""],
            en: ["", "", "", ""],
            ja: ["", "", "", ""],
            zh: ["", "", "", ""],
          };

          let detectedAnswerIdx = 0;

          if (Array.isArray(originQ.answers)) {
            originQ.answers.forEach((ans: any, aIdx: number) => {
              optionsMap["ko"][aIdx] = ans.content || "";
              if (ans.isCorrect) {
                detectedAnswerIdx = aIdx;
              }
            });
          }

          ["en", "ja", "zh"].forEach((lang) => {
            const transQ = langDataMap[lang].questionsMap.get(qId);
            if (transQ && Array.isArray(transQ.answers)) {
              transQ.answers.forEach((ans: any, aIdx: number) => {
                optionsMap[lang][aIdx] = ans.content || "";
              });
            }
          });

          return {
            questionTitle: questionTitleMap,
            options: optionsMap,
            answerIdx: detectedAnswerIdx,
          };
        });

        setQuestions(mappedQuestions);
      } catch (error) {
        console.error("퀴즈 데이터를 불러오는 중 오류 발생:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadQuizData();

    return () => {
      isMounted = false;
    };
  }, [id, isEditMode]);

  // 기본 정보 입력 핸들러
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const actionText = isEditMode ? "수정" : "등록";
    
    if (!window.confirm(`퀴즈를 ${actionText}하시겠습니까?`)) return;

    try {
      if (!isEditMode) {
        const createPayload = {
          placeId: Number(quizInfo.placeId),
          title: quizInfo.title["ko"],
          description: quizInfo.description["ko"],
          difficulty: quizInfo.difficulty,
          language: "ko",
          questions: questions.map((q) => ({
            question: q.questionTitle["ko"],
            answers: (q.options["ko"] || []).map((optText, oIdx) => ({
              content: optText,
              isCorrect: oIdx === q.answerIdx,
            })),
          })),
        };

        const apiResponse = await createAdminQuiz(createPayload);
        const newQuizId = Number(apiResponse?.quizSet?.placeQuizInfoId);

        if (!newQuizId || isNaN(newQuizId)) {
          alert("생성된 퀴즈 세트 ID를 가져오지 못했습니다.");
          return;
        }

        const languagesToTranslate = SUPPORTED_LANGUAGES.map(l => l.code).filter(code => code !== "ko");
        
        for (const lang of languagesToTranslate) {
          const langTitle = quizInfo.title[lang];
          if (langTitle && langTitle.trim() !== "") {
            const translationPayload = {
              language: lang,
              title: langTitle,
              description: quizInfo.description[lang] || "",
              questions: questions.map((q, qIndex) => {
                const targetQuestion = apiResponse.questions?.[qIndex];
                const originQuizId = Number(targetQuestion?.quizId ?? targetQuestion?.id ?? (qIndex + 1));

                return {
                  originQuizId: isNaN(originQuizId) ? 0 : originQuizId,
                  question: q.questionTitle[lang] || "",
                  answers: (q.options[lang] || ["", "", "", ""]).map((optText, oIdx) => ({
                    content: optText,
                    isCorrect: oIdx === q.answerIdx,
                  })),
                };
              }),
            };

            await createAdminQuizTranslation({
              placeQuizInfoId: newQuizId,
              requestData: translationPayload,
            });
          }
        }

        alert(`퀴즈가 성공적으로 ${actionText}되었습니다!`);
        navigate("/admin/quizzes");

      } else {
        alert("수정 기능 완료 처리");
        navigate("/admin/quizzes");
      }
    } catch (error) {
      console.error("퀴즈 저장 중 오류 발생:", error);
      alert("퀴즈 저장에 실패했습니다. 입력값을 확인해주세요.");
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
    isLoading,
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