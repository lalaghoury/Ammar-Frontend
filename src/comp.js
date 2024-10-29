// Layouts
import UserProfileLayout from "./config/UserProfileLayout/UserProfileLayout";
import AdminLayout from "./config/AdminLayout/AdminLayout";
import MainLayout from "./config/MainLayout/MainLayout";

// Admin Part
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AllUsersList from "./admin/AllUsers/AllUsersList";

// Pages
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import HomePage from "./pages/HomePage/HomePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import NewPasswordPage from "./pages/NewPasswordPage/NewPasswordPage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import MyInfo from "./pages/UserProfilePage/MyInfo";

// Routes
import PrivateRoute from "./Routes/Private";
import LoginSuccess from "./Routes/LoginSuccess";
import IsAdmin from "./Routes/IsAdmin";
import AlreadyLoggedInRoute from "./Routes/AlreadyLoggedIn";

// Components
import Header from "./components/Header/Header";

// Error Page
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
  AlreadyLoggedInRoute,
  MainLayout,
  ErrorPage,
};
