import { createBrowserRouter } from 'react-router-dom';
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
  IsSponsor,
  IsStartup,
  VerifyAccountPage,
} from './comp';
import StartupLayout from './config/StartupLayout/StartupLayout';
import SponsorLayout from './config/SponsorLayout/SponsorLayout';
import SponsorPage from './pages/SponsorPage/SponsorPage';
import SponsorProfile from './components/SponsorList/SponsorProfile';
import MessagesPage from './components/Message/MessagesPage';
import StartupProfile from './components/startup/StartupProfile';
import StartupPage from './components/startup/StartupPage';
import MyRequests from './components/SponsorList/MyRequests';

export const router = () =>
  createBrowserRouter([
    {
      path: '/',
      errorElement: <ErrorPage />,
      element: <MainLayout />,
      children: [
        {
          element: <AlreadyLoggedInRoute />,
          children: [
            {
              index: true,
              path: '/',
              element: <HomePage />,
            },
            {
              path: 'sign-up',
              element: <SignUpPage />,
            },
            {
              path: 'sign-in',
              element: <SignInPage />,
            },
            {
              path: 'auth/login/success',
              element: <LoginSuccess />,
            },
            {
              path: 'forgot-password',
              element: <ForgotPasswordPage />,
            },
            {
              path: 'reset-password/:resetToken',
              element: <NewPasswordPage />,
            },
            {
              path: 'verify-account',
              element: <VerifyAccountPage />,
            },
          ],
        },
        {
          element: <PrivateRoute />,
          children: [
            {
              path: 'profile',
              element: <UserProfileLayout />,
              children: [
                {
                  index: true,
                  element: <MyInfo />,
                },
              ],
            },
            {
              path: 'startup',
              element: <IsStartup />,
              children: [
                {
                  element: <StartupLayout />,
                  children: [
                    {
                      index: true,
                      element: <StartupPage />,
                    },
                    {
                      path: 'sponsor/:id',
                      element: <SponsorProfile />,
                    },
                    {
                      path: 'requests',
                      element: <MyRequests />,
                    },
                    {
                      path: 'messages',
                      element: <MessagesPage />,
                      children: [
                        {
                          path: ':id',
                          element: <MessagesPage />,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              path: 'sponsor',
              element: <IsSponsor />,
              children: [
                {
                  element: <SponsorLayout />,
                  children: [
                    {
                      index: true,
                      element: <SponsorPage />,
                    },
                    {
                      path: 'startup/:id',
                      element: <StartupProfile />,
                    },
                    {
                      path: 'messages',
                      element: <MessagesPage />,
                      children: [
                        {
                          path: ':id',
                          element: <MessagesPage />,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              path: 'admin',
              element: <IsAdmin />,
              children: [
                {
                  element: <AdminLayout />,
                  children: [
                    {
                      index: true,
                      element: <AdminDashboard />,
                    },
                    {
                      path: 'users',
                      element: <AllUsersList />,
                    },
                  ],
                },
              ],
            },
            // {
            //   path: 'messages',
            //   element: <MessagesPage />,
            //   children: [
            //     {
            //       path: ':id',
            //       element: <MessagesPage />,
            //     },
            //   ],
            // },
          ],
        },
        {
          path: '*',
          element: <PageNotFound />,
        },
      ],
    },
  ]);
