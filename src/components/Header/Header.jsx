import { BellOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Buttons } from "./navigation";

const Header = () => {
  const userRole = window.location.pathname.split("/")[1];

  return (
    <div className="w-full h-20 flex justify-between items-center px-6 py-4 bg-white shadow">
      <div className="text-lg font-medium">
        Welcome back,{" "}
        <span className="font-bold capitalize">{userRole || "Startup"}</span>{" "}
        <span>🌟</span>
      </div>
      <div className="flex items-center space-x-6">
        <button className="text-gray-600 hover:text-gray-800">
          <SettingOutlined />
        </button>
        <button className="text-gray-600 hover:text-gray-800">
          <MailOutlined />
        </button>
        <button className="text-gray-600 hover:text-gray-800">
          <BellOutlined />
        </button>
        <div className="relative">
          <Buttons />
        </div>
      </div>
    </div>
  );
};

export default Header;
