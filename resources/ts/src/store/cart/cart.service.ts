import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CartState, AddToCartPayload, UpdateQuantityPayload } from './cart.types';
import { CartUtils } from './cart.utils';

export class CartService {
  static addToCart = createAsyncThunk(
    'cart/addToCart',
    async (payload: AddToCartPayload, thunkApi) => {
      try {
        const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItem = cartItems.find((item: any) => item.product.id === payload.product.id);

        if (existingItem) {
          existingItem.quantity += payload.quantity;
        } else {
          cartItems.push({
            id: `${payload.product.id}-${Date.now()}`,
            product: payload.product,
            quantity: payload.quantity
          });
        }

        localStorage.setItem('cart', JSON.stringify(cartItems));
        return payload;
      } catch (err: any) {
        return thunkApi.rejectWithValue(err);
      }
    }
  );

  static removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (id: string, thunkApi) => {
      try {
        const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        const updatedItems = cartItems.filter((item: any) => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(updatedItems));
        return id;
      } catch (err: any) {
        return thunkApi.rejectWithValue(err);
      }
    }
  );

  static updateQuantity = createAsyncThunk(
    'cart/updateQuantity',
    async (payload: UpdateQuantityPayload, thunkApi) => {
      try {
        const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        const itemIndex = cartItems.findIndex((item: any) => item.id === payload.id);

        if (itemIndex !== -1) {
          if (payload.quantity <= 0) {
            cartItems.splice(itemIndex, 1);
          } else {
            cartItems[itemIndex].quantity = payload.quantity;
          }
          localStorage.setItem('cart', JSON.stringify(cartItems));
        }
        return payload;
      } catch (err: any) {
        return thunkApi.rejectWithValue(err);
      }
    }
  );

  static clearCart = createAsyncThunk(
    'cart/clearCart',
    async (_, thunkApi) => {
      try {
        localStorage.removeItem('cart');
        return true;
      } catch (err: any) {
        return thunkApi.rejectWithValue(err);
      }
    }
  );

  // Handlers
  static handleAddToCartPending(state: CartState) {
    state.loading = true;
    state.error = null;
  }

  static handleAddToCartFulfilled(state: CartState, action: PayloadAction<AddToCartPayload>) {
    const { product, quantity } = action.payload;
    const existingItem = state.items.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      state.items.push({
        id: `${product.id}-${Date.now()}`,
        product,
        quantity
      });
    }
    state.loading = false;
  }

  static handleAddToCartRejected(state: CartState, action: PayloadAction<any>) {
    state.loading = false;
    state.error = action.payload?.message || 'Failed to add item to cart';
  }

  static handleRemoveFromCartFulfilled(state: CartState, action: PayloadAction<string>) {
    state.items = state.items.filter(item => item.id !== action.payload);
  }

  static handleUpdateQuantityFulfilled(state: CartState, action: PayloadAction<UpdateQuantityPayload>) {
    const { id, quantity } = action.payload;
    const item = state.items.find(item => item.id === id);

    if (item) {
      if (quantity <= 0) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        item.quantity = quantity;
      }
    }
  }

  static handleClearCartFulfilled(state: CartState) {
    state.items = [];
  }
}