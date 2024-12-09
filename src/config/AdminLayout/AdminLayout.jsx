import { useState } from "react";
import "./AdminLayout.scss";
import {
  AppstoreAddOutlined,
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusSquareOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("/");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          className="logo2 dis-fcc cursor"
          onClick={() => (window.location.href = "/")}
        >
          <h2>
            <span className="lg-logo cursor">Euphoria</span>
            <span className="sm-logo cursor">Eu</span>
          </h2>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[selectedKey === "dashboard" ? "" : selectedKey]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              setSelectedKey(key);
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <DashboardOutlined />,
              label: "Dashboard",
            },
            {
              key: "users",
              icon: <UserOutlined />,
              label: "Users",
              children: [
                {
                  key: "users",
                  icon: <AppstoreAddOutlined />,
                  label: "All Users List",
                },
                {
                  key: "users",
                  icon: <PlusSquareOutlined />,
                  label: "Create User",
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
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
