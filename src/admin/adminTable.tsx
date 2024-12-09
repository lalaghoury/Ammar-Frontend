import React, { useState } from "react";
import { Table, Button, Select, Image, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { userThunks, useUserEffect } from "../redux/slices/userSlice";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";

const AdminTable = () => {
  useUserEffect();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.users);

  const [editable, setEditable] = useState(null);
  const [role, setRole] = useState(null);
  const [status, setStatus] = useState(null);
  const [filters, setFilters] = useState({
    role: "",
  });

  const filteredData = data.filter((item) =>
    Object.keys(filters).every((key) =>
      item[key].toString().toLowerCase().includes(filters[key].toLowerCase())
    )
  );

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this user?",
      content: "Once deleted, the user cannot be recovered.",
      onOk: () => {
        dispatch(userThunks.deleteUser({ url: `/users/admin/delete/${id}` }));
      },
    });
  };

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

  const columns = [
    {
      title: "S.no",
      dataIndex: "_id",
      key: "_id",
      sorter: (a, b) => parseInt(a.id) - parseInt(b.id), // Sorting logic
      render: (_id) => (
        <p className="text-gray-500 font-semibold truncate !w-20">{_id}</p>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name), // Sorting logic
      render: (name, record) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <span style={{ width: 60 }}>
              <Image
                src={record.avatar}
                alt={record.name}
                width={50}
                height={50}
                style={{ objectFit: "center", borderRadius: "9px" }}
                fallback="https://via.placeholder.com/50x50"
              />
            </span>
            <span style={{ flex: 1 }}>
              <Title style={{ margin: 0 }} level={5} className="cursor-pointer">
                {record.name}
              </Title>
              <p>{record.email}</p>
              <p>{record.phone}</p>
            </span>
          </div>
        );
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      sorter: (a, b) => a.role.localeCompare(b.role), // Sorting logic
      render: (role) => <p className="uppercase">{role}</p>,
    },
    {
      title: "Registration Date",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) =>
        new Date(a.registrationDate).getTime() -
        new Date(b.registrationDate).getTime(), // Sorting logic
      render: (createdAt) => <p>{new Date(createdAt).toDateString()}</p>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            icon={<MessageOutlined />}
            type="default"
            size="small"
            onClick={() => navigate(`/messages?id=${record._id}`)}
          />
          <Button
            icon={<EditOutlined />}
            type="default"
            size="small"
            onClick={() => console.log(`Edit user: ${record.id}`)}
          />
          <Button
            icon={<DeleteOutlined />}
            className="text-red-500 hover:!text-red-600"
            size="small"
            onClick={() => handleDelete(record._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Admin Table</h1>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
        rowKey="id"
      />
    </div>
  );
};

export default AdminTable;
