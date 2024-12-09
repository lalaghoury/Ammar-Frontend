import { useState } from "react";
import { Tag, Image, Select, Modal } from "antd";
import Title from "antd/es/typography/Title";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useUserEffect, userThunks } from "../../redux/slices/userSlice";
import AdminTable from "../adminTable";

const AllUsersList = () => {
  useUserEffect();
  const [editable, setEditable] = useState(null);
  const [role, setRole] = useState(null);
  const [status, setStatus] = useState(null);
  const dispatch = useDispatch();
  const { Option } = Select;

  const handleUserUpdate = async (record) => {
    if (!role && !status) {
      return setEditable(null);
    }

    dispatch(
      userThunks.updateUser({
        values: { role, status },
        url: `/users/admin/update/${record.key}`,
      })
    );

    setEditable(null);
    setRole(null);
    setStatus(null);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this user?",
      content: "Once deleted, the user cannot be recovered.",
      onOk: () => {
        dispatch(userThunks.deleteUser({ url: `/users/admin/delete/${id}` }));
      },
    });
  };

  return <AdminTable />;
};
export default AllUsersList;
