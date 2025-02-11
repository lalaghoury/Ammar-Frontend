import UserProfileLayout from "./config/UserProfileLayout/UserProfileLayout";
import AdminLayout from "./config/AdminLayout/AdminLayout";
import MainLayout from "./config/MainLayout/MainLayout";

import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AllUsersList from "./admin/AllUsers/AllUsersList";

import SignUpPage from "./pages/SignUpPage/SignUpPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import HomePage from "./pages/HomePage/HomePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import NewPasswordPage from "./pages/NewPasswordPage/NewPasswordPage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import MyInfo from "./pages/UserProfilePage/MyInfo";
import VerifyAccountPage from "./pages/VerifyAccountPage/VerifyAccountPage";

import PrivateRoute from "./Routes/Private";
import LoginSuccess from "./Routes/LoginSuccess";
import IsAdmin from "./Routes/IsAdmin";
import IsSponsor from "./Routes/IsSponsor";
import IsStartup from "./Routes/IsStartup";
import AlreadyLoggedInRoute from "./Routes/AlreadyLoggedIn";

import Header from "./components/Header/Header";

import ErrorPage from "./components/ErrorPage/ErrorPage";

export {
  Header,
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
  IsSponsor,
  IsStartup,
  AlreadyLoggedInRoute,
  MainLayout,
  ErrorPage,
  VerifyAccountPage,
};
