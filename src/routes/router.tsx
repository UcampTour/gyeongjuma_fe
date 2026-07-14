import { createBrowserRouter, type RouteObject } from "react-router-dom";
import App from "../App";
import MainLayout from "../layouts/MainLayout";
import MapMainPage from "../pages/map/MapMainPage";
import HomePage from "../pages/home/HomePage";
import ProfilePage from "../pages/profile/ProfilePage";
import QuizListPage from "../pages/quiz/QuizListPage";
import PlaceListPage from "../pages/places/PlaceListPage";
import QuizPlayPage from "../pages/quiz/QuizPlayPage";
import LoginPage from "../pages/login/LoginPage";
import PublicRoute from "../components/auth/PublicRoute";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import RegisterPage from "../pages/login/RegisterPage";
import RegistrationRoute from "../components/auth/RegistrationRoute";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      // 1. 로그인한 사용자만 접근 가능
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <MainLayout />,
            children: [
              {
                index: true,
                element: <HomePage />,
              },
              {
                path: "explore",
                element: <MapMainPage />,
              },
              {
                path: "places",
                element: <PlaceListPage />,
              },
              {
                path: "profile",
                element: <ProfilePage />,
              },
              {
                path: "quiz",
                children: [
                  {
                    index: true,
                    element: <QuizListPage />,
                  },
                  {
                    path: ":quizId",
                    element: <QuizPlayPage />,
                  },
                ],
              },
            ],
          },
        ],
      },
      // 2. 로그인 안 한 사용자만 접근 가능
      {
        element: <PublicRoute />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
        ],
      },
      // 3. 가입 완료 안된 사용자만 접근 가능
      {
        element: <RegistrationRoute />,
        children: [
          {
            path: "register",
            element: <RegisterPage />
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
