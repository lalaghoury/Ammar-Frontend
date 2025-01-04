import SponsorTable from './SponsorTable';
import styles from './SponsorList.module.css';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils';

const SponsorList = ({ prefix }) => {
  const [users, setUsers] = useState([]);

  const fetchSponsors = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/users/sponsors/all`
      );
      if (data.success) {
        setUsers(data.users);
        return data.users;
      }
    } catch (error) {
      console.error('Error fetching users:', error.response.data);
      return message.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  return (
    <div className={styles.sponsorListContainer}>
      <h2 className={styles.title}>Sponsor Lists:</h2>
      <SponsorTable
        sponsors={users}
        pagination={{ pageSize: 5, total: 120 }}
        prefix={prefix}
      />
    </div>
  );
};

export default SponsorList;
