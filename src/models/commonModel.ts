// 예상 혼잡도 상태 타입
export const enum CongestionLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  NONE = "NONE", // 정보없음
}

// 운영상태 타입
export const enum OperationStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  BREAK_TIME = "BREAK_TIME",
}
