import React, { useEffect } from "react";
import AppLayout from "../../config/AppLayout/AppLayout";
import CommonHeading from "../../components/CommonHeading/CommonHeading";
import { Layout, Breadcrumb, Divider, Flex } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { authThunks } from "../../redux/slices/authSlice";

const { Header, Sider, Content } = Layout;

const headerStyle = {
  color: "#fff",
  backgroundColor: "#fff",
  padding: "0",
};
const contentStyle = {
  backgroundColor: "#fff",
};
const siderStyle = {
  color: "#807d7e",
  backgroundColor: "#fff",
};
const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  width: "100%",
  backgroundColor: "#fff",
};

const UserProfileLayout = () => {
  const auth = useSelector((state) => state.auth);
  const [word, setWord] = React.useState("");
  const location = useLocation();
  const dispatch = useDispatch();

  const handleSignout = async () => {
    dispatch(authThunks.signout());
  };

  useEffect(() => {
    const url = location.pathname.split("/")[2].split("-").join(" ");
    setWord(url);
  }, [location]);

  return (
    <AppLayout>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <Breadcrumb
            items={[
              {
                title: (
                  <Link to={"/"} className="bold">
                    Home
                  </Link>
                ),
              },
              {
                title: <Link className="bold">My Account</Link>,
              },
              {
                title: (
                  <span
                    style={{ textTransform: "capitalize" }}
                    className="text-[#3c4242] font-['Causten'] text-lg font-medium"
                  >
                    {word}
                  </span>
                ),
              },
            ]}
            separator=">"
          />
          <Divider />
        </Header>

        <Layout>
          <Sider style={siderStyle} className="lg:!w-[25%] !w-[10%]">
            <CommonHeading text={`Hello ${auth?.user?.name.split(" ")[0]}`} />
            <Flex className="mt-30" vertical gap={20}>
              <Link to={"/profile/my-info"}>
                <Flex gap={15} className="h-11 items-center">
                  <div
                    style={{
                      width: "2px",
                      height: "44px",
                      borderLeft: word
                        ?.split(" ")[1]
                        ?.toLowerCase()
                        .includes("info")
                        ? "2px solid #3C4242"
                        : "",
                      background: word
                        ?.split(" ")[1]
                        ?.toLowerCase()
                        .includes("info")
                        ? "#3C4242"
                        : "",
                    }}
                  />
                  <UserOutlined />
                  My info
                </Flex>
              </Link>
              <span className="cursor" onClick={handleSignout}>
                <Flex gap={15} className="h-11 items-center">
                  <div
                    style={{
                      width: "2px",
                      height: "44px",
                    }}
                    className="h-11 w-[2px]"
                  />
                  <LogoutOutlined />
                  Sign out
                </Flex>
              </span>
            </Flex>
          </Sider>

          <Content style={contentStyle} className="lg:px-5 px-2 ">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </AppLayout>
  );
};

export default UserProfileLayout;
