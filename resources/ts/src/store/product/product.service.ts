import axiosInstance from '@/config/axios';
import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductQuery } from './product.types';
import { ProductState, ProductFilters } from './product.types';

export class ProductService {
  static fetchProductsAsync = createAsyncThunk(
    'product/fetchProducts',
    async (query: ProductQuery = {}, thunkApi) => {
        try {
             // Build query params
            const params: any = {
                page: query.page || 1,
                limit: query.limit || 6,
                ...query.filters,
            };
            const response = await axiosInstance.get('/v1/products', { params });
            // Assume Laravel returns { data, current_page, last_page }
            return {
                products: response.data.data,
                totalPages: response.data.last_page,
                currentPage: response.data.current_page,
            };
        } catch (err: any) {
            thunkApi.rejectWithValue(err)
        }
    }
  );

  static fetchCategoriesAsync = createAsyncThunk(
    'product/fetchCategories',
    async (_, thunkApi) => {
      try {
        const response = await axiosInstance.get('/v1/products/categories');
        return response.data;
      } catch (err: any) {
        thunkApi.rejectWithValue(err)
      }
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
  }

  static handleFetchProductsRejected(state: ProductState, action: PayloadAction<any>) {
    state.loading = false;
    state.error = action.error.message || 'Failed to fetch products';
  }

  static handleFetchCategoriesFulfilled(state: ProductState, action: PayloadAction<string[]>) {
    state.categories = action.payload;
  }
}
