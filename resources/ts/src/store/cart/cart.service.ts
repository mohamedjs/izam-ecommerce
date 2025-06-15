import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CartState, AddToCartPayload, UpdateQuantityPayload, CartItem } from './cart.types';
import Cookie from 'js-cookie';
import axiosInstance from '@/config/axios';

export class CartService {
  static addToCart = createAsyncThunk(
    'cart/addToCart',
    async (payload: AddToCartPayload, thunkApi) => {
      try {
        const cartItems = JSON.parse(Cookie.get('cart') || '[]');
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

        Cookie.set('cart', JSON.stringify(cartItems));
        return payload;
      } catch (err: unknown) {
        if (err instanceof Error) {
          return thunkApi.rejectWithValue(err.message);
        }
        return thunkApi.rejectWithValue('Failed to add to cart');
      }
    }
  );

  static removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (id: string, thunkApi) => {
      try {
        const cartItems = JSON.parse(Cookie.get('cart') || '[]');
        const updatedItems = cartItems.filter((item: any) => item.id !== id);
        Cookie.set('cart', JSON.stringify(updatedItems));
        return id;
      } catch (err: unknown) {
        if (err instanceof Error) {
          return thunkApi.rejectWithValue(err.message);
        }
        return thunkApi.rejectWithValue('Failed to remove from cart');
      }
    }
  );

  static updateQuantity = createAsyncThunk(
    'cart/updateQuantity',
    async (payload: UpdateQuantityPayload, thunkApi) => {
      try {
        const cartItems = JSON.parse(Cookie.get('cart') || '[]');
        const itemIndex = cartItems.findIndex((item: any) => item.id === payload.id);

        if (itemIndex !== -1) {
          if (payload.quantity <= 0) {
            cartItems.splice(itemIndex, 1);
          } else {
            cartItems[itemIndex].quantity = payload.quantity;
          }
          Cookie.set('cart', JSON.stringify(cartItems));
        }
        return payload;
      } catch (err: unknown) {
        if (err instanceof Error) {
          return thunkApi.rejectWithValue(err.message);
        }
        return thunkApi.rejectWithValue('Failed to update quantity');
      }
    }
  );

  static clearCart = createAsyncThunk(
    'cart/clearCart',
    async (_, thunkApi) => {
      try {
        Cookie.remove('cart');
        return true;
      } catch (err: unknown) {
        if (err instanceof Error) {
          return thunkApi.rejectWithValue(err.message);
        }
        return thunkApi.rejectWithValue('Failed to clear cart');
      }
    }
  );

  static placeOrder = createAsyncThunk(
    'cart/placeOrder',
    async (items: CartItem[], thunkApi) => {
      try {
        const products = items.map(item => ({
            quantity: item.quantity,
            ...item.product
        }));
        await axiosInstance.post('/v1/orders', { products });
        thunkApi.dispatch(CartService.clearCart());
        return true;
      } catch (err: unknown) {
        if (err instanceof Error) {
          return thunkApi.rejectWithValue(err.message);
        } else {
          return thunkApi.rejectWithValue('Failed to place order');
        }
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
