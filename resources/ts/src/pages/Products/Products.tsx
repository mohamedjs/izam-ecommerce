import React, { useEffect, useState } from 'react';
import { Filter } from 'lucide-react';
import { setProductParams } from '@/store/product/product.slice';
import SearchInput from '@/components/shared/SearchInput/SearchInput';
import ProductFilters from '@/components/Product/ProductFilters/ProductFilters';
import './Products.scss';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { ProductService } from '@/store/product/product.service';
import { getPageNumbers, getProductDisplayRange } from '@/store/product/product.utils';
import OrderSummary from '@/components/Cart/OrderSummary';
import useWindowSize from '@/hooks/useWindowSize';
import ProductGrid from '@/components/Product/ProductGrid';
import ProductPagination from '@/components/Product/ProductPagination';

const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, currentPage, totalPages, totalProducts, filters } = useAppSelector((state) => state.product);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    dispatch(ProductService.fetchProductsAsync({
      page: currentPage,
      limit: 12,
      filters,
    }));
  }, [currentPage, filters, dispatch]);

  function handleSearch(query: string) {
    dispatch(setProductParams({
      filters: { search: query },
      page: 1
    }));
  }

  function handlePageChange(page: number) {
    if (page > 0 && page <= totalPages) {
      dispatch(setProductParams({ page }));
    }
  }

  const openFilters = () => setIsFiltersOpen(true);
  const closeFilters = () => setIsFiltersOpen(false);

  const itemsPerPage = 12;
  const { startIndex, endIndex } = getProductDisplayRange(currentPage, itemsPerPage, products.length, totalProducts);
  const pageNumbers = getPageNumbers(currentPage, totalPages, 5);

  return (
    <div className="products-page">
      <div className="products-container">
        <div style={{ flex: 1 }}>
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <span>Home</span>
            <span>/</span>
            <span>Casual</span>
          </nav>

          {/* Header */}
          <div className="products-header">
            <div className="products-search">
              <SearchInput onSearch={handleSearch} onFilter={openFilters} />
            </div>
            {width > 765 && <button className="filter-toggle" onClick={openFilters}>
              <Filter size={20} />
            </button>}
          </div>

          {/* Title and Results Count */}
          <div className="products-title-section">
            <h1 className="products-title">Casual</h1>
            <p className="products-count">
              Showing {products.length > 0 ? startIndex + 1 : 0}-{endIndex} of {totalProducts} Products
            </p>
          </div>

          {/* Products Grid */}
          <ProductGrid products={products} loading={loading} />

          {/* Pagination */}
          <ProductPagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageNumbers={pageNumbers}
            handlePageChange={handlePageChange}
          />
        </div>
        <div style={{ width: 340, minWidth: 300 }}>
          <OrderSummary />
        </div>
      </div>

      <ProductFilters isOpen={isFiltersOpen} onClose={closeFilters} />
    </div>
  );
};

export default Products;
