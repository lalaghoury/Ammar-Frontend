import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signin } from '../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import { API_URL } from '../utils';

export default function IsSponsor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { verified } = useSelector((state) => state.auth);

  useEffect(() => {
    const verifyLogin = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/auth/verify/sponsor`);
        if (data.success) {
          dispatch(signin({ user: data.user }));
          return;
        }
      } catch (error) {
        console.error('Verification failed:', error.response.data.message);
        navigate('page-not-found', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    verifyLogin();
  }, [navigate]);

  if (loading) {
    return (
      <Spin
        style={{
          marginTop: '200px',
          height: 'calc(100vh - 200px)',
          width: '100vw',
        }}
      />
    );
  }

  return verified && <Outlet />;
}
