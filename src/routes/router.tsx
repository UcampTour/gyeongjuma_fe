import { createBrowserRouter, type RouteObject } from "react-router-dom";
import App from "../App";
import MainLayout from "../layouts/MainLayout";
import MapMainPage from "../pages/map/MapMainPage";
import SiteListPage from "../pages/sites/SiteListPage";
import HomePage from "../pages/home/HomePage";
import ProfilePage from "../pages/profile/ProfilePage";
import QuizListPage from "../pages/quiz/QuizListPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "explore" /* 지도 메인 홈 */,
            element: <MapMainPage />,
          },
          {
            path: "sites" /* 관광지 리스트 */,
            element: <SiteListPage />,
          },
          {
            path: "profile", /*마이 페이지 */
            element: <ProfilePage />,
          },
          {
            path: "quiz",
            element: <QuizListPage />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
