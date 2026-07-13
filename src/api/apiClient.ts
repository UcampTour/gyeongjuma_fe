import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../store/useAuthStore";
import { reissue } from "./authService";

// 1. 인터페이스 정의
export interface ApiResponse<T> {
  status: string;
  data: T;
  message?: string;
}

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const clearAuthAndRedirect = () => {
  useAuthStore.getState().logout();
  window.location.href = "/login";
};

// 2. 일반 요청용 클라이언트
export const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

// 3. 토큰 재발급 전용 클라이언트
export const authClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
let pendingRequests: Array<(token: string) => void> = [];

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
    const originalRequest = error.config as CustomAxiosRequestConfig | undefined;

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

      useAuthStore.getState().login(newAccessToken, newRefreshToken, currentMember);

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
  }
);