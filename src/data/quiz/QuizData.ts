  import { QuizStatus, type QuizItem, type QuizListItem } from "../../models/QuizModel";

  export const dummyQuizListData: QuizListItem[] = [
    {
      id: 1, // 첨성대
      title: "첨성대 탐험 퀴즈",
      description: "동양에서 가장 오래된 신라 시대의 천문대에 얽힌 수수께끼를 풀어보세요.",
      image: "https://picsum.photos/id/10/200",
      totalQuestions: 10,
      solvedQuestions: 4,
      quizStatus: QuizStatus.PROGRESS
    },
    {
      id: 2, // 불국사
      title: "불국사 문화재 미션",
      description: "신라 불교 문화의 정수를 보여주는 유네스코 세계문화유산의 비밀을 알아봅니다.",
      image: "https://picsum.photos/id/15/200",
      totalQuestions: 10,
      solvedQuestions: 0,
      quizStatus: QuizStatus.AVAILABLE
    },
    {
      id: 3, // 석굴암
      title: "석굴암 상식 미션",
      description: "토함산 자락에 자리 잡은 신라 시대의 대표적인 석굴 사찰 탐방 퀴즈",
      image: "https://picsum.photos/id/28/200",
      totalQuestions: 8,
      solvedQuestions: 8,
      quizStatus: QuizStatus.COMPLETED
    },
    {
      id: 5, // 대릉원
      title: "대릉원 고분군 수수께끼",
      description: "거대한 고분들이 푸른 능선을 이루는 신라 왕족의 무덤군 속 역사 이야기",
      image: "https://picsum.photos/id/48/200",
      totalQuestions: 10,
      solvedQuestions: 0, 
      quizStatus: QuizStatus.LOCKED
    },
  ];

  export const quizDetailData: QuizItem = {
    placeId: 1,
    title: "첨성대 탐험 퀴즈",
    description: "첨성대 관련 퀴즈입니다 첨성대에 대해서 맞춰보아요~",
    imageUrl: "https://picsum.photos/id/10/400",
    totalQuestions: 5,
    correctQuestions: 0,
    progressRate: 0,
    isCorrect: false,
    quizStatus: QuizStatus.AVAILABLE,
    questions: [
      { quizId: 101, question: "첨성대는 신라 시대 누구의 재위 기간에 만들어졌나요?", options: [{ answerId: 1, content: "선덕여왕" }, { answerId: 2, content: "진흥왕" }, { answerId: 3, content: "무열왕" }, { answerId: 4, content: "문무왕" }] },
      { quizId: 102, question: "첨성대의 몸통은 무엇을 사용하여 쌓았나요?", options: [{ answerId: 1, content: "화강암" }, { answerId: 2, content: "대리석" }, { answerId: 3, content: "현무암" }, { answerId: 4, content: "황토 벽돌" }] },
      { quizId: 103, question: "첨성대의 가장 높은 곳의 모양은 어떤 형태인가요?", options: [{ answerId: 1, content: "정사각형" }, { answerId: 2, content: "원형" }, { answerId: 3, content: "삼각형" }, { answerId: 4, content: "육각형" }] },
      { quizId: 104, question: "첨성대가 세워진 장소인 경주에 있는 왕궁 터는 어디인가요?", options: [{ answerId: 1, content: "월성" }, { answerId: 2, content: "대릉원" }, { answerId: 3, content: "불국사" }, { answerId: 4, content: "석굴암" }] },
      { quizId: 105, question: "첨성대의 주된 용도로 추정되는 것은?", options: [{ answerId: 1, content: "천문 관측" }, { answerId: 2, content: "곡물 저장" }, { answerId: 3, content: "망루" }, { answerId: 4, content: "불교 수행" }] }
    ]
  };
