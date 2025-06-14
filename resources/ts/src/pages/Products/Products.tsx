import React, { useEffect, useState, useRef } from 'react';
import { Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { setFilters, setCurrentPage, setProductParams } from '@/store/product/product.slice';
import SearchInput from '@/components/shared/SearchInput/SearchInput';
import ProductCard from '@/components/Product/ProductCard/ProductCard';
import ProductFilters from '@/components/Product/ProductFilters/ProductFilters';
import Button from '@/components/shared/Button/Button';
import './Products.scss';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { ProductService } from '@/store/product/product.service';
import { getPageNumbers, getProductDisplayRange } from '@/store/product/product.utils';

const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, currentPage, totalPages, totalProducts, filters } = useAppSelector((state) => state.product);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);


  useEffect(() => {
    dispatch(ProductService.fetchCategoriesAsync());
  }, []);

  // Debounce the product fetch effect
  useEffect(() => {
    dispatch(ProductService.fetchProductsAsync({
        page: currentPage,
        limit: 6,
        filters
    }));

  }, [currentPage, filters]);

  function handleSearch(query: string) {
    dispatch(setProductParams({
      filters: { search: query },
      page: 1
    }));
  }

  function handlePageChange(page: number) {
    if (page > 0 && page <= totalPages) {
      dispatch(setProductParams({ page }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  const openFilters = () => setIsFiltersOpen(true);
  const closeFilters = () => setIsFiltersOpen(false);

  const itemsPerPage = 6;
  const { startIndex, endIndex } = getProductDisplayRange(currentPage, itemsPerPage, products.length, totalProducts);
  const pageNumbers = getPageNumbers(currentPage, totalPages, 5);

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
            Showing {products.length > 0 ? startIndex + 1 : 0}-{endIndex} of {totalProducts} Products
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
        {totalPages > 1 && (totalProducts > 0) && (
          <nav className="pagination" aria-label="Product Pagination">
            <Button
              variant="ghost"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              icon={<ChevronLeft size={16} />}
              aria-label="Previous Page"
            >
              Previous
            </Button>

            <div className="pagination-numbers-wrapper">
              <div className="pagination-numbers" style={{ overflowX: 'auto', display: 'flex', gap: 8, padding: '0 4px' }}>
                {pageNumbers.map((page, index) => (
                  page === '...'
                    ? <span key={index} className="pagination-ellipsis" aria-hidden="true">...</span>
                    : <button
                        key={page}
                        className={`pagination-number${currentPage === page ? ' active' : ''}`}
                        onClick={() => handlePageChange(page as number)}
                        aria-current={currentPage === page ? 'page' : undefined}
                        aria-label={`Go to page ${page}`}
                        style={{ minWidth: 40, minHeight: 40, fontSize: 16, borderRadius: 8 }}
                      >
                        {page}
                      </button>
                ))}
              </div>
            </div>

            <Button
              variant="ghost"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              icon={<ChevronRight size={16} />}
              aria-label="Next Page"
            >
              Next
            </Button>
          </nav>
        )}
      </div>

      <ProductFilters isOpen={isFiltersOpen} onClose={closeFilters} />
    </div>
  );
};

export default Products;
