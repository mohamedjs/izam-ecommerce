import { createSlice } from '@reduxjs/toolkit';
import { CartState } from './cart.types';
import { CartService } from './cart.service';
import { CartActions } from './cart.actions';

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setItems: CartActions.setCartItems,
    setLoading: CartActions.setCartLoading,
    setError: CartActions.setCartError,
  },
  extraReducers: (builder) => {
    builder
      .addCase(CartService.addToCart.pending, CartService.handleAddToCartPending)
      .addCase(CartService.addToCart.fulfilled, CartService.handleAddToCartFulfilled)
      .addCase(CartService.addToCart.rejected, CartService.handleAddToCartRejected)
      .addCase(CartService.removeFromCart.fulfilled, CartService.handleRemoveFromCartFulfilled)
      .addCase(CartService.updateQuantity.fulfilled, CartService.handleUpdateQuantityFulfilled)
      .addCase(CartService.clearCart.fulfilled, CartService.handleClearCartFulfilled);
  },
});

export const { setItems, setLoading, setError } = cartSlice.actions;
export default cartSlice.reducer;