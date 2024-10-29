import { useState } from "react";
import "./Header.scss";
import { useSelector } from "react-redux";
import LogoImg from "../../assets/images/logo.svg";
import {
  MoonOutlined,
  SunOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Badge, Button, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { authThunks, useAuthEffect } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

export const Logo = () => {
  const navigate = useNavigate();
  return (
    <div className="logo dis-fcc cursor-pointer">
      <img src={LogoImg} alt="logo" onClick={() => navigate("/")} />
    </div>
  );
};

export const Buttons = () => {
  useAuthEffect();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <>
      {auth.user ? (
        <div className="nav-btn-login">
          <Space size={12} align="center">
            <Button
              className="dis-fcc"
              onClick={() => navigate("/profile/my-info")}
            >
              <Badge className="nav-badge">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M10.0002 11.6667C12.3013 11.6667 14.1668 9.8012 14.1668 7.50001C14.1668 5.19882 12.3013 3.33334 10.0002 3.33334C7.69898 3.33334 5.8335 5.19882 5.8335 7.50001C5.8335 9.8012 7.69898 11.6667 10.0002 11.6667ZM10.0002 11.6667C6.31826 11.6667 3.3335 13.9053 3.3335 16.6667M10.0002 11.6667C13.6821 11.6667 16.6668 13.9053 16.6668 16.6667"
                    stroke="#807D7E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </Badge>
            </Button>
          </Space>
        </div>
      ) : (
        <div className="nav-btns">
          <Space size={12} align="center">
            <Link to="/sign-in">
              <Button type="primary">Login</Button>
            </Link>
            <Link to="/sign-up">
              <Button>Sign Up</Button>
            </Link>
          </Space>
        </div>
      )}
    </>
  );
};

export const ToggleTheme = ({ changeTheme }) => {
  const theme = localStorage.getItem("theme");

  return (
    <Button
      className="toggle-theme"
      onClick={changeTheme}
      icon={theme === "light" ? <SunOutlined /> : <MoonOutlined />}
    />
  );
};

export const Hamburger = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState("0");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handlenavigate = (route) => {
    setIsDropdownOpen(false);
    navigate(route);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignout = () => {
    setIsDropdownOpen(false);
    dispatch(authThunks.signout());
  };

  return (
    <div className="hamburger z-[999999]">
      {isDropdownOpen ? (
        <>
          <div className="nav-dropdown">
            <div className="dropdown-body">
              <div>
                <Link
                  onClick={() => {
                    setSelectedKey("0");
                    setIsDropdownOpen(false);
                  }}
                  style={{ color: selectedKey === "0" ? "#8a33fd" : "black" }}
                  to={`/`}
                >
                  <span className="text-[20px] font-['Causten'] font-semibold leading-[normal] capitalize">
                    Home
                  </span>
                </Link>
              </div>
              <div>
                <Link
                  onClick={() => {
                    setSelectedKey("1");
                    setIsDropdownOpen(false);
                  }}
                  style={{ color: selectedKey === "1" ? "#8a33fd" : "black" }}
                  to="/shop"
                >
                  Shop
                </Link>
              </div>

              <div>
                {auth?.user ? (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 20 }}
                  >
                    <Button
                      className=" bold"
                      onClick={() => handlenavigate(`/profile/my-info`)}
                    >
                      My Profile
                    </Button>
                    <Button className="  bold" onClick={handleSignout}>
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 20 }}
                  >
                    <Button onClick={() => handlenavigate("/sign-up")}>
                      Signup
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => handlenavigate("/sign-in")}
                    >
                      Log in
                    </Button>
                  </div>
                )}
              </div>
              <span id="close">
                <CloseOutlined
                  onClick={toggleDropdown}
                  style={{ fontSize: "24px", cursor: "pointer" }}
                />
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className="nav-hamburger cursor" onClick={toggleDropdown}>
          <MenuOutlined style={{ fontSize: "24px" }} />
        </div>
      )}
    </div>
  );
};
