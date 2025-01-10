import { BellOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Buttons } from "./navigation";
import { useSelector } from "react-redux";
import { Skeleton } from "antd";

const Header = () => {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <div className="w-full h-20 flex justify-between items-center px-6 py-4 bg-white shadow">
      {loading ? (
        <Skeleton.Input style={{ width: 250 }} active />
      ) : <div className="text-lg font-medium">
        Welcome back,{" "}
        <span className="font-bold capitalize">{user.name}</span>{" "}
        <span>🌟</span>
      </div>}

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
