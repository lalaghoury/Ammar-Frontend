import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { signin as signinAction } from './authSlice';
import { API_URL } from '../../utils';

const initialState = {
  data: [],
  singleUser: null,
  loading: false,
  error: null,
};

export const userThunks = {
  getAllUsers: createAsyncThunk(
    'user/getAllUsers',
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(`${API_URL}/users/admin/all`);
        if (data.success) {
          return data.users;
        }
      } catch (error) {
        console.error('Error fetching users:', error.response.data);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  updateUser: createAsyncThunk(
    'user/updateUser',
    async ({ values, url }, { dispatch, rejectWithValue }) => {
      try {
        const { data } = await axios.put(`${API_URL}${url}`, values);
        if (data.success) {
          dispatch(signinAction({ user: data.user }));
          message.success(data.message);
          return data.user;
        }
      } catch (error) {
        console.error('Error Updating user:', error.response.data);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  deleteUser: createAsyncThunk(
    'user/deleteUser',
    async ({ url }, { rejectWithValue }) => {
      try {
        const { data } = await axios.delete(`${API_URL}${url}`);
        if (data.success) {
          message.success(data.message);
          return data.user._id;
        }
      } catch (error) {
        console.error('Error deleting user:', error.response.data);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  getUser: createAsyncThunk('user/getUser', async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/users/single/${id}`);
      if (data.success) {
        return data.user;
      }
    } catch (error) {
      console.error('Error fetching user:', error.response.data);
      return rejectWithValue(error.response.data.message);
    }
  }),
};

export const useUserEffect = (type) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === 'get-user') {
      dispatch(userThunks.getPresentUser());
    } else {
      dispatch(userThunks.getAllUsers());
    }
  }, [dispatch]);
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userThunks.getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(userThunks.getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(userThunks.getAllUsers.rejected, (state, action) => {
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
        state.data = state.data.filter((user) => user._id !== action.payload);
      })
      .addCase(userThunks.deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })
      .addCase(userThunks.getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(userThunks.getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.singleUser = action.payload;
      })
      .addCase(userThunks.getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      });
  },
});

export default userSlice.reducer;
