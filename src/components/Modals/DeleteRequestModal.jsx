import { Modal, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { requestThunks } from '../../redux/slices/requestSlice';
import { DeleteOutlined } from '@ant-design/icons';

const DeleteRequestModal = ({ id }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    dispatch(requestThunks.deleteRequest({ id }));
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        icon={<DeleteOutlined />}
        danger
        size="small"
        onClick={showModal}
      />
      <Modal
        title="Delete Confirmation"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <p>
          Are you sure you want to delete this request? This action cannot be
          undone.
        </p>
        <div style={{ textAlign: 'right' }}>
          <Button danger onClick={handleDelete}>
            Delete
          </Button>
          <Button style={{ marginLeft: '10px' }} onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteRequestModal;
