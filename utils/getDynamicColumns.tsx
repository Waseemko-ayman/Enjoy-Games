import Image from 'next/image';
import React from 'react';

export type Column<T> = {
  key: keyof T | string;
  title: string;
  render?: (row: T) => React.ReactNode;
};

export const autoGenerateColumns = <T extends { id: string | number }>(
  data: T[],
  handleDelete?: (id: string | number) => void,
  handleEdit?: (id: string | number) => void
): Column<T>[] => {
  if (!data.length) return [];

  const keys = Object.keys(data[0]) as (keyof T)[];

  const baseColumns: Column<T>[] = keys.map((key) => ({
    key,
    title: String(key),
    render: (row: T) => {
      const value = row[key];
      if (
        typeof value === 'string' &&
        value.match(/\.(jpeg|jpg|png|gif|webp)$/i)
      ) {
        return (
          <Image
            src={value}
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 object-cover rounded"
          />
        );
      }
      if (Array.isArray(value)) {
        return <span>{value.length}</span>;
      }
      return <>{String(value)}</>;
    },
  }));

  if (handleDelete && handleEdit) {
    baseColumns.push({
      key: 'action',
      title: 'Action',
      render: (row: T) => (
        <div onClick={(e) => e.stopPropagation()} className="flex gap-2">
          <button
            className="px-2 py-1 bg-red-500 text-white rounded"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </button>
          <button
            className="px-2 py-1 bg-blue-500 text-white rounded"
            onClick={() => handleEdit(row.id)}
          >
            Edit
          </button>
        </div>
      ),
    });
  }

  return baseColumns;
};
