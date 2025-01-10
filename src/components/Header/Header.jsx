import { BellOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Buttons, Logo } from "./navigation";

const Header = () => {
  const userRole = window.location.pathname.split("/")[1];

  return (
    <header className="header">
      <Logo />
      <div className="search">
        <input type="text" placeholder="Search..." />
        <button>Search</button>
      </div>
      <nav className="nav-links">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/services">Services</a>
        <a href="/contact">Contact</a>
      </nav>
      <div className="nav-btns">
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
      <div className="hamburger">
        <input type="checkbox" id="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-icon">
          <span className="navicon"></span>
        </label>
        <div className="nav-dropdown">
          <div id="close">X</div>
          <div className="dropdown-body">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/services">Services</a>
            <a href="/contact">Contact</a>
            <Buttons />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
