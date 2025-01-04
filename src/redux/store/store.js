import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import userReducer from '../slices/userSlice';
import requestReducer from '../slices/requestSlice';
import messageReducer from '../slices/messageSlice';
import chatReducer from '../slices/chatSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    requests: requestReducer,
    messages: messageReducer,
    chats: chatReducer,
  },
});
