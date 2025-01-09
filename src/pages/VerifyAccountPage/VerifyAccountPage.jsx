import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../utils';

const VerifyAccountPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { email, code } = values;
      const { data } = await axios.post(`${API_URL}/auth/verify-code`, {
        email,
        code,
      });
      if (data.success) {
        message.success(data.message);
        navigate('/sign-in');
      } else {
        message.error(data.error);
      }
      setLoading(false);
    } catch (error) {
      message.error(error.response.data.error);
      setLoading(false);
    }
  };

  return (
    <div className="verify-account-page">
      <h1>Verify Your Account</h1>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Please enter your email address!',
            },
            {
              type: 'email',
              message: 'Please enter a valid email address!',
            },
          ]}
        >
          <Input size="large" placeholder="designer@gmail.com" />
        </Form.Item>
        <Form.Item
          name="code"
          label="Verification Code"
          rules={[
            {
              required: true,
              message: 'Please enter the verification code!',
            },
          ]}
        >
          <Input size="large" placeholder="Enter verification code" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Verify Account
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VerifyAccountPage;
