import { useState } from 'react';
import { Layout, theme } from 'antd';
import { Logo, Sidebar } from '../../components/Header/navigation';
import AdminHeader from '../../components/Header/Header';
import { sponsorMenuItems } from '../../constants';
import { Outlet } from 'react-router-dom';

const { Sider, Content } = Layout;

const SponsorLayout = () => {
  const [selectedKey, setSelectedKey] = useState('home');

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
    console.log('Menu clicked:', e.key);
  };

  return (
    <Layout
      className="!bg-white"
      style={{
        height: '100vh',
        transition: 'all 0.2s',
        backgroundColor: colorBgContainer,
      }}
    >
      <Sider>
        <div className="flex items-center justify-center mb-5">
          <Logo />
        </div>

        <Sidebar
          items={sponsorMenuItems}
          selectedKey={selectedKey}
          onMenuClick={handleMenuClick}
        />
      </Sider>

      <Layout
        style={{
          padding: '0',
        }}
      >
        <AdminHeader />
        <Content
          style={{
            margin: '24px 16px',
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

export default SponsorLayout;
