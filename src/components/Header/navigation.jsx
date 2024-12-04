import "./Header.scss";
import { useSelector } from "react-redux";
import LogoImg from "../../assets/images/logo.svg";
import { Badge, Button, Menu, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuthEffect } from "../../redux/slices/authSlice";
import React from "react";

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

export const Sidebar = ({ items, selectedKey, onMenuClick }) => {
  return (
    <div className="h-full w-64 bg-[#F5F5F5] text-[#000000CC] shadow-lg">
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={onMenuClick}
        className="h-full border-0  text-white"
      >
        {items.map((item) => (
          <Menu.Item
            key={item.key}
            icon={React.cloneElement(item.icon, { className: "text-white" })}
            className="hover:text-blue-500 text-white font-medium"
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};
