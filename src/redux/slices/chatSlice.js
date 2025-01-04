import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { message } from 'antd';
import { API_URL } from '../../utils';

const initialState = {
  chats: [],
  singleChat: null,
  totalChats: 0,
  loading: false,
  error: null,
};

// Async Thunks
export const chatThunks = {
  getAllChats: createAsyncThunk(
    'chats/getAllChats',
    async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(
          `${API_URL}/chats/all?page=${page}&limit=${limit}`
        );
        if (data.success) {
          return { chats: data.chats, totalChats: data.totalChats };
        }
      } catch (error) {
        console.error('Error fetching chats:', error.response?.data);
        return rejectWithValue(error.response?.data?.message);
      }
    }
  ),

  getChatById: createAsyncThunk(
    'chats/getChatById',
    async (chatId, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(`${API_URL}/chats/single/${chatId}`);
        if (data.success) {
          return data.chat;
        }
      } catch (error) {
        console.error('Error fetching chat:', error.response?.data);
        return rejectWithValue(error.response?.data?.message);
      }
    }
  ),

  createChat: createAsyncThunk(
    'chats/createChat',
    async ({ sponsor, startup }, { rejectWithValue }) => {
      try {
        const { data } = await axios.post(`${API_URL}/chats/create`, {
          sponsor,
          startup,
        });
        if (data.success) {
          message.success(data.message);
          return data.chat;
        }
      } catch (error) {
        console.error('Error creating chat:', error.response?.data);
        return rejectWithValue(error.response?.data?.message);
      }
    }
  ),

  updateChat: createAsyncThunk(
    'chats/updateChat',
    async ({ chatId, values }, { rejectWithValue }) => {
      try {
        const { data } = await axios.put(
          `${API_URL}/chats/update/${chatId}`,
          values
        );
        if (data.success) {
          message.success(data.message);
          return data.chat;
        }
      } catch (error) {
        console.error('Error updating chat:', error.response?.data);
        return rejectWithValue(error.response?.data?.message);
      }
    }
  ),

  deleteChat: createAsyncThunk(
    'chats/deleteChat',
    async (chatId, { rejectWithValue }) => {
      try {
        const { data } = await axios.delete(
          `${API_URL}/chats/delete/${chatId}`
        );
        if (data.success) {
          message.success(data.message);
          return chatId;
        }
      } catch (error) {
        console.error('Error deleting chat:', error.response?.data);
        return rejectWithValue(error.response?.data?.message);
      }
    }
  ),
};

// Chat Slice
const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    changelastMessage: (state, action) => {
      console.log('🚀 ~ action:', action);
      state.singleChat.lastMessage = action.payload;
      state.chats = state.chats.map((chat) => {
        if (chat._id === state.singleChat._id) {
          chat.lastMessage = action.payload;
        }
        return chat;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Chats
      .addCase(chatThunks.getAllChats.pending, (state) => {
        state.loading = true;
      })
      .addCase(chatThunks.getAllChats.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload.chats;
        state.totalChats = action.payload.totalChats;
      })
      .addCase(chatThunks.getAllChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })

      // Get Chat By ID
      .addCase(chatThunks.getChatById.pending, (state) => {
        state.loading = true;
      })
      .addCase(chatThunks.getChatById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleChat = action.payload;
      })
      .addCase(chatThunks.getChatById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })

      // Create Chat
      .addCase(chatThunks.createChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(chatThunks.createChat.fulfilled, (state, action) => {
        state.loading = false;
        state.chats.push(action.payload);
      })
      .addCase(chatThunks.createChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })

      // Update Chat
      .addCase(chatThunks.updateChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(chatThunks.updateChat.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.chats.findIndex(
          (chat) => chat._id === action.payload._id
        );
        if (index !== -1) {
          state.chats[index] = action.payload;
        }
      })
      .addCase(chatThunks.updateChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })

      // Delete Chat
      .addCase(chatThunks.deleteChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(chatThunks.deleteChat.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = state.chats.filter((chat) => chat._id !== action.payload);
      })
      .addCase(chatThunks.deleteChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      });
  },
});

export const { changelastMessage } = chatSlice.actions;

export default chatSlice.reducer;
