import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CartState, AddToCartPayload, UpdateQuantityPayload } from './cart.types';
import { CartUtils } from './cart.utils';

export class CartService {
  static addToCart = createAsyncThunk(
    'cart/addToCart',
    async (payload: AddToCartPayload, thunkApi) => {
      try {
        // In a real app, this would be an API call
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
        // In a real app, this would be an API call
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
        // In a real app, this would be an API call
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
        // In a real app, this would be an API call
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