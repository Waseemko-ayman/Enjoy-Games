import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import Button from '../atomic/Button';
import { useTranslations } from 'next-intl';
import { PaginationProps } from '@/interfaces';
import { useToggleLocale } from '@/hook/useToggleLocale';
import useIsMobile from '@/hook/useIsMobile';

/**
 * Professional Pagination Component
 *
 * Features:
 * - Shows current page and total pages
 * - Displays page numbers with ellipsis for large page counts
 * - Previous/Next navigation buttons
 * - Shows total items and current range
 * - Responsive design that adapts to mobile screens
 * - Accessible with proper ARIA labels
 * - RTL-friendly design for Arabic support
 */
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  className = '',
}) => {
  // Translations
  const t = useTranslations('MyPurchases');
  const btnTxts = useTranslations('BtnTexts');
  const ariaLabels = useTranslations('ariaLabels.btns');

  // Languages
  const { isArabic } = useToggleLocale();

  // Responsive
  const isMobile = useIsMobile();

  // Calculate the range of items being displayed
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  /**
   * Generate array of page numbers to display
   * Logic: Show first page, last page, current page, and 2 pages around current
   * Use ellipsis (...) when there are gaps between page numbers
   */
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (isMobile) {
      // On mobile we only display a maximum of 3 pages: [currentPage - 1, currentPage, currentPage + 1]
      if (currentPage > 1) pages.push(currentPage - 1);
      pages.push(currentPage);
      if (currentPage < totalPages) pages.push(currentPage + 1);
    } else {
      // In the desktop we use the full system
      const maxVisiblePages = 7;

      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        if (currentPage > 3) pages.push('...');

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
          if (!pages.includes(i)) pages.push(i);
        }

        if (currentPage < totalPages - 2) pages.push('...');
        if (totalPages > 1) pages.push(totalPages);
      }
    }

    return pages;
  };

  // Don't render pagination if there's only one page or no items
  if (totalPages <= 1) return null;

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}
    >
      {/* Items count information */}
      <div className="text-sm text-gray-600 order-2 sm:order-1">
        {t('showingItems', {
          startItem: startItem,
          endItem: endItem,
          totalItems: totalItems,
        })}
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-2 order-1 sm:order-2">
        {/* Previous page button */}
        <Button
          variant="ghost"
          handleClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          otherClassName="flex items-center gap-1 px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={ariaLabels('PreviousPage')}
        >
          {isArabic ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}

          <span className="hidden sm:inline">{btnTxts('previous')}</span>
        </Button>

        {/* Page number buttons */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                // Ellipsis indicator
                <div className="px-3 py-2 text-gray-400">
                  <MoreHorizontal className="w-4 h-4" />
                </div>
              ) : (
                // Page number button
                <Button
                  variant={currentPage === page ? 'primary' : 'ghost'}
                  handleClick={() => onPageChange(page as number)}
                  otherClassName={`px-3 py-2 min-w-[40px] ${
                    currentPage === page
                      ? 'bg-enjoy-primary text-white hover:bg-enjoy-primary/90'
                      : 'hover:bg-enjoy-primary/10 hover:text-enjoy-primary hover:border-enjoy-primary/30'
                  }`}
                  aria-label={`${ariaLabels('page')} ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </Button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Next page button */}
        <Button
          // variant="outline"
          handleClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          otherClassName="flex items-center gap-1 px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={ariaLabels('NextPage')}
        >
          <span className="hidden sm:inline">{btnTxts('next')}</span>
          {isArabic ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
