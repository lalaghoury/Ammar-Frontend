import React, { useState } from "react";
import { Form, Input, Button, Flex, Avatar, message, Divider } from "antd";
import ReactQuill from "react-quill";
import { CloudUploadOutlined, LoadingOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { ImageInput } from "../AllProducts/AddProduct";

const AddDressStyle = () => {
  const [form] = Form.useForm();
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.API_URL}/dress-styles/new`,
        { ...values, image: values.images[0].url }
      );
      if (data.success) {
        message.success(data.message);
        navigate("/dashboard/dress-styles/dress-styles-list");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error in Adding Dress Style", error.response.data.message);
      message.error(error.response.data.message);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    navigate(-1);
  };

  const onDescriptionChange = (value) => {
    setDescription(value);
  };

  return (
    <Form
      initialValues={{ remember: true }}
      onFinish={onFinish}
      form={form}
      layout="vertical"
    >
      <Form.Item
        label="Dress Style Name"
        name="name"
        rules={[
          { required: true, message: "Please input your Dress Style name!" },
        ]}
      >
        <Input className="input-md" placeholder="Dress Style Name" />
      </Form.Item>
      <Divider />

      <Form.Item
        label="Dress Style Slug"
        name="slug"
        rules={[
          { required: true, message: "Please input your Dress Style slug!" },
        ]}
      >
        <Input className="input-md" placeholder="Dress Style Slug" />
      </Form.Item>
      <Divider />

      <Form.Item
        label="Dress Style Description"
        name="description"
        rules={[
          {
            required: true,
            message: "Please input your category description!",
          },
        ]}
      >
        <DescriptionInput value={description} onChange={onDescriptionChange} />
      </Form.Item>

      <Divider />

      {/* Images */}
      <Form.Item
        rules={[
          { required: true, message: "Please upload at least one image" },
        ]}
        name={"images"}
        label={<Title level={5}>Images</Title>}
      >
        <ImageInput />
      </Form.Item>

      {/* Buttons */}
      <Flex gap={12} justify="flex-end">
        <Form.Item>
          <Button onClick={handleCancel}>Cancel</Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Dress Style
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
};

const DescriptionInput = ({ value = "", onChange }) => {
  const handleChange = (value) => {
    onChange(value);
  };

  return (
    <ReactQuill
      value={value}
      onChange={handleChange}
      placeholder="Enter product description"
      className="custom-quill"
    />
  );
};

export default AddDressStyle;
