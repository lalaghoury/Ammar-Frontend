import { useState } from "react";
import "./AdminLayout.scss";
import { Layout, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { Logo, Sidebar } from "../../components/Header/navigation";
import { adminMenuItems } from "../../constants";
import { Header } from "../../comp";
const { Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("/");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
    console.log('Menu clicked:', e.key);
  };


  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="flex items-center justify-center mb-5">
          <Logo />
        </div>

        <Sidebar
          items={adminMenuItems}
          selectedKey={selectedKey}
          onMenuClick={handleMenuClick}
        />
      </Sider>

      <Layout>
        <Header />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
