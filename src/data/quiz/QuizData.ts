  import { QuizStatus, type QuizListItem } from "../../models/QuizModel";

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
