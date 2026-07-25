//추후에 마저 구현

import { useEffect, useState, type JSX } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { apiClient } from "../../api/apiClient";

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const [isInitializing, setIsInitializing] = useState(true);
  const { accessToken, logout } = useAuthStore.getState();

  useEffect(() => {
    const initAuth = async () => {
      if (!accessToken) {
        setIsInitializing(false);
        return;
      }
      try {
        await apiClient.get('/api/members/me');
      } catch (err) {
        logout();
      } finally {
        setIsInitializing(false);
      }
    };
    initAuth();
  }, []);

  // 아무것도 보여주고 싶지 않다면 null을 반환하세요
  if (isInitializing) return null; 

  return children;
};