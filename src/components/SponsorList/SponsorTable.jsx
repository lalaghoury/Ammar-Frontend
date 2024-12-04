import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./SponsorList.module.css";

const SponsorTable = ({ sponsors, pagination }) => {
  const navigate = useNavigate(); // React Router hook for navigation

  const handleRowDoubleClick = (record) => {
    navigate(`/sponsor/${record.id}`); // Navigate to the dynamic route
  };

  const columns = [
    {
      title: "S.no",
      dataIndex: "id",
      key: "id",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Sponsor Name",
      dataIndex: "name",
      key: "name",
      render: (name, record) => (
        <div className={styles.sponsorName}>
          <img src={record.avatar} alt={name} className={styles.avatar} />
          <span>{name}</span>
        </div>
      ),
    },
    {
      title: "Investment",
      dataIndex: "investment",
      key: "investment",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact No",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "",
      key: "action",
      render: () => (
        <Button type="primary" className={styles.requestButton}>
          Request Sponsor
        </Button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={sponsors}
      pagination={pagination}
      rowKey="id"
      className={styles.table}
      onRow={(record) => ({
        onDoubleClick: () => handleRowDoubleClick(record), // Handle double-click on a row
      })}
    />
  );
};

export default SponsorTable;
