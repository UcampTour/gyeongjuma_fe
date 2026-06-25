
import { createBrowserRouter, type RouteObject } from "react-router-dom";
import App from "../App";
import MainLayout from "../layouts/MainLayout";
import MainPage from "../pages/MainPage";

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
            element: <MainPage />
          }
        ]
      }
    ]
  },
];

const router = createBrowserRouter(routes);

export default router;