import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { API_URL } from '../../utils';

const initialState = {
  data: [],
  singleRequest: null,
  loading: false,
  error: null,
};

export const requestThunks = {
  getAllRequest: createAsyncThunk(
    'request/getAllRequest',
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(`${API_URL}/requests/all`);
        if (data.success) {
          return data.requests;
        }
      } catch (error) {
        console.error('Error fetching requests:', error.response.data);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  updateRequest: createAsyncThunk(
    'request/updateRequest',
    async ({ values, id }, { rejectWithValue }) => {
      try {
        const { data } = await axios.put(
          `${API_URL}/requests/update/${id}`,
          values
        );
        if (data.success) {
          message.success(data.message);
          return data.request;
        }
      } catch (error) {
        console.error('Error Updating request:', error.response.data);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  deleteRequest: createAsyncThunk(
    'request/deleteRequest',
    async ({ id }, { rejectWithValue }) => {
      try {
        const { data } = await axios.delete(`${API_URL}/requests/delete/${id}`);
        if (data.success) {
          message.success(data.message);
          return data.request._id;
        }
      } catch (error) {
        console.error('Error deleting request:', error.response.data);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  getRequest: createAsyncThunk(
    'request/getRequest',
    async (id, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(`${API_URL}/requests/single/${id}`);
        if (data.success) {
          return data.request;
        }
      } catch (error) {
        console.error('Error fetching request:', error.response.data);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  createRequest: createAsyncThunk(
    'request/createRequest',
    async ({ values }, { rejectWithValue }) => {
      console.log('🚀 ~ values:', values);
      try {
        const { data } = await axios.post(`${API_URL}/requests/create`, values);
        if (data.success) {
          message.success(data.message);
          return data.request;
        }
      } catch (error) {
        console.error('Error creating request:', error.response.data);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
};

export const useRequestEffect = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(requestThunks.getRequest(id));
    } else {
      dispatch(requestThunks.getAllRequest());
    }
  }, [dispatch, id]);
};

const requestSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestThunks.getAllRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestThunks.getAllRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(requestThunks.getAllRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })
      .addCase(requestThunks.updateRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestThunks.updateRequest.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(
          (request) => request._id === action.payload._id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(requestThunks.updateRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })
      .addCase(requestThunks.deleteRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestThunks.deleteRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (request) => request._id !== action.payload
        );
      })
      .addCase(requestThunks.deleteRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })
      .addCase(requestThunks.getRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestThunks.getRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.singleRequest = action.payload;
      })
      .addCase(requestThunks.getRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      });
  },
});

export default requestSlice.reducer;
