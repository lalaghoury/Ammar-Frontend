import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const initialState = {
  data: {},
  count: 0,
  loading: false,
  error: null,
};

export const cartThunks = {
  addToCart: createAsyncThunk(
    "cart/addToCart",
    async ({ productId, quantity = 1, price }, { rejectWithValue }) => {
      try {
        const { data } = await axios.post(`${process.env.API_URL}/cart/add`, {
          productId,
          quantity,
          price,
        });
        if (data.success) {
          console.log("🚀 ~ data.cart: ", data.cart);
          message.success(data.message);
          return data.cart;
        }
      } catch (error) {
        console.error(
          "Error adding product to cart:",
          error.response.data.message
        );
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  fetchCartItems: createAsyncThunk(
    "cart/fetchCartItems",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(`${process.env.API_URL}/cart/my-cart`);
        if (data.success) {
          return data.cart;
        }
      } catch (error) {
        console.error("Error fetching cart:", error.response.data.message);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  updateQuantity: createAsyncThunk(
    "cart/updateQuantity",
    async ({ productId, quantity, price }, { rejectWithValue }) => {
      try {
        const { data } = await axios.put(`${process.env.API_URL}/cart/update`, {
          productId,
          quantity,
          price,
        });
        if (data.success) {
          message.success(data.message);
          return data.cart;
        }
      } catch (error) {
        console.error("Error updating quantity:", error.response.data.message);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  deleteCartItem: createAsyncThunk(
    "cart/deleteCartItem",
    async (itemId, { rejectWithValue }) => {
      try {
        const { data } = await axios.delete(
          `${process.env.API_URL}/cart/remove/${itemId}`
        );
        if (data.success) {
          message.success(data.message);
          return data.cart;
        }
      } catch (error) {
        console.error("Error deleting product:", error.response.data.message);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  applyCoupon: createAsyncThunk(
    "cart/applyCoupon",
    async (couponCode, { dispatch, rejectWithValue }) => {
      try {
        const { data } = await axios.post(
          `${process.env.API_URL}/coupon/apply-coupon`,
          {
            couponCode,
          }
        );
        if (data.success) {
          message.success(data.message);
          dispatch(cartThunks.fetchCartItems());
          return data.cart;
        }
      } catch (error) {
        console.error("Error applying coupon:", error.response.data.message);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  handlePayment: createAsyncThunk(
    "cart/handlePayment",
    async (
      { nonce, amount, products, shipping_address, navigate },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await axios.post(
          `${process.env.API_URL}/checkout/payment`,
          {
            nonce,
            amount,
            products,
            shipping_address,
          }
        );
        if (data.success) {
          message.success(data.message);
          navigate("/order-confirmed");
          return data.cart;
        }
      } catch (error) {
        console.error("Error handling payment:", error.response.data.message);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  getCount: createAsyncThunk(
    "cart/getCount",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(
          `${process.env.API_URL}/cart/user-cart-count`
        );
        if (data.success) {
          return data.count;
        }
      } catch (error) {
        console.error("Error fetching cart:", error.response.data.message);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
};

export const useCartEffect = (type) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "count") {
      dispatch(cartThunks.getCount());
    } else {
      dispatch(cartThunks.fetchCartItems());
    }
  }, [dispatch]);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cartThunks.addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(cartThunks.addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
        state.count = action.payload.items.length;
      })
      .addCase(cartThunks.addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })
      .addCase(cartThunks.deleteCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(cartThunks.deleteCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.count = action.payload.items.length;
      })
      .addCase(cartThunks.deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })
      .addCase(cartThunks.fetchCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(cartThunks.fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(cartThunks.fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cartThunks.updateQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(cartThunks.updateQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(cartThunks.updateQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })
      .addCase(cartThunks.applyCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(cartThunks.applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        // state.data = action.payload;
      })
      .addCase(cartThunks.applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })
      .addCase(cartThunks.handlePayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(cartThunks.handlePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(cartThunks.handlePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })
      .addCase(cartThunks.getCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(cartThunks.getCount.fulfilled, (state, action) => {
        state.loading = false;
        state.count = action.payload;
      })
      .addCase(cartThunks.getCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = cartSlice.actions;

export default cartSlice.reducer;