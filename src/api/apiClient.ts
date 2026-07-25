import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../store/useAuthStore";
import { reissue } from "./authService";
import router from "../routes/router";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

// 인터페이스
export interface ApiResponse<T> {
  status: string;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  status: number;
  error: string;
  code: string;
  message: string;
  timestamp: string;
}

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// 일반 요청용 클라이언트
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
let pendingRequests: Array<(token: string) => void> = [];

const clearAuthAndRedirect = () => {
  useAuthStore.getState().logout();
  router.navigate("/login");
};

// 요청 인터셉터
apiClient.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | CustomAxiosRequestConfig
      | undefined;

    // 401 에러가 아니면 그냥 통과
    if (!originalRequest || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // 이미 재시도했는데 또 401이면 무한 루프 방지 -> 로그아웃
    if (originalRequest._retry) {
      clearAuthAndRedirect();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // 이미 다른 요청에서 토큰 갱신 중이라면 대기열에 추가
    if (isRefreshing) {
      return new Promise((resolve) => {
        pendingRequests.push((token: string) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(apiClient(originalRequest));
        });
      });
    }

    isRefreshing = true;

    try {
      const refreshToken = useAuthStore.getState().refreshToken;

      if (!refreshToken) {
        clearAuthAndRedirect();
        return Promise.reject(error);
      }

      const response = await reissue();

      const newAccessToken = response.accessToken;
      const newRefreshToken = response.refreshToken || refreshToken;
      const currentMember = useAuthStore.getState().member;

      /**
       * 현재 로그인된 사용자 정보 없을 경우
       * 토큰 갱신
       */
      if (!currentMember) {
        useAuthStore.getState().updateToken(newAccessToken, newRefreshToken);
      } else {
        useAuthStore
          .getState()
          .login(newAccessToken, newRefreshToken, currentMember, false);
      }

      pendingRequests.forEach((callback) => callback(newAccessToken));
      pendingRequests = [];

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return apiClient(originalRequest);
    } catch (reissueError) {
      clearAuthAndRedirect();
      return Promise.reject(reissueError);
    } finally {
      isRefreshing = false;
    }
  },
);
