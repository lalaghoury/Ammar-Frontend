import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { message } from 'antd';
import { API_URL } from '../../utils';

const initialState = {
  messages: [],
  singleMessage: null,
  loading: false,
  error: null,
};

// Async Thunks
export const messageThunks = {
  getAllMessages: createAsyncThunk(
    'messages/getAllMessages',
    async (chatId, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(`${API_URL}/messages/${chatId}`);
        if (data.success) {
          return data.messages;
        }
      } catch (error) {
        console.error('Error fetching messages:', error.response?.data);
        return rejectWithValue(error.response?.data?.message);
      }
    }
  ),

  createMessage: createAsyncThunk(
    'messages/createMessage',
    async (values, { rejectWithValue }) => {
      try {
        const { data } = await axios.post(`${API_URL}/messages/create`, values);
        if (data.success) {
          message.success(data.message);
          return data.newMessage;
        }
      } catch (error) {
        console.error('Error creating message:', error.response?.data);
        return rejectWithValue(error.response?.data?.message);
      }
    }
  ),

  updateMessage: createAsyncThunk(
    'messages/updateMessage',
    async ({ messageId, values }, { rejectWithValue }) => {
      try {
        const { data } = await axios.put(
          `${API_URL}/messages/update/${messageId}`,
          values
        );
        if (data.success) {
          message.success(data.message);
          return data.message;
        }
      } catch (error) {
        console.error('Error updating message:', error.response?.data);
        return rejectWithValue(error.response?.data?.message);
      }
    }
  ),

  deleteMessage: createAsyncThunk(
    'messages/deleteMessage',
    async (messageId, { rejectWithValue }) => {
      try {
        const { data } = await axios.delete(
          `${API_URL}/messages/delete/${messageId}`
        );
        if (data.success) {
          message.success(data.message);
          return messageId;
        }
      } catch (error) {
        console.error('Error deleting message:', error.response?.data);
        return rejectWithValue(error.response?.data?.message);
      }
    }
  ),
};

// Message Slice
const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload); // Add the new message to the existing array
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Messages
      .addCase(messageThunks.getAllMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(messageThunks.getAllMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(messageThunks.getAllMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })

      // Create Message
      .addCase(messageThunks.createMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(messageThunks.createMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload);
      })
      .addCase(messageThunks.createMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })

      // Update Message
      .addCase(messageThunks.updateMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(messageThunks.updateMessage.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.messages.findIndex(
          (message) => message._id === action.payload._id
        );
        if (index !== -1) {
          state.messages[index] = action.payload;
        }
      })
      .addCase(messageThunks.updateMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })

      // Delete Message
      .addCase(messageThunks.deleteMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(messageThunks.deleteMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = state.messages.filter(
          (message) => message._id !== action.payload
        );
      })
      .addCase(messageThunks.deleteMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      });
  },
});

export const { addMessage } = messageSlice.actions;

export default messageSlice.reducer;
