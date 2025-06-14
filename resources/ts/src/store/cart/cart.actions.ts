import { CartState } from './cart.types';

export class CartActions {
  static setCartItems(state: CartState, action: any) {
    state.items = action.payload;
  }

  static setCartLoading(state: CartState, action: any) {
    state.loading = action.payload;
  }

  static setCartError(state: CartState, action: any) {
    state.error = action.payload;
  }
} 