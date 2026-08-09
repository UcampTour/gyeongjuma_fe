import { createBrowserRouter, type RouteObject } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import PublicRoute from "../components/auth/PublicRoute";
import RegistrationRoute from "../components/auth/RegistrationRoute";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/login/RegisterPage";
import MapMainPage from "../pages/map/MapMainPage";
import MapSearchPage from "../pages/map/MapSearchPage";
import AudioDetailPage from "../pages/places/AudioDetailPage";
import PlaceDetailPage from "../pages/places/PlaceDetailPage";
import PlaceListPage from "../pages/places/PlaceListPage";
import ProfilePage from "../pages/profile/ProfilePage";
import QuizListPage from "../pages/quiz/QuizListPage";
import QuizPlayPage from "../pages/quiz/QuizPlayPage";

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
                path: "audio/:placeId/:audioId",
                element: <AudioDetailPage />,
              },
              {
                path: "explore",
                children: [
                  {
                    index: true,
                    element: <MapMainPage />,
                  },
                  {
                    path: "search",
                    element: <MapSearchPage />,
                  },
                  {
                    path: ":placeId",
                    element: <PlaceDetailPage />,
                  },
                  {
                    path: "filter",
                    element: <PlaceListPage />,
                  },
                ],
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
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
