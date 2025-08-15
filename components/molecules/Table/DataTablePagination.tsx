import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DataTablePaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  itemsPerPageOptions: number[];
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (value: number) => void;
  filteredCount: number;
  startIndex: number;
  endIndex: number;
}

const DataTablePagination: React.FC<DataTablePaginationProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  itemsPerPageOptions,
  onPageChange,
  onItemsPerPageChange,
  filteredCount,
  startIndex,
  endIndex,
}) => {
  const renderPageNumbers = () => {
    return Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
      let pageNumber;
      if (totalPages <= 5) {
        pageNumber = i + 1;
      } else if (currentPage <= 3) {
        pageNumber = i + 1;
      } else if (currentPage >= totalPages - 2) {
        pageNumber = totalPages - 4 + i;
      } else {
        pageNumber = currentPage - 2 + i;
      }

      return (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`inline-flex items-center justify-center h-8 w-8 rounded-lg border text-sm font-medium transition-colors cursor-pointer ${
            currentPage === pageNumber
              ? 'border-blue-500 bg-blue-500 text-white'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {pageNumber}
        </button>
      );
    });
  };

  return (
    <div className="px-4 py-4 bg-gray-50 border-t border-gray-200 rounded-bl-md rounded-b-md flex flex-col justify-center text-center sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-0">
      <div className="flex items-center space-x-2 text-sm text-gray-500 justify-center sm:justify-start">
        <span>يعرض</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {itemsPerPageOptions?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span>لكل صفحة</span>
      </div>

      <div className="flex items-center justify-center space-x-1 overflow-x-auto">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer flex-shrink-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {renderPageNumbers()}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="text-sm text-gray-500">
        {filteredCount > 0
          ? `Showing ${startIndex + 1} to ${Math.min(
              endIndex,
              filteredCount
            )} of ${filteredCount} results`
          : 'No results found'}
      </div>
    </div>
  );
};

export default DataTablePagination;
