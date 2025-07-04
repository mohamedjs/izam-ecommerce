// Product utilities for pagination and product list calculations

/**
 * Generate dynamic pagination numbers for pagination UI.
 * @param currentPage Current active page
 * @param totalPages Total number of pages
 * @param maxPagesToShow Maximum number of page buttons to show (default 5)
 */
export function getPageNumbers(currentPage: number, totalPages: number, maxPagesToShow = 5): (number | string)[] {
  if (totalPages <= 1) return [];

  const pages: (number | string)[] = [];
  const half = Math.floor(maxPagesToShow / 2);

  if (totalPages <= maxPagesToShow) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  let startPage = Math.max(1, currentPage - half);
  let endPage = Math.min(totalPages, currentPage + half);

  if (currentPage <= half) {
    endPage = maxPagesToShow;
  } else if (currentPage + half >= totalPages) {
    startPage = totalPages - maxPagesToShow + 1;
  }

  if (startPage > 1) {
    pages.push(1);
    if (startPage > 2) {
      pages.push('...');
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pages.push('...');
    }
    pages.push(totalPages);
  }

  return pages;
}

/**
 * Calculate the start and end index for the products displayed on the current page.
 * @param currentPage Current active page
 * @param itemsPerPage Number of items per page
 * @param productsLength Number of products on the current page
 * @param totalProducts Total number of products
 */
export function getProductDisplayRange(currentPage: number, itemsPerPage: number, productsLength: number, totalProducts: number): { startIndex: number, endIndex: number } {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + productsLength, totalProducts);
  return { startIndex, endIndex };
}
