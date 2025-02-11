import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './SponsorList.module.css';
import AddRequestModal from '../Modals/AddRequestModal';

const SponsorTable = ({ sponsors, pagination, prefix }) => {
  const navigate = useNavigate(); // React Router hook for navigation

  const handleRowDoubleClick = (record) => {
    if (!prefix || !record?.id) {
      console.error('Invalid prefix or record data');
      return;
    }

    const route = `/${prefix}/sponsor/${record.id}`;
    navigate(route); // Navigate to the dynamic route
  };

  const columns = [
    {
      title: 'S.no',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Sponsor Name',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <div className={styles.sponsorName}>
          <img src={record.avatar} alt={name} className={styles.avatar} />
          <span>{name}</span>
        </div>
      ),
    },
    {
      title: 'Investment',
      dataIndex: 'investment',
      key: 'investment',
      render: () => <>{Math.floor(Math.random() * 50000)} PKR</>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Contact No',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: '_id',
      render: (_id) => <AddRequestModal id={_id} />,
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
