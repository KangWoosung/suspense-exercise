/*  2024-08-01 20:09:55


*/
import { lazy } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import Popup from "./pages/Popup";
import DialogPopup from "./pages/popup/DialogPopup";
import TodosRoute from "./pages/Todos";
import Signin from "./pages/Signin";
import NotFound404 from "./layout/codePages/NotFound404";
import ErrorPage from "./layout/errorPages/ErrorPage";
import usersLoader from "./loaders/usersLoader";
import userLoader from "./loaders/userLoader";
import postsLoader from "./loaders/postsLoader";
import postLoader from "./loaders/postLoader";

const Posts = lazy(() => import("./pages/Posts"));
const Post = lazy(() => import("./pages/Post"));
const Users = lazy(() => import("./pages/Users"));
const User = lazy(() => import("./pages/User"));

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
              { index: true, element: <Posts />, loader: postsLoader },
              { path: ":postId", element: <Post />, loader: postLoader },
            ],
          },
          {
            path: "/users",
            children: [
              { index: true, element: <Users />, loader: usersLoader },
              { path: ":userId", element: <User />, loader: userLoader },
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
