import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { authService } from "./authService";
import { useAuthStore } from "../store/useAuthStore";

export const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 1. 요청 인터셉터: 토큰 자동 주입
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// 2. 응답 인터셉터: 401 에러(만료) 시 재발급 로직
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ code: string }>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean};

    // 토큰 만료(A003)시 재발급 시도
    if (error.response?.data?.code === "A003" && !originalRequest._retry ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      try {
        const { data } = await authService.reissue(refreshToken);

        useAuthStore.getState().login(data.data.accessToken, data.data.refreshToken);

        originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;

        return api(originalRequest);
      } catch(reissueError) {
        useAuthStore.getState().logout();
        window.location.href = "/login";
      }

      return Promise.reject(error);
    }
  }
)