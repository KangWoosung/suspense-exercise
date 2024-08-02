/*  2024-08-01 20:09:55


*/
import { createBrowserRouter, RouteObject } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import Popup from "./pages/Popup";
import DialogPopup from "./pages/popup/DialogPopup";
import PostsRoute from "./pages/Posts";
import PostRoute from "./pages/Post";
import UsersRoute from "./pages/Users";
import UserRoute from "./pages/User";
import TodosRoute from "./pages/Todos";
import Signin from "./pages/Signin";
import NotFound404 from "./layout/codePages/NotFound404";
import ErrorPage from "./layout/errorPages/ErrorPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "*", element: <NotFound404 /> },
      {
        errorElement: <ErrorPage />,
        children: [
          { path: "/", element: <Home /> },
          {
            path: "/popup",
            element: <Popup />,
            children: [{ path: "/popup/dialog", element: <DialogPopup /> }],
          },
          {
            path: "/posts",
            children: [
              { index: true, ...PostsRoute },
              { path: ":postId", ...PostRoute },
            ],
          },
          {
            path: "/users",
            children: [
              { index: true, ...UsersRoute },
              { path: ":userId", ...UserRoute },
            ],
          },
          { path: "/todos", ...TodosRoute },
          { path: "/signin", element: <Signin /> },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
