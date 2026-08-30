import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import router from "../routes/router";
import { useAuthStore } from "../store/useAuthStore";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export interface ApiResponse<T> {
  status: string;
  data: T;
  message?: string;
}

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, 
});

// [요청 인터셉터]: 모든 API 요청 보낼 때 Zustand에 있는 accessToken을 헤더에 장착!
apiClient.interceptors.request.use(
  (config) => {
    // 예시: useAuthStore에 accessToken이 저장되어 있다고 가정할 때
    const accessToken = useAuthStore.getState().accessToken; 
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let pendingRequests: Array<() => void> = [];

const clearAuthAndRedirect = () => {
  useAuthStore.getState().logout();
  router.navigate("/login");
};

// [응답 인터셉터]
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig | undefined;

    if (!originalRequest || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest.url?.includes("/members/reissue")) {
      clearAuthAndRedirect();
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      clearAuthAndRedirect();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve) => {
        pendingRequests.push(() => {
          resolve(apiClient(originalRequest));
        });
      });
    }

    isRefreshing = true;

    try {
      // 리프레시 토큰(쿠키)을 이용해 새 액세스 토큰 발급 요청
      const response = await axios.post(`${BASE_URL}/members/reissue`, {}, { withCredentials: true });
      
      // 만약 재발급 API가 새 액세스 토큰을 바디로 준다면 여기서 스토어에 갱신해줘야 합니다.
      // 예: const newAccessToken = response.data.data.accessToken;
      // useAuthStore.getState().setAccessToken(newAccessToken);

      isRefreshing = false;
      const callbackList = [...pendingRequests];
      pendingRequests = [];
      callbackList.forEach((callback) => callback());

      return apiClient(originalRequest);
    } catch (reissueError) {
      isRefreshing = false;
      pendingRequests = [];
      clearAuthAndRedirect();
      return Promise.reject(reissueError);
    }
  }
);