import { useState } from 'react';
import { Modal, Form, Input, Button, InputNumber } from 'antd';
import { useDispatch } from 'react-redux';
import { requestThunks } from '../../redux/slices/requestSlice';

const AddRequestModal = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  // Function to handle modal open
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Function to handle modal close
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  // Function to handle form submission
  const handleSubmit = (values) => {
    try {
      console.log('Form Values:', values);
      // Dispatch action to add request using the requestThunks
      dispatch(
        requestThunks.createRequest({ values: { ...values, sponsorId: id } })
      );

      // Close the modal and reset the form
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.log('🚀 ~ handleSubmit ~ error:', error);
    }
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Request Sponsor
      </Button>
      <Modal
        title="Add Request"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null} // We'll handle buttons inside the form
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Amount"
            name="amountRequested"
            rules={[{ required: true, message: 'Please enter the amount!' }]}
          >
            <InputNumber
              prefix="PKR"
              placeholder="e.g 5000"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: 'Please enter the description!' },
            ]}
          >
            <Input.TextArea placeholder="Enter description" rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button style={{ marginLeft: '10px' }} onClick={handleCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddRequestModal;
