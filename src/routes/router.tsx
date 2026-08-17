import { createBrowserRouter, Navigate, type RouteObject } from "react-router-dom";
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
import TimelinePage from "../pages/profile/TimeLinePage";
import ProfileEdit from "../pages/profile/ProfileEditPage";
import ProfileMorePage from "../pages/profile/ProfileMorePage";
import BookmarkPage from "../pages/profile/BookmarkPage";
import AdminLayout from "../layouts/AdminLayout";
import AdminUserPage from "../pages/admin/AdminUserPage";
import AdminQuizPage from "../pages/admin/quiz/AdminQuizPage";
import AdminCoursePage from "../pages/admin/AdminCoursePage";
import AdminPlacePage from "../pages/admin/AdminPlacePage";
import AdminQuizFormPage from "../pages/admin/quiz/AdminQuizFormPage";

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
                children: [
                  {
                    index: true,
                    element: <ProfilePage />,
                  },
                  {
                    path: "timeline",
                    element: <TimelinePage />, 
                  },
                  {
                    path: "bookmark",
                    element: <BookmarkPage />, // 즐겨찾기 상세 페이지 컴포넌트
                  },
                  {
                    path: "edit",
                    element: <ProfileEdit />,
                  },
                  {
                    path: "more",
                    element: <ProfileMorePage />,
                  },
                ],
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
      
      // 4. Admin 임시
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="users" replace />,
          },
          {
            path: "users",
            element: <AdminUserPage />,
          },
          {
            path: "quizzes",
            children: [
              {
                index: true,
                element: <AdminQuizPage />
              },
              {
                path: "form",
                element: <AdminQuizFormPage />
              }
            ]
          },
          {
            path: "courses",
            element: <AdminCoursePage />,
          },
          {
            path: "places",
            element: <AdminPlacePage />,
          },
        ],
      }
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
