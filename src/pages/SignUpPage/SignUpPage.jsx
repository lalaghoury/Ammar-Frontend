import { useState } from "react";
import "./SignUpPage.scss";
import AppLayout from "../../config/AppLayout/AppLayout";
import SignUpImage from "../../assets/images/signup.png";
import { Button, Checkbox, Form, Input, Space, Select, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";

const roles = [
  { value: "Startup", label: "Startup" },
  { value: "Sponsor", label: "Sponsor" },
];

const subRoles = {
  Startup: [
    { value: "employee", label: "Employee" },
    { value: "manager", label: "Manager" },
    // add more options here as needed
  ],
  Sponsor: [
    { value: "investor", label: "Investor" },
    { value: "advisor", label: "Advisor" },
    // add more options here as needed
  ],
};

const SignUpPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subRoleOptions, setSubRoleOptions] = useState([]);
  const navigate = useNavigate();

  const handleRoleChange = (role) => {
    setSubRoleOptions(subRoles[role] || []);
  };

  const onFinish = async (values) => {
    if (
      !values.email ||
      !values.phone ||
      !values.password ||
      !values.name ||
      !values.role ||
      !values.sub_role
    ) {
      return message.error("All fields are required");
    }
    try {
      setIsSubmitting(true);
      const { data } = await axios.post(
        `${process.env.API_URL}/auth/signup`,
        values
      );
      if (data.success) {
        message.success(data.message, 1, () => {
          navigate("/sign-in");
        });
      }
    } catch (error) {
      message.error(error.response.data.message);
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <div className="signup-page">
        <div className="signup-left">
          <img src={SignUpImage} alt="signup" />
        </div>
        <div className="signup-right">
          <div className="signup-main">
            <div className="signup-text">
              <h1 className="mt-20">Sign Up</h1>
              <p className="mb-20">
                Sign up for free to access any of our products
              </p>
            </div>

            <div className="signup-form">
              <Form
                layout="vertical"
                onFinish={onFinish}
                className="signup-form"
                scrollToFirstError
              >
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message: "Name is required!",
                    },
                  ]}
                  validateTrigger="onBlur"
                >
                  <Input size="large" placeholder="John Doe" />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Phone is required!",
                    },
                  ]}
                  validateTrigger="onBlur"
                >
                  <Input size="large" placeholder="1234567890" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email Address"
                  rules={[
                    {
                      required: true,
                      message: "Email is required!",
                    },
                  ]}
                  validateTrigger="onBlur"
                >
                  <Input size="large" placeholder="designer@gmail.com" />
                </Form.Item>

                <Form.Item
                  name="role"
                  label="Role"
                  rules={[
                    {
                      required: true,
                      message: "Role is required!",
                    },
                  ]}
                  validateTrigger="onBlur"
                >
                  <Select
                    size="large"
                    placeholder="Select a role"
                    onChange={handleRoleChange}
                    options={roles}
                  />
                </Form.Item>

                <Form.Item
                  name="sub_role"
                  label="Sub Role"
                  rules={[
                    {
                      required: true,
                      message: "Sub Role is required!",
                    },
                  ]}
                  validateTrigger="onBlur"
                >
                  <Select
                    size="large"
                    placeholder="Select a sub role"
                    options={subRoleOptions}
                    disabled={!subRoleOptions.length}
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Password is required!",
                    },
                  ]}
                  validateTrigger="onBlur"
                >
                  <Input.Password size="large" />
                </Form.Item>

                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      required: true,
                      message: "You must agree to our privacy agreement",
                    },
                  ]}
                  validateTrigger="onSubmit"
                >
                  <Checkbox>
                    Agree to our{" "}
                    <Link className="link text-sec" to={"#"}>
                      Terms of use
                    </Link>{" "}
                    and{" "}
                    <Link className="link text-sec" to={"#"}>
                      Privacy Policy
                    </Link>
                  </Checkbox>
                </Form.Item>

                <Form.Item name="newsletter" valuePropName="checked">
                  <Checkbox defaultChecked>
                    Subscribe to our monthly newsletter
                  </Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Space align="center" gap={5}>
                        Sending... <LoadingOutlined />
                      </Space>
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                  <div className="mt-5">
                    Already have an account?{" "}
                    <Link className="link text-sec" to={"/sign-in"}>
                      Log In
                    </Link>
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

export default SignUpPage;
