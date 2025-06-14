import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth.slice';
import productReducer from './product/product.slice';
import cartReducer from './cart/cart.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;