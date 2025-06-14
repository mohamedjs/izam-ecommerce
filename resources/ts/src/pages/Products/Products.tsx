import React, { useEffect, useState, useCallback } from 'react';
import { Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { setFilters, setCurrentPage } from '@/store/product/product.slice';
import SearchInput from '@/components/shared/SearchInput/SearchInput';
import ProductCard from '@/components/Product/ProductCard/ProductCard';
import ProductFilters from '@/components/Product/ProductFilters/ProductFilters';
import Button from '@/components/shared/Button/Button';
import './Products.scss';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { ProductService } from '@/store/product/product.service';


const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, currentPage, totalPages, filters } = useAppSelector((state) => state.product);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    dispatch(ProductService.fetchCategoriesAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(ProductService.fetchProductsAsync({
      page: currentPage,
      limit: 3,
      filters
    }));
  }, [currentPage, filters]);

  const handleSearch = useCallback((query: string) => {
    dispatch(setFilters({ ...filters, search: query }));
    dispatch(setCurrentPage(1));
  }, [dispatch, filters]);

  const handlePageChange = useCallback((page: number) => {
    dispatch(setCurrentPage(page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch]);

  const openFilters = () => setIsFiltersOpen(true);
  const closeFilters = () => setIsFiltersOpen(false);

  return (
    <div className="products-page">
      <div className="products-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <span>Home</span>
          <span>/</span>
          <span>Casual</span>
        </nav>

        {/* Header */}
        <div className="products-header">
          <div className="products-search">
            <SearchInput onSearch={handleSearch} />
          </div>
          <button className="filter-toggle" onClick={openFilters}>
            <Filter size={20} />
          </button>
        </div>

        {/* Title and Results Count */}
        <div className="products-title-section">
          <h1 className="products-title">Casual</h1>
          <p className="products-count">
            Showing {((currentPage - 1) * 6) + 1}-{Math.min(currentPage * 6, products.length)} of {products.length} Products
          </p>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {loading ? (
            <div className="products-loading">
              <div className="loading-spinner" />
              <p>Loading products...</p>
            </div>
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="products-empty">
              <p>No products found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <Button
              variant="ghost"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              icon={<ChevronLeft size={16} />}
            >
              Previous
            </Button>

            <div className="pagination-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
            </div>

            <Button
              variant="ghost"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              icon={<ChevronRight size={16} />}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      <ProductFilters isOpen={isFiltersOpen} onClose={closeFilters} />
    </div>
  );
};

export default Products;