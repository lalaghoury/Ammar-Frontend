import { Table, Button, DatePicker, Image, Spin, Tag } from 'antd';
import Title from 'antd/es/typography/Title';
import { useDispatch, useSelector } from 'react-redux';
import {
  requestThunks,
  useRequestEffect,
} from '../../redux/slices/requestSlice';
import { getRequestStatusColor } from '../../utils';
import DeleteRequestModal from '../Modals/DeleteRequestModal';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const MyRequests = () => {
  useRequestEffect();
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.requests);
  const { user } = useSelector((state) => state.auth);

  const handlestatusChange = (id, status) => {
    dispatch(requestThunks.updateRequest({ id, values: { status } }));
  };

  const columns = [
    {
      title: 'S.no',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => parseInt(a.id) - parseInt(b.id), // Sorting logic
    },
    {
      title: user.role === 'sponsor' ? 'Startup Details' : 'Sponsor Details',
      dataIndex: user.role === 'sponsor' ? 'startup' : 'sponsor',
      key: user.role,
      sorter: (a, b) => a.name.localeCompare(b.name), // Sorting logic
      render: (sponsor) => {
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ width: 60 }}>
              <Image
                src={sponsor.avatar}
                alt={sponsor.name}
                width={50}
                height={50}
                style={{ objectFit: 'center', borderRadius: '9px' }}
                fallback="https://via.placeholder.com/50x50"
              />
            </span>
            <span style={{ flex: 1 }}>
              <Title style={{ margin: 0 }} level={5} className="cursor-pointer">
                {sponsor.name}
              </Title>
              <p>{sponsor.email}</p>
              <p>{sponsor.phone}</p>
            </span>
          </div>
        );
      },
    },
    {
      title: 'Amount Requested',
      dataIndex: 'amountRequested',
      key: 'amountRequested',
      sorter: (a, b) => a.amountRequested.localeCompare(b.amountRequested), // Sorting logic
    },
    {
      title: 'Date of Request',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt), // Sorting logic
      render: (date) => new Date(date).toDateString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        const color = getRequestStatusColor(text);

        return (
          <Tag color={color} className={`text-base`}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      dataIndex: '_id',
      render: (_id, record) => (
        <div className="flex items-center gap-2">
          {user.role === 'sponsor' && (
            <>
              {record.status === 'APPROVED' && (
                <Button
                  icon={<CheckOutlined />}
                  type="primary"
                  size="small"
                  disabled
                />
              )}

              {record.status === 'PENDING' && (
                <Button
                  icon={<CheckOutlined />}
                  type="primary"
                  size="small"
                  onClick={() => handlestatusChange(_id, 'APPROVED')}
                />
              )}

              {record.status === 'DECLINED' && (
                <Button
                  icon={<CloseOutlined />}
                  type="primary"
                  danger
                  disabled
                  size="small"
                  onClick={() => handlestatusChange(_id, 'PENDING')}
                />
              )}
            </>
          )}

          {user.role === 'startup' && <DeleteRequestModal id={_id} />}
        </div>
      ),
    },
  ];

  return (
    <Spin spinning={loading}>
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
          pagination={{ pageSize: 5 }}
          rowKey="id"
        />
      </div>
    </Spin>
  );
};

export default MyRequests;
