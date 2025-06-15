import axiosInstance from '@/config/axios';
import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Category, PriceRange, Product, ProductQuery, ProductState } from './product.types';

export class ProductService {
  static fetchProductsAsync = createAsyncThunk(
    'product/fetchProducts',
    async (query: ProductQuery = {}) => {
        const params: ProductQuery = {
            page: query.page || 1,
            limit: query.limit || 12,
            ...query.filters,
        };
        const response = await axiosInstance.get('/v1/products', { params });
        return {
            products: response.data.data.products.data,
            totalPages: response.data.data.products.last_page,
            currentPage: response.data.data.products.current_page,
            totalProducts: response.data.data.products.total,
            categories: response.data.data.categories,
            priceRange: response.data.data.price_range,
        };
    }
  );

  static handleFetchProductsPending(state: ProductState) {
    state.loading = true;
    state.error = null;
  }

  static handleFetchProductsFulfilled(state: ProductState, action: PayloadAction<{
    products: Product[];
    totalPages: number;
    currentPage: number;
    totalProducts: number;
    categories: Category[];
    priceRange: PriceRange
  }>) {
    state.loading = false;
    state.products = action.payload.products;
    state.filteredProducts = action.payload.products;
    state.totalPages = action.payload.totalPages;
    state.currentPage = action.payload.currentPage;
    state.totalProducts = action.payload.totalProducts;
    state.categories = action.payload.categories
    state.priceRangeData = action.payload.priceRange
  }

  static handleFetchProductsRejected(state: ProductState, action: PayloadAction<any>) {
    state.loading = false;
    state.error = (action as any).error?.message || 'Failed to fetch products';
  }

}
