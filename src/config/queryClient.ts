// react query 설정파일
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 데이터를 최신 상태로 취급하는 시간 (5분 동안 api 통신X)
      staleTime: 1000 * 60 * 5, // 5분

      // 사용하지 않는 캐시를 보관하는 시간 (캐시 유지 시간)
      gcTime: 1000 * 60 * 30, // 30분

      // 창 다시 포커스 했을 때 재요청 방지
      refetchOnWindowFocus: false,

      // 실패 시 재시도 횟수
      retry: 1,
    },
  },
});
