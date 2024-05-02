import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const userThunks = {
  getUsers: createAsyncThunk(
    "user/getUsers",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(`${process.env.API_URL}/users/all`);
        if (data.success) {
          return data.users;
        }
      } catch (error) {
        console.error("Error fetching orders:", error.response.data);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  updateUser: createAsyncThunk(
    "user/updateUser",
    async ({ id, values }, { rejectWithValue }) => {
      try {
        const { data } = await axios.put(
          `${process.env.API_URL}/users/update/${id}`,
          values
        );
        if (data.success) {
          return data.user;
        }
      } catch (error) {
        console.error("Error fetching orders:", error.response.data);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  deleteUser: createAsyncThunk(
    "user/deleteUser",
    async ({ id }, { rejectWithValue }) => {
      try {
        const { data } = await axios.delete(
          `${process.env.API_URL}/users/delete/${id}`
        );
        if (data.success) {
          return data.user;
        }
      } catch (error) {
        console.error("Error fetching orders:", error.response.data);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
};

export const useUserEffect = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userThunks.getUsers());
  }, [dispatch]);
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userThunks.getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(userThunks.getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(userThunks.getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })
      .addCase(userThunks.updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(userThunks.updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(userThunks.updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })
      .addCase(userThunks.deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(userThunks.deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (user) => user._id !== action.payload._id
        );
      })
      .addCase(userThunks.deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
