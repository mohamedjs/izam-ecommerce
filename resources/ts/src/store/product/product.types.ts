export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  description: string;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export interface ProductQuery {
  page?: number;
  limit?: number;
  filters?: ProductFilters;
  sort?: string;
}

export interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  filters: ProductFilters;
  categories: string[];
}