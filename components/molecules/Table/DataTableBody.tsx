/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Edit2, Trash2, Search, Hash } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { useProductCodes } from '@/context/selectedProductId';
import { PATHS } from '@/utils/router.helper';

interface DataTableBodyProps<T> {
  columns: (keyof T)[];
  data: T[];
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
  searchTerm: string;
  showEdit?: boolean;
}

function formatHeader(key: string) {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace('image ar', 'Arabic Image')
    .replace('image en', 'English Image');
}

const DataTableBody = <T extends { id: string | number }>({
  columns,
  data,
  onEdit,
  onDelete,
  searchTerm,
  showEdit,
}: DataTableBodyProps<T>) => {
  const { setSelectedProductId } = useProductCodes();

  // Modify visible columns to add image columns if the image is an object
  const visibleColumns = columns.reduce<(keyof T | string)[]>((acc, col) => {
    if (col === 'updated_at') return acc;

    // Check if the column is image and the value is object
    if (
      col === 'image' &&
      data.some((item) => item[col] && typeof item[col] === 'object')
    ) {
      return [...acc, 'image_ar', 'image_en'];
    }

    return [...acc, col];
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-center">
        <thead className="bg-gray-50">
          <tr className="truncate whitespace-nowrap overflow-hidden">
            {visibleColumns.map((col) => (
              <th
                key={String(col)}
                className="px-6 py-3 text-sm font-medium text-gray-500"
              >
                {formatHeader(String(col))}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="px-6 py-3 text-sm font-medium text-gray-500">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.length > 0 ? (
            data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {visibleColumns.map((col) => {
                  const columnKey = String(col);

                  // Process new image columns
                  if (columnKey === 'image_ar' || columnKey === 'image_en') {
                    const lang = columnKey.split('_')[1] as 'ar' | 'en';
                    const imageUrl = (row as any).image?.[lang] || '';

                    return (
                      <td
                        key={columnKey}
                        className="px-6 py-4 max-w-xs truncate whitespace-nowrap overflow-hidden"
                      >
                        {imageUrl ? (
                          <div className="flex justify-center">
                            <Image
                              // src={imageUrl}
                              src={'/assets/play-station.webp'}
                              alt={`${lang} image`}
                              width={80}
                              height={80}
                              className="w-16 h-16 object-contain"
                              onError={(e) => {
                                (
                                  e.currentTarget as HTMLImageElement
                                ).style.display = 'none';
                              }}
                            />
                          </div>
                        ) : (
                          'غير متوفر'
                        )}
                      </td>
                    );
                  }

                  if (
                    columnKey === 'image' &&
                    typeof (row as any)[col] === 'string'
                  ) {
                    return (
                      <td
                        key={columnKey}
                        className="px-6 py-4 max-w-xs truncate whitespace-nowrap overflow-hidden"
                      >
                        <div className="flex justify-center">
                          <Image
                            // src={String(row[col])}
                            src={'/assets/play-station.webp'}
                            alt={columnKey}
                            width={80}
                            height={80}
                            className="w-16 h-16 object-contain"
                            onError={(e) => {
                              (
                                e.currentTarget as HTMLImageElement
                              ).style.display = 'none';
                            }}
                          />
                        </div>
                      </td>
                    );
                  }
                  return (
                    <td
                      key={columnKey}
                      className="px-6 py-4 max-w-xs truncate whitespace-nowrap overflow-hidden"
                    >
                      {col === 'shipping_payment' &&
                      (row as any)[col] === 'code' ? (
                        <Link
                          href={PATHS.CODES}
                          onClick={() => setSelectedProductId(Number(row.id))}
                          className="text-blue-600 underline"
                        >
                          {String((row as any)[col])}
                        </Link>
                      ) : col === 'icon' && (row as any)[col] ? (
                        <div className="flex justify-center">
                          <Image
                            // src={String((row as any)[col])}
                            src={'/assets/play-station.webp'}
                            alt={String(col)}
                            width={80}
                            height={80}
                            className="w-16 h-16 object-contain"
                            onError={(e) => {
                              (
                                e.currentTarget as HTMLImageElement
                              ).style.display = 'none';
                            }}
                          />
                        </div>
                      ) : [
                          'price',
                          'price_before',
                          'final_price',
                          'discount',
                        ].includes(String(col)) &&
                        (row as any)[col] &&
                        typeof (row as any)[col] === 'object' ? (
                        `${(row as any)[col].amount ?? ''} ${
                          (row as any)[col].currency ?? ''
                        }`
                      ) : (row as any)[col] != null ? (
                        col === 'created_at' ? (
                          formatDistanceToNow(new Date((row as any)[col]), {
                            addSuffix: true,
                            locale: ar,
                          })
                        ) : col === 'latest_message' ? (
                          String((row as any)[col]?.message ?? 'غير متوفر')
                        ) : col === 'user' ? (
                          String((row as any)[col]?.name ?? 'غير متوفر')
                        ) : (
                          String((row as any)[col])
                        )
                      ) : (
                        'غير متوفر'
                      )}
                    </td>
                  );
                })}
                {(onEdit || onDelete) && (
                  <td className="px-2 space-x-2 whitespace-nowrap">
                    {onEdit && showEdit !== false && (
                      <Button
                        onClick={() => onEdit(row.id)}
                        className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-gray-400 bg-transparent hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        onClick={() => onDelete(row.id)}
                        className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-gray-400 bg-transparent hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={visibleColumns.length + (onEdit || onDelete ? 1 : 0)}
                className="px-6 py-12 text-center text-gray-500"
              >
                {searchTerm ? (
                  <div>
                    <Search className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                    <p>No items found matching {searchTerm}</p>
                  </div>
                ) : (
                  <div>
                    <Hash className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                    <p>No items available</p>
                  </div>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTableBody;
