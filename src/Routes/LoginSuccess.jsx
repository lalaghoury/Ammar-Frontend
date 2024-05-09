import React, { useEffect } from "react";
import { Spin } from "antd";
import axios from "axios";
import { signin } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppLayout from "../config/AppLayout/AppLayout";

const LoginSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`${process.env.API_URL}/auth/verify`);
        if (data.success) {
          dispatch(signin({ user: data.user }));
          navigate("/");
        }
      } catch (error) {
        console.log(error.response.data.message);
        navigate("/sign-in");
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  return (
    <AppLayout>
      {loading && (
        <Spin
          style={{
            marginTop: "200px",
            height: "calc(100vh - 200px)",
            width: "100vw",
          }}
          className="flex items-center justify-center"
        >
          <h1 className="text-3xl text-purple-700">Login Success</h1>
          <h1 className="text-3xl text-primary">redirecting you to homepage</h1>
        </Spin>
      )}
    </AppLayout>
  );
};

export default LoginSuccess;
