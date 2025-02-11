import React, { useEffect } from "react";
import "./SignInPage.scss";
import AppLayout from "../../config/AppLayout/AppLayout";
import SignInImage from "../../assets/images/signup.png";
import { Button, Form, Input, Space, message } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { useAuthActions } from "../../redux/slices/authSlice";

const SignInPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { signin } = useAuthActions();
  const { search } = useLocation();
  const urlParams = new URLSearchParams(search);
  const error = urlParams.get("error");

  useEffect(() => {
    const handleErrorMessage = () => {
      if (error) {
        message.error(error);
        const url = new URL(window.location.href);
        url.searchParams.delete("error");
        window.history.pushState({}, "", url);
      }
    };

    handleErrorMessage();

    const timer = setTimeout(() => {
      handleErrorMessage();
      clearTimeout(timer);
    }, 500);

    return () => clearTimeout(timer);
  }, [error]);

  const onFinish = async (values) => {
    setIsSubmitting(true);
    const bool = await signin(values);
    if (bool) {
      navigate(bool);
    }
    setIsSubmitting(false);
  };

  return (
    <AppLayout>
      <div className="signin-page">
        <div className="signin-left">
          <img src={SignInImage} alt="signin" />
        </div>
        <div className="signin-right">
          <div className="signin-main">
            <div className="signin-text">
              <h1 className="mb-50">Sign In Here</h1>
            </div>

            <div className="signin-form">
              <Form
                layout="vertical"
                onFinish={onFinish}
                className="signin-form"
              >
                <Form.Item
                  name={"email"}
                  label="User name or email address"
                  rules={[
                    {
                      required: true,
                      message: "Please input your user name or email address!",
                    },
                  ]}
                  validateTrigger="onBlur"
                >
                  <Input size="large" placeholder="designer@gmail.com" />
                </Form.Item>
                <Form.Item
                  name={"password"}
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                  validateTrigger="onBlur"
                >
                  <Input.Password size="large" />
                </Form.Item>

                <div className="forgot-password">
                  <Link className="link text-sec" to={"/forgot-password"}>
                    Forget your password
                  </Link>
                </div>
                <Form.Item>
                  <Button
                    disabled={isSubmitting}
                    type="primary"
                    htmlType="submit"
                  >
                    {isSubmitting ? (
                      <Space align="center" gap={5}>
                        Loading... <LoadingOutlined />
                      </Space>
                    ) : (
                      "Log In"
                    )}
                  </Button>
                  <div className="mt-5">
                    Don’t have an account?{" "}
                    <Link className="link text-sec" to={"/sign-up"}>
                      Sign up
                    </Link>{" "}
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SignInPage;
