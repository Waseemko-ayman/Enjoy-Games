/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Edit2, Trash2, Search, Hash } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { useProductCodes } from '@/context/selectedProductId';
import { PATHS } from '@/utils/router.helper';
import { useTranslations } from 'next-intl';
import DialogUpload from './DialogUpload';
import { usePathname } from 'next/navigation';
import {
  getStatusColor,
  getStatusIcon,
  getTicketStatusColor,
  getTicketStatusIcon,
} from '@/utils/statusHelpers';
import { FaClipboardList, FaUsers } from 'react-icons/fa6';
import UserPermissionsDrawer from '../UserPermissionsDrawer';
import UpdateTicketStatusDrawer from '../UpdateTicketStatusDrawer';
import { API_IMAGE_URL } from '@/config/api';
import Loading from '../loading';
import ResponsiveDialogDrawer from '@/components/organism/ResponsiveDialogDrawer';
import { DeleteWarningContent } from '../DeleteWarningContent';
import useIsMobile from '@/hook/useIsMobile';
const DynamicImage = dynamic(() => import('next/image'), {
  loading: () => <Loading />,
  ssr: false,
});

interface DataTableBodyProps<T> {
  columns: (keyof T)[];
  // data: T[];
  data: any[];
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
  searchTerm: string;
  showEdit?: boolean;
  showActionsColumn?: boolean;
  onRowPatched?: (id: string | number, patch: Partial<T>) => void;
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
  showActionsColumn = true,
  onRowPatched,
}: DataTableBodyProps<T>) => {
  // Users
  const [openUserId, setOpenUserId] = useState<string | null>(null);

  // Tickets
  const [openTicketId, setOpenTicketId] = useState<string | null>(null);

  // Delete DialogDrawer
  const [openDeleteId, setOpenDeleteId] = useState<string | null>(null);

  const isMobile = useIsMobile();

  const { setSelectedProductId } = useProductCodes();

  const t = useTranslations('Messages');
  const btnTexts = useTranslations('BtnTexts');
  const msgTxts = useTranslations('Messages');

  const pathname = usePathname();
  const isOrdersPage = pathname?.includes('/dashboard/orders');
  const isUsersPage = pathname?.includes('/dashboard/users');
  const isTicketsPage = pathname?.includes('/dashboard/tickets');

  const filteredColumns = columns.filter((col) => {
    if (col === 'shipping_method') {
      return !data.some((row) =>
        ['account_id', 'multi_id', 'access'].includes((row as any)[col])
      );
    }
    return true;
  });

  const visibleColumns = filteredColumns.reduce<(keyof T | string)[]>(
    (acc, col) => {
      if (col === 'updated_at' || col === 'user_id') return acc;

      if (
        col === 'image' &&
        data.some((item) => item[col] && typeof item[col] === 'object')
      ) {
        return [...acc, 'image_ar', 'image_en'];
      }

      return [...acc, col];
    },
    []
  );

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
            {showActionsColumn &&
              (onEdit ||
                onDelete ||
                data.some((row) =>
                  ['account_id', 'multi_id', 'access'].includes(
                    (row as any).shipping_method
                  )
                )) && (
                <th className="px-6 py-3 text-sm font-medium text-gray-500">
                  Actions
                </th>
              )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.length > 0 ? (
            data.map((row) => {
              const rowLink = isOrdersPage
                ? PATHS.ORDERS.ITEM.replace(':id', String(row.id))
                : undefined;

              return (
                <tr
                  key={row.id}
                  className={`hover:bg-gray-50 ${
                    isOrdersPage ? 'cursor-pointer' : ''
                  }`}
                  onClick={() => rowLink && (window.location.href = rowLink)}
                >
                  {visibleColumns.map((col) => {
                    const columnKey = String(col);

                    if (columnKey === 'user_id') return null;

                    if (columnKey === 'status') {
                      return (
                        <td
                          key={columnKey}
                          className="px-6 py-4 max-w-xs truncate whitespace-nowrap overflow-hidden "
                        >
                          <div
                            className={`flex items-center justify-center gap-1 p-2 rounded-xl ${
                              isOrdersPage
                                ? getStatusColor(String(row[col]))
                                : isTicketsPage &&
                                  getTicketStatusColor(String(row[col]))
                            }`}
                          >
                            {isOrdersPage
                              ? getStatusIcon(String(row[col]))
                              : isTicketsPage &&
                                getTicketStatusIcon(String(row[col]))}
                            <span>{String(row[col])}</span>
                          </div>
                        </td>
                      );
                    }

                    // if (
                    //   columnKey === 'items' &&
                    //   Array.isArray((row as any)[col])
                    // ) {
                    //   return (
                    //     <td
                    //       key={columnKey}
                    //       className="px-6 py-4 max-w-xs truncate whitespace-nowrap overflow-hidden"
                    //     >
                    //       <Link
                    //         href={PATHS.ORDERS.ITEM.replace(
                    //           ':id',
                    //           String(row.id)
                    //         )}
                    //         className="text-blue-600"
                    //       >
                    //         {(row as any)[col].length} Items
                    //       </Link>
                    //     </td>
                    //   );
                    // }

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
                              <DynamicImage
                                src={
                                  `${API_IMAGE_URL}${imageUrl}` ||
                                  '/assets/play-station.webp'
                                }
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
                            t('unavailable')
                          )}
                        </td>
                      );
                    }

                    if (
                      columnKey === 'images' &&
                      Array.isArray((row as any)[col])
                    ) {
                      const images = (row as any)[col] as {
                        id: number;
                        image: string;
                      }[];
                      return (
                        <td
                          key={columnKey}
                          className="px-6 py-4 max-w-xs whitespace-nowrap overflow-hidden"
                        >
                          {images.length > 0 ? (
                            images.length > 1 ? (
                              <div className="grid grid-cols-2 gap-1 justify-center">
                                {images.map((img, idx) => (
                                  <DynamicImage
                                    key={idx}
                                    src={
                                      `${API_IMAGE_URL}${img.image}` ||
                                      '/assets/play-station.webp'
                                    }
                                    alt={`image-${idx}`}
                                    width={80}
                                    height={80}
                                    className="rounded-md border border-gray-200"
                                    onError={(e) => {
                                      (
                                        e.currentTarget as HTMLImageElement
                                      ).style.display = 'none';
                                    }}
                                  />
                                ))}
                              </div>
                            ) : (
                              <DynamicImage
                                src={
                                  `${API_IMAGE_URL}${images[0].image}` ||
                                  '/assets/play-station.webp'
                                }
                                alt={`image`}
                                width={100}
                                height={100}
                                className="mx-auto rounded-md border border-gray-200"
                                onError={(e) => {
                                  (
                                    e.currentTarget as HTMLImageElement
                                  ).style.display = 'none';
                                }}
                              />
                            )
                          ) : (
                            t('unavailable')
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
                            <DynamicImage
                              src={
                                `${API_IMAGE_URL}${(row as any)[col]}` ||
                                '/assets/play-station.webp'
                              }
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

                    // === التعديل هنا ===
                    const cellValue = (row as any)[col];
                    const isLink =
                      ['shipping_payment', 'shipping_method'].includes(
                        String(col)
                      ) && cellValue === 'code';

                    return (
                      <td
                        key={columnKey}
                        className="px-6 py-4 max-w-xs truncate whitespace-nowrap overflow-hidden"
                      >
                        {isLink ? (
                          <Link
                            href={PATHS.CODES}
                            onClick={() => setSelectedProductId(Number(row.id))}
                            className="text-blue-600 underline"
                          >
                            {String(cellValue)}
                          </Link>
                        ) : col === 'shipping_data' ? (
                          (() => {
                            try {
                              const obj = JSON.parse(cellValue);
                              return obj.email ?? JSON.stringify(obj);
                            } catch {
                              return String(cellValue);
                            }
                          })()
                        ) : col === 'icon' && cellValue ? (
                          <div className="flex justify-center">
                            <DynamicImage
                              src={
                                `${API_IMAGE_URL}${cellValue}` ||
                                '/assets/play-station.webp'
                              }
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
                          cellValue &&
                          typeof cellValue === 'object' ? (
                          `${cellValue.amount ?? ''} ${
                            cellValue.currency ?? ''
                          }`
                        ) : cellValue != null ? (
                          col === 'created_at' ? (
                            formatDistanceToNow(new Date(cellValue), {
                              addSuffix: true,
                              locale: ar,
                            })
                          ) : col === 'latest_message' ? (
                            String(cellValue?.message ?? t('unavailable'))
                          ) : col === 'user' ? (
                            String(cellValue?.name ?? t('unavailable'))
                          ) : (
                            String(cellValue)
                          )
                        ) : (
                          t('unavailable')
                        )}
                      </td>
                    );
                  })}
                  {showActionsColumn &&
                    (onEdit ||
                      onDelete ||
                      ['account_id', 'multi_id', 'access'].includes(
                        (row as any).shipping_method
                      )) && (
                      <td className="px-2 space-x-2 whitespace-nowrap">
                        {['account_id', 'multi_id', 'access'].includes(
                          (row as any).shipping_method
                        ) && <DialogUpload rowId={row.id} />}
                        {onEdit && showEdit !== false ? (
                          <Button
                            onClick={() => onEdit(row.id)}
                            className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-gray-400 bg-transparent hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        ) : isUsersPage ? (
                          <UserPermissionsDrawer
                            userId={row.id}
                            open={openUserId === String(row.id)}
                            setOpen={(val: boolean) =>
                              setOpenUserId(val ? String(row.id) : null)
                            }
                            trigger={
                              <Button
                                onClick={() => setOpenUserId(String(row.id))}
                                className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-gray-400 bg-transparent hover:text-blue-600 hover:bg-blue-50 transition-colors"
                              >
                                <FaUsers className="h-4 w-4" />
                              </Button>
                            }
                          />
                        ) : (
                          isTicketsPage && (
                            <UpdateTicketStatusDrawer
                              ticketId={row.id}
                              open={openTicketId === String(row.id)}
                              setOpen={(val: boolean) =>
                                setOpenTicketId(val ? String(row.id) : null)
                              }
                              trigger={
                                <Button
                                  onClick={() =>
                                    setOpenTicketId(String(row.id))
                                  }
                                  className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-gray-400 bg-transparent hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                >
                                  <FaClipboardList className="h-4 w-4" />
                                </Button>
                              }
                              onSuccess={(newStatusName) => {
                                onRowPatched?.(row.id, {
                                  status: newStatusName,
                                } as unknown as Partial<T>);
                              }}
                            />
                          )
                        )}
                        {onDelete && (
                          <ResponsiveDialogDrawer
                            trigger={
                              <Button
                                onClick={() => setOpenDeleteId(String(row.id))}
                                className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-gray-400 bg-transparent hover:text-red-600 hover:bg-red-50 transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            }
                            open={openDeleteId === String(row.id)}
                            setOpen={(val) =>
                              setOpenDeleteId(val ? String(row.id) : null)
                            }
                            isMobile={isMobile}
                          >
                            <DeleteWarningContent
                              msgTxts={msgTxts}
                              btnTexts={btnTexts}
                              onCancel={() => setOpenDeleteId(null)}
                              onDelete={() => {
                                onDelete(row.id);
                                setOpenDeleteId(null);
                              }}
                            />
                          </ResponsiveDialogDrawer>
                        )}
                      </td>
                    )}
                </tr>
              );
            })
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
