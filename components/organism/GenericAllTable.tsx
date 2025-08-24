/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useToast } from '@/lib/toast';
import { useUpdateContent } from '@/context/updateContentContext';
import useAPI from '@/hook/useAPI';
import SettingsTab from '@/components/ui/display/SettingsTab';
import Loading from '@/components/molecules/loading';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import { DataTable } from '../molecules/DataTable';

interface GenericAllProps<T> {
  value: string;
  title: string;
  description: string;
  apiEndpoint?: string;
  deleteEndpoint?: string;
  createTabValue?: string;
  placeholder?: string;
  onEditIdChange?: (id: string | number | null) => void;
  onTabChange?: (val: string) => void;
  showEdit?: boolean;
  showActionsColumn?: boolean;
  refreshKeyProp?: string;
  customFilter?: (rows: any[], currentFilter: string) => any[];
  filterOptions?: { id: string; label: string }[];
  onFilterChange?: (filter: string) => void;
}

const GenericAllTable = <T,>({
  value,
  title,
  description,
  apiEndpoint,
  deleteEndpoint,
  createTabValue,
  placeholder,
  onEditIdChange,
  onTabChange,
  showEdit,
  showActionsColumn,
  refreshKeyProp,
  customFilter,
  filterOptions,
  onFilterChange,
}: GenericAllProps<T>) => {
  // --- Filter State ---
  const [filter, setFilter] = useState('all');
  const [rows, setRows] = useState<any[]>([]);

  const { showToast } = useToast();

  const { refreshFlags } = useUpdateContent();
  const refreshKey = refreshKeyProp || apiEndpoint || 'default';

  const { get, data, isLoading, error } = useAPI<T>(apiEndpoint || '');
  const { remove } = useAPI(deleteEndpoint || '');

  // const tableData = Array.isArray(data?.items)
  //   ? data.items
  //   : Array.isArray(data)
  //   ? data
  //   : [];

  // const filteredTableData = useMemo(() => {
  //   if (filter === 'all') return tableData;
  //   return tableData.filter(
  //     (item: any) => item.status?.toLowerCase() === filter.toLowerCase()
  //   );
  // }, [filter, tableData]);

  const handleEdit = (id: string | number) => {
    onEditIdChange?.(id);
    if (createTabValue && onTabChange) {
      onTabChange(createTabValue);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!deleteEndpoint) return;

    try {
      const res = await remove(id);
      showToast(res?.message || 'تم الحذف بنجاح');

      // Instead of get(), we delete the row directly from rows
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      const apiError = (err as any)?.response?.message;
      showToast(apiError, 'error');
    }
  };

  useEffect(() => {
    const list = Array.isArray(data?.items)
      ? data.items
      : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data)
      ? data
      : [];
    setRows(list);
  }, [data]);

  const patchRow = (id: string | number, patch: Partial<any>) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  // const filteredRows = useMemo(() => {
  //   if (customFilter) {
  //     return customFilter(rows, filter); // 👈 Apply custom filtering if present
  //   }

  //   //Default filtering
  //   if (filter === 'all') return rows;
  //   return rows.filter(
  //     (item: any) => item.status?.toLowerCase() === filter.toLowerCase()
  //   );
  // }, [rows, filter, customFilter]);

  const filteredRows = useMemo(() => {
    if (customFilter) return customFilter(rows, filter);
    if (filter === 'all') return rows;
    return rows; // بدون فلترة إذا لم يتم تمرير customFilter
  }, [rows, filter, customFilter]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    // استدعاء الدالة الممررة من المكون الأب إذا كانت موجودة
    if (onFilterChange) {
      onFilterChange(newFilter);
    }
  };

  useEffect(() => {
    get();
  }, [get, apiEndpoint, refreshFlags[refreshKey]]);

  return (
    <SettingsTab
      value={value}
      title={title}
      description={description}
      cardContentClassName="!p-0"
    >
      <DataTable
        placeholder={placeholder}
        data={filteredRows}
        onRowPatched={patchRow}
        onEdit={handleEdit}
        onDelete={deleteEndpoint ? handleDelete : undefined}
        showEdit={showEdit}
        showActionsColumn={showActionsColumn}
        filter={filter}
        setFilter={handleFilterChange}
        filterOptions={filterOptions}
        isLoading={isLoading}
        error={error}
      />
    </SettingsTab>
  );
};

export default GenericAllTable;
