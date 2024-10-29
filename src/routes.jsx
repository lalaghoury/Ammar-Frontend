import { createBrowserRouter } from "react-router-dom";
import {
  SignUpPage,
  SignInPage,
  HomePage,
  ForgotPasswordPage,
  NewPasswordPage,
  PageNotFound,
  AdminDashboard,
  AdminLayout,
  AllUsersList,
  PrivateRoute,
  UserProfileLayout,
  MyInfo,
  LoginSuccess,
  IsAdmin,
  AlreadyLoggedInRoute,
  MainLayout,
  ErrorPage,
} from "./comp";

export const router = (changeTheme) =>
  createBrowserRouter([
    {
      path: "/",
      element: <MainLayout changeTheme={changeTheme} />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/",
          element: <PrivateRoute />,
          children: [
            {
              path: "/",
              element: <IsAdmin />,
              children: [
                {
                  path: "/dashboard",
                  element: <AdminLayout />,
                  children: [
                    {
                      index: true,
                      element: <AdminDashboard />,
                    },
                    {
                      path: "users/all-users-list",
                      element: <AllUsersList />,
                    },
                    {
                      path: "users/add-user",
                      element: <AllUsersList />,
                    },
                    {
                      path: "users/details/:id",
                      element: <AllUsersList />,
                    },
                  ],
                },
              ],
            },
            {
              path: "/profile",
              element: <UserProfileLayout />,
              children: [
                {
                  path: "/profile/my-info",
                  element: <MyInfo />,
                },
              ],
            },
          ],
        },
        {
          path: "/",
          element: <AlreadyLoggedInRoute />,
          children: [
            {
              path: "/sign-up",
              element: <SignUpPage />,
            },
            {
              path: "/sign-in",
              element: <SignInPage />,
            },
            {
              path: "/auth/login/success",
              element: <LoginSuccess />,
            },
            {
              path: "/forgot-password",
              element: <ForgotPasswordPage />,
            },
            {
              path: "/reset-password/:resetToken",
              element: <NewPasswordPage />,
            },
          ],
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
  ]);
