import axiosInstance from '@/config/axios';
import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductQuery, ProductState, ProductFilters } from './product.types';

export class ProductService {
  static fetchProductsAsync = createAsyncThunk(
    'product/fetchProducts',
    async (query: ProductQuery = {}) => {
      const params: any = {
        page: query.page || 1,
        limit: query.limit || 6,
        ...query.filters,
      };
      const response = await axiosInstance.get('/v1/products', { params });
      return {
        products: response.data.data,
        totalPages: response.data.last_page,
        currentPage: response.data.current_page,
        totalProducts: response.data.total,
      };
    }
  );

  static fetchCategoriesAsync = createAsyncThunk(
    'product/fetchCategories',
    async () => {
      const response = await axiosInstance.get('/v1/categories');
      return response.data;
    }
  );

  static handleFetchProductsPending(state: ProductState) {
    state.loading = true;
    state.error = null;
  }

  static handleFetchProductsFulfilled(state: ProductState, action: PayloadAction<any>) {
    state.loading = false;
    state.products = action.payload.products;
    state.filteredProducts = action.payload.products;
    state.totalPages = action.payload.totalPages;
    state.currentPage = action.payload.currentPage;
    state.totalProducts = action.payload.totalProducts;
  }

  static handleFetchProductsRejected(state: ProductState, action: PayloadAction<any>) {
    state.loading = false;
    state.error = (action as any).error?.message || 'Failed to fetch products';
  }

  static handleFetchCategoriesFulfilled(state: ProductState, action: PayloadAction<any>) {
    state.categories = action.payload.map((category) => category.name);
  }
}
