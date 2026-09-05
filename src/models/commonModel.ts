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
  NONE = "NONE", // 정보없음
}

export interface StatusConfig {
  label: string;
  color: string;
  message: string;
  bgColor?: string;
  iconColor?: string;
}

// 1. 혼잡도 라벨 & 색상
export const getCongestionConfig = (
  congestion?: CongestionLevel | string | null,
): StatusConfig => {
  switch (congestion) {
    case CongestionLevel.LOW:
      return {
        label: "places:congestion.status.low",
        color: "success",
        message: "places:congestion.description.low",
      };

    case CongestionLevel.MEDIUM:
      return {
        label: "places:congestion.status.medium",
        color: "warning",
        message: "places:congestion.description.medium",
      };

    case CongestionLevel.HIGH:
      return {
        label: "places:congestion.status.high",
        color: "error",
        message: "places:congestion.description.high",
      };

    case CongestionLevel.NONE:
    default:
      return {
        label: "places:congestion.status.none",
        color: "textDisabled",
        message: "places:congestion.description.none",
      };
  }
};

// 2. 운영상태 라벨 & 색상
export const getOperationStatusConfig = (
  status?: OperationStatus | string | null,
): StatusConfig => {
  switch (status) {
    case OperationStatus.OPEN:
      return {
        label: "places:operation.status.open",
        color: "success",
        bgColor: "#dfe6d18a",
        iconColor: "#6b7d4a",
        message: "",
      };

    case OperationStatus.BREAK_TIME:
      return {
        label: "places:operation.status.breakTime",
        color: "warning",
        bgColor: "#fff3cd",
        iconColor: "#d39e00",
        message: "",
      };

    case OperationStatus.CLOSED:
      return {
        label: "places:operation.status.closed",
        color: "error",
        bgColor: "#f8d7da54",
        iconColor: "#c0392b",
        message: "",
      };

    case OperationStatus.NONE:
    default:
      return {
        label: "places:operation.status.none",
        color: "default",
        bgColor: "#eeeeee",
        iconColor: "#757575",
        message: "",
      };
  }
};

export const getOperationStatusLabel = (
  status?: OperationStatus | string | null,
): string => {
  switch (status) {
    case OperationStatus.OPEN:
      return "영업 중";
    case OperationStatus.CLOSED:
      return "영업 종료";
    case OperationStatus.BREAK_TIME:
      return "휴게 시간";
    case OperationStatus.NONE:
    default:
      return "정보 없음";
  }
};
