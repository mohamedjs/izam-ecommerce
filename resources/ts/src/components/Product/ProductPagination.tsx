import React from 'react';
import Button from '@/components/shared/Button/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  pageNumbers: (number | string)[];
  handlePageChange: (page: number) => void;
}

const ProductPagination: React.FC<ProductPaginationProps> = ({ currentPage, totalPages, pageNumbers, handlePageChange }) => {
  if (totalPages <= 1) return null;
  return (
    <nav className="pagination" aria-label="Product Pagination">
      <Button
        variant="ghost"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        icon={<ChevronLeft size={16} />}
        aria-label="Previous Page"
        className='btn-prev'
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
        className='btn-prev'
      >
        Next
      </Button>
    </nav>
  );
};

export default ProductPagination;
