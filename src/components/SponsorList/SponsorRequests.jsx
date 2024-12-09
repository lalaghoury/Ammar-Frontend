import { Table, Button, DatePicker } from "antd";
import { DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const SponsorRequests = ({ data, pagination, prefix }) => {
  const navigate = useNavigate(); // React Router hook for navigation

  const handleRowDoubleClick = (record) => {
    if (!prefix || !record?.id) {
      console.error("Invalid prefix or record data");
      return;
    }

    const route = `/${prefix}/startup/${record.id}`;
    navigate(route); // Navigate to the dynamic route
  };

  const columns = [
    {
      title: "S.no",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => parseInt(a.id) - parseInt(b.id), // Sorting logic
    },
    {
      title: "Name",
      dataIndex: "userName",
      key: "userName",
      sorter: (a, b) => a.userName.localeCompare(b.userName), // Sorting logic
      render: (name, record) => (
        <div className="flex items-center">
          <img
            src={record.avatar}
            alt={name}
            className="w-8 h-8 rounded-full mr-2"
          />
          <span>{name}</span>
        </div>
      ),
    },
    {
      title: "Company",
      dataIndex: "companyName",
      key: "companyName",
      sorter: (a, b) => a.companyName.localeCompare(b.companyName), // Sorting logic
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      sorter: (a, b) => a.role.localeCompare(b.role), // Sorting logic
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email), // Sorting logic
    },
    {
      title: "Contact No",
      dataIndex: "contact",
      key: "contact",
      sorter: (a, b) => a.contact.localeCompare(b.contact), // Sorting logic
    },
    {
      title: "Registration Date",
      dataIndex: "registrationDate",
      key: "registrationDate",
      sorter: (a, b) =>
        new Date(a.registrationDate) - new Date(b.registrationDate), // Sorting logic
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            icon={<CheckOutlined />}
            type="primary"
            size="small"
            onClick={() => console.log(`Approved user: ${record.id}`)}
          />
          <Button
            icon={<DeleteOutlined />}
            type="danger"
            size="small"
            onClick={() => console.log(`Deleted user: ${record.id}`)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between mb-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name, role..."
          className="border rounded px-4 py-2"
        />

        {/* Date Picker and Export CSV */}
        <div className="flex gap-2">
          <DatePicker placeholder="Select Date" />
          <Button>Export CSV</Button>
        </div>
      </div>

      {/* Ant Design Table */}
      <Table
        columns={columns}
        dataSource={data}
        pagination={pagination}
        prefix={prefix}
        rowKey="id"
        onRow={(record) => ({
          onDoubleClick: () => handleRowDoubleClick(record), // Handle double-click on a row
        })}
      />
    </div>
  );
};

export default SponsorRequests;
