import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
// 1. Axios 인스턴스 생성 (기본 설정)
const apiInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080", // 환경변수 또는 기본 URL
  timeout: 10000, // 응답 없으면 자동으로 요청 quit
  headers: {
    "Content-Type": "application/json",
  },
});

// 인터셉터 설정 (TODO. 토큰 주입)
apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 2. 공통 커스텀 매개변수 타입 정의
interface RequestConfig<B = any> extends Omit<
  AxiosRequestConfig,
  "url" | "method" | "data"
> {
  url: string;
  body?: B; // post, put 등에서 사용할 데이터
  params?: any; // get, delete 등에서 사용할 쿼리 스트링
}

// 3. 커스텀 API 메서드 정의
export const api = {
  get: <R = any>(config: RequestConfig) => {
    return apiInstance.get<R>(config.url, { ...config, params: config.params });
  },

  post: <R = any, B = any>(config: RequestConfig<B>) => {
    return apiInstance.post<R>(config.url, config.body, config);
  },

  put: <R = any, B = any>(config: RequestConfig<B>) => {
    return apiInstance.put<R>(config.url, config.body, config);
  },

  delete: <R = any>(config: RequestConfig) => {
    return apiInstance.delete<R>(config.url, {
      ...config,
      params: config.params,
    });
  },
};
