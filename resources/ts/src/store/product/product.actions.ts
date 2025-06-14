import { ProductState, ProductFilters } from './product.types';

export class ProductActions {
  static setProducts(state: ProductState, action: any) {
    state.products = action.payload;
  }

  static setLoading(state: ProductState, action: any) {
    state.loading = action.payload;
  }

  static setError(state: ProductState, action: any) {
    state.error = action.payload;
  }

  static setFilters(state: ProductState, action: { payload: ProductFilters }) {
    state.filters = action.payload;
  }

  static setCurrentPage(state: ProductState, action: { payload: number }) {
    state.currentPage = action.payload;
  }

  static setCategories(state: ProductState, action: { payload: string[] }) {
    state.categories = action.payload;
  }

  static setProductParams(state: ProductState, action: { payload: { page?: number; filters?: ProductFilters } }) {
    if (action.payload.page !== undefined) {
      state.currentPage = action.payload.page;
    }
    if (action.payload.filters !== undefined) {
      state.filters = { ...state.filters, ...action.payload.filters };
    }
  }
}
