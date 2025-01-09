import React, { useState } from 'react';
import { Modal, Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { API_URL } from '../../utils';

const VerificationCodeModal = ({ visible, email, onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);

  const handleOk = async (values) => {
    try {
      setLoading(true);
      const { code } = values;
      const { data } = await axios.post(`${API_URL}/auth/verify-code`, {
        email,
        code,
      });
      if (data.success) {
        message.success(data.message);
        onSuccess();
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
    <Modal
      visible={visible}
      title="Enter Verification Code"
      onCancel={onCancel}
      footer={null}
    >
      <Form layout="vertical" onFinish={handleOk}>
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
            Verify
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default VerificationCodeModal;
