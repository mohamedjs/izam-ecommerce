export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  stock: number;
  main_image: string;
  description: string;
}

export interface ProductFilters {
  category?: number[];
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
  totalProducts: number;
  filters: ProductFilters;
  categories: Category[];
  priceRangeData: PriceRange | null
}

export interface PriceRange {
    min: number;
    max:number
}

export interface Category {
  id: string;
  name: string;
}
