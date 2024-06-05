import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signin as signinAction, signout as signoutAction } from "./authSlice";

const initialState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
  verified: false,
  token: null,
};

export const useAuthActions = () => {
  const dispatch = useDispatch();

  const signin = async (values) => {
    try {
      const { data } = await axios.post(
        `${process.env.API_URL}/auth/signin`,
        values
      );
      if (data.success) {
        const { user } = data;
        dispatch(signinAction({ user }));
        message.success(data.message);
        return true;
      }
    } catch (error) {
      message.error(error.response.data.message || "Something went wrong");
      return false;
    }
  };

  const signout = async () => {
    try {
      await axios.post(`${process.env.API_URL}/auth/signout`);
      dispatch(signoutAction());
      message.success("Logged out successfully");
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  return { signin, signout };
};

export const authThunks = {
  signout: createAsyncThunk("auth/signout", async (_, { dispatch }) => {
    try {
      const { data } = await axios.post(`${process.env.API_URL}/auth/signout`);
      if (data.success) {
        dispatch(signoutAction());
        window.location.href = "/sign-in";
        return true;
      }
    } catch (error) {
      console.error("Error logging out:", error.response.data.message);
      throw error.response.data.message;
    }
  }),
};

export const useAuthEffect = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      const { user } = JSON.parse(auth);
      dispatch(signinAction({ user }));
    }
  }, [dispatch]);
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state, action) => {
      const { user } = action.payload;
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user,
          isLoggedIn: true,
          verified: true,
        })
      );
      Object.assign(state, {
        user,
        isLoggedIn: true,
        verified: true,
      });
    },
    signout: (state) => {
      localStorage.removeItem("auth");
      Object.assign(state, initialState);
    },
  },
});

export const { signin, signout } = authSlice.actions;

export default authSlice.reducer;
