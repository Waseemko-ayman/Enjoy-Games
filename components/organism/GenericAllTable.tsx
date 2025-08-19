/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
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
  onTabChange: (val: string) => void;
  showEdit?: boolean;
  showActionsColumn?: boolean;
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
}: GenericAllProps<T>) => {
  const { showToast } = useToast();

  const { refreshFlags } = useUpdateContent();
  const refreshKey = apiEndpoint || 'default';

  const { get, data, isLoading, error } = useAPI<T>(apiEndpoint || '');
  const { remove } = useAPI(deleteEndpoint || '');

  const tableData = Array.isArray(data?.items)
    ? data.items
    : Array.isArray(data)
    ? data
    : [];

  const handleEdit = (id: string | number) => {
    onEditIdChange?.(id);
    if (createTabValue) onTabChange(createTabValue);
  };

  const handleDelete = async (id: string | number) => {
    if (!deleteEndpoint) return;

    try {
      const res = await remove(id);
      showToast(res?.message || 'تم الحذف بنجاح');
      get();
    } catch (err) {
      const apiError = (err as any)?.response?.message;
      showToast(apiError);
    }
  };

  useEffect(() => {
    get();
  }, [get, refreshFlags[refreshKey]]);

  return (
    <SettingsTab
      value={value}
      title={title}
      description={description}
      cardContentClassName="!p-0"
    >
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorFetching />
      ) : (
        <DataTable
          placeholder={placeholder}
          data={tableData}
          onEdit={handleEdit}
          onDelete={deleteEndpoint ? handleDelete : undefined}
          showEdit={showEdit}
          showActionsColumn={showActionsColumn}
        />
      )}
    </SettingsTab>
  );
};

export default GenericAllTable;
