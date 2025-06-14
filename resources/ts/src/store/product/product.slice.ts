import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ProductService } from './product.service';
import { ProductState, ProductQuery, ProductFilters } from './product.types';

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  filters: {},
  categories: [],
};

export const fetchProductsAsync = createAsyncThunk(
  'product/fetchProducts',
  async (query: ProductQuery = {}) => {
    return await ProductService.getProducts(query);
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    return await ProductService.getCategories();
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<ProductFilters>) => {
      state.filters = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.filteredProducts = action.payload.products;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { setFilters, clearFilters, setCurrentPage } = productSlice.actions;
export default productSlice.reducer;