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
  apiEndpoint: string;
  deleteEndpoint: string;
  createTabValue: string;
  placeholder?: string;
  onEditIdChange?: (id: string | number | null) => void;
  onTabChange: (val: string) => void;
  showEdit?: boolean;
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
}: GenericAllProps<T>) => {
  const { showToast } = useToast();
  const { refreshFlag } = useUpdateContent();

  const { get, data, isLoading, error } = useAPI<T>(apiEndpoint);
  const { remove } = useAPI(deleteEndpoint);

  const handleEdit = (id: string | number) => {
    onEditIdChange?.(id);
    onTabChange(createTabValue);
  };

  const handleDelete = async (id: string | number) => {
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
  }, [get, refreshFlag]);

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
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
          showEdit={showEdit}
        />
      )}
    </SettingsTab>
  );
};

export default GenericAllTable;
