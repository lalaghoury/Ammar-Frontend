import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import userReducer from '../slices/userSlice';
import requestReducer from '../slices/requestSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    requests: requestReducer,
  },
});
