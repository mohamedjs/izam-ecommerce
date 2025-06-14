import { mockProducts } from '@/data/mockProducts';
import { Product, ProductQuery } from './product.types';

export class ProductService {
  static async getProducts(query: ProductQuery = {}): Promise<{
    products: Product[];
    totalPages: number;
    currentPage: number;
  }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredProducts = [...mockProducts];
        
        // Apply filters
        if (query.filters) {
          const { category, minPrice, maxPrice, search } = query.filters;
          
          if (category && category !== 'All') {
            filteredProducts = filteredProducts.filter(p => p.category === category);
          }
          
          if (minPrice !== undefined) {
            filteredProducts = filteredProducts.filter(p => p.price >= minPrice);
          }
          
          if (maxPrice !== undefined) {
            filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);
          }
          
          if (search) {
            filteredProducts = filteredProducts.filter(p => 
              p.name.toLowerCase().includes(search.toLowerCase())
            );
          }
        }
        
        // Pagination
        const page = query.page || 1;
        const limit = query.limit || 6;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
        
        resolve({
          products: paginatedProducts,
          totalPages: Math.ceil(filteredProducts.length / limit),
          currentPage: page
        });
      }, 500);
    });
  }

  static async getCategories(): Promise<string[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const categories = ['All', ...new Set(mockProducts.map(p => p.category))];
        resolve(categories);
      }, 200);
    });
  }
}