import { createBrowserRouter, type RouteObject } from "react-router-dom";
import App from "../App";
import MainLayout from "../layouts/MainLayout";
import MainPage from "../pages/MainPage";
import MapMainPage from "../pages/map/MapMainPage";

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
            element: <MainPage />,
          },
          {
            path: "explore" /* 지도 메인 홈 */,
            element: <MapMainPage />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
