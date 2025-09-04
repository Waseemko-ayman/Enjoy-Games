/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo, useCallback, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import DataTableHeader from './Table/DataTableHeader';
import DataTableBody from './Table/DataTableBody';
import DataTablePagination from './Table/DataTablePagination';
import Loading from './loading';
import ErrorFetching from './ErrorFetching';

interface DataTableProps<T extends { id: number | string }> {
  title?: string;
  placeholder?: string;
  data: T[];
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
  showEdit?: boolean;
  showActionsColumn?: boolean;
  filter?: string;
  setFilter?: (value: string) => void;
  onRowPatched?: (id: string | number, patch: Partial<T>) => void;
  filterOptions?: { id: string; label: string }[];
  isLoading: boolean;
  error: string;
}

function getItemsPerPageOptions(totalItems: number) {
  const fixedOptions = [6, 10, 20];
  const options = fixedOptions.filter((opt) => opt < totalItems);

  let lastOption = totalItems - 2;
  if (lastOption > 30) lastOption = 30;

  if (!options.includes(lastOption)) {
    options.push(lastOption);
  }

  return options.sort((a, b) => a - b);
}

export function DataTable<T extends { id: number | string }>({
  data,
  onEdit,
  onDelete,
  placeholder = 'بحث...',
  showEdit,
  showActionsColumn,
  filter,
  setFilter,
  onRowPatched,
  filterOptions,
  isLoading,
  error,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 700);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const itemsPerPageOptions = useMemo(
    () => getItemsPerPageOptions(data.length),
    [data.length]
  );

  // Columns
  const columns = useMemo(() => {
    if (data.length === 0) return [];
    return Object.keys(data[0]) as (keyof T)[];
  }, [data]);

  // Data sorting
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (typeof a.id === 'number' && typeof b.id === 'number') {
        return a.id - b.id;
      }
      return String(a.id).localeCompare(String(b.id));
    });
  }, [data]);

  // Filter with deferred search
  const filteredData = useMemo(() => {
    if (!debouncedSearchTerm) return sortedData;
    return sortedData.filter((row) =>
      columns.some((col) => {
        const val = row[col];
        return (
          val != null &&
          String(val).toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
      })
    );
  }, [debouncedSearchTerm, sortedData, columns]);

  // Browsing
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const newTotalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages > 0 ? newTotalPages : 1);
    }
  }, [filteredData.length, itemsPerPage]);

  return (
    <div>
      <DataTableHeader
        totalItems={data.length}
        filteredItems={filteredData.length}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        placeholder={placeholder}
        filter={filter}
        handleFilterChange={setFilter}
        filterOptions={filterOptions}
      />
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorFetching />
      ) : (
        <>
          <DataTableBody
            columns={columns}
            data={currentData}
            onEdit={onEdit}
            onDelete={onDelete}
            searchTerm={debouncedSearchTerm}
            showEdit={showEdit}
            showActionsColumn={showActionsColumn}
            onRowPatched={onRowPatched}
          />
          {totalPages > 1 && (
            <DataTablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              itemsPerPageOptions={itemsPerPageOptions}
              onPageChange={goToPage}
              onItemsPerPageChange={handleItemsPerPageChange}
              filteredCount={filteredData.length}
              startIndex={startIndex}
              endIndex={endIndex}
            />
          )}
        </>
      )}
    </div>
  );
}
