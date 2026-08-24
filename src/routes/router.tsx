import {
  createBrowserRouter,
  Navigate,
  type RouteObject,
} from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import PublicRoute from "../components/auth/PublicRoute";
import RegistrationRoute from "../components/auth/RegistrationRoute";
import AdminLayout from "../layouts/AdminLayout";
import MainLayout from "../layouts/MainLayout";
import AdminCoursePage from "../pages/admin/AdminCoursePage";
import AdminPlacePage from "../pages/admin/AdminPlacePage";
import AdminUserPage from "../pages/admin/AdminUserPage";
import AdminQuizFormPage from "../pages/admin/quiz/AdminQuizFormPage";
import AdminQuizPage from "../pages/admin/quiz/AdminQuizPage";
import CommonErrorPage from "../pages/common/CommonErrorPage";
import CourseDetailPage from "../pages/course/CourseDetailPage";
import CoursePage from "../pages/course/CourseListPage";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/login/RegisterPage";
import MapMainPage from "../pages/map/MapMainPage";
import MapSearchPage from "../pages/map/MapSearchPage";
import AudioDetailPage from "../pages/places/AudioDetailPage";
import PlaceDetailPage from "../pages/places/PlaceDetailPage";
import PlaceListPage from "../pages/places/PlaceListPage";
import BookmarkPage from "../pages/profile/BookmarkPage";
import ProfileEdit from "../pages/profile/ProfileEditPage";
import ProfileMorePage from "../pages/profile/ProfileMorePage";
import ProfilePage from "../pages/profile/ProfilePage";
import TimelinePage from "../pages/profile/TimeLinePage";
import QuizListPage from "../pages/quiz/QuizListPage";
import QuizPlayPage from "../pages/quiz/QuizPlayPage";
import AdminLoginPage from "../pages/admin/AdminLoginPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <CommonErrorPage />,
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
                path: "course",
                children: [
                  {
                    index: true,
                    element: <CoursePage />,
                  },
                  {
                    path: ":courseId",
                    element: <CourseDetailPage />,
                  },
                ],
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
                    element: <BookmarkPage />,
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

      // 4. Admin 관련 라우트 분리
      {
        path: "admin",
        children: [
          // 4-1. 레이아웃이 없는 로그인 페이지 (/admin)
          {
            index: true,
            element: <AdminLoginPage />,
          },
          // 4-2. 관리자 레이아웃이 적용되는 내부 페이지들
          {
            element: <AdminLayout />,
            children: [
              {
                path: "users",
                element: <AdminUserPage />,
              },
              {
                path: "quizzes",
                children: [
                  {
                    index: true,
                    element: <AdminQuizPage />,
                  },
                  {
                    path: "form",
                    element: <AdminQuizFormPage />,
                  },
                  {
                    path: "form/:id",
                    element: <AdminQuizFormPage />,
                  },
                ],
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
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;