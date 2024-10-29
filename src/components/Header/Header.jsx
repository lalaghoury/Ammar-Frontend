import "./Header.scss";
import { Logo, Buttons, ToggleTheme, Hamburger } from "./Navbar";
import AppLayout from "../../config/AppLayout/AppLayout";
import { useSelector } from "react-redux";

const HeaderUser = ({ changeTheme }) => {
  const auth = useSelector((state) => state.auth);

  return (
    <AppLayout className="!py-0">
      <div className="header">
        <Logo />
        <ToggleTheme changeTheme={changeTheme} />
        <Buttons />
        <Hamburger />
      </div>
    </AppLayout>
  );
};

export default HeaderUser;
