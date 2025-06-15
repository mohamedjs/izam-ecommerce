import { createSlice } from '@reduxjs/toolkit';
import { ProductState } from './product.types';
import { ProductService } from './product.service';
import { ProductActions } from './product.actions';

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalProducts: 0,
  filters: {},
  categories: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: ProductActions.setProducts,
    setLoading: ProductActions.setLoading,
    setError: ProductActions.setError,
    setFilters: ProductActions.setFilters,
    setCurrentPage: ProductActions.setCurrentPage,
    setCategories: ProductActions.setCategories,
    setProductParams: ProductActions.setProductParams,
  },
  extraReducers: (builder) => {
    builder
      .addCase(ProductService.fetchProductsAsync.pending, ProductService.handleFetchProductsPending)
      .addCase(ProductService.fetchProductsAsync.fulfilled, ProductService.handleFetchProductsFulfilled)
      .addCase(ProductService.fetchProductsAsync.rejected, ProductService.handleFetchProductsRejected)
  },
});

export const { setProducts, setLoading, setError, setFilters, setCurrentPage, setCategories, setProductParams } = productSlice.actions;
export default productSlice.reducer;
