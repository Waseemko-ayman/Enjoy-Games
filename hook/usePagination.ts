/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo, useEffect } from 'react';

interface UsePaginationProps<T> {
  data: T[];
  itemsPerPage: number;
  initialPage?: number;
}

interface UsePaginationReturn<T> {
  currentPage: number;
  totalPages: number;
  paginatedData: T[];
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  totalItems: number;
  itemsPerPage: number;
}

/**
 * Custom Hook for Pagination Logic
 *
 * This hook manages all pagination state and logic:
 * - Tracks current page number
 * - Calculates total pages based on data length
 * - Returns paginated data for current page
 * - Provides navigation functions (next, previous, go to specific page)
 * - Handles edge cases (first/last page, empty data)
 *
 * @param data - Array of items to paginate
 * @param itemsPerPage - Number of items to show per page
 * @param initialPage - Starting page number (default: 1)
 * @returns Object with pagination state and controls
 */
export const usePagination = <T>({
  data,
  itemsPerPage,
  initialPage = 1,
}: UsePaginationProps<T>): UsePaginationReturn<T> => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Calculate total pages based on data length
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get data for current page using useMemo for performance optimization
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  // Navigation functions with boundary checks
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Helper booleans for UI state
  const canGoNext = currentPage < totalPages;
  const canGoPrevious = currentPage > 1;

  /**
    When changing the filter on the page:
    The data passed to usePagination will be changed (because filteredOrders change), but currentPage will not be reset to 1.
    This can cause a problem for the user:
    For example, if they were on page 3 of the all filter,
    then they chose the completed filter, which contains only two orders (one page).
    Then they would remain on page 3, and the paginatedData would be empty.
  **/
  useEffect(() => {
    setCurrentPage(initialPage);
  }, [data]);

  return {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    nextPage,
    previousPage,
    canGoNext,
    canGoPrevious,
    totalItems: data.length,
    itemsPerPage,
  };
};
