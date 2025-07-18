'use client';

import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Container from '../organism/Container';
import { PATHS } from '@/data/paths';

const PageHeader = ({
  showTitle = true,
  children,
}: {
  showTitle?: boolean;
  children?: React.ReactNode;
}) => {
  const pathname = usePathname();

  const pathParts = pathname.split('/').filter(Boolean);

  function extractPaths(obj: any, map: Record<string, string> = {}) {
    for (const key in obj) {
      const value = obj[key];
      if (value && typeof value === 'object') {
        if ('link' in value && 'name' in value) {
          const pathKey = value.link.split('/').filter(Boolean).pop() || '';
          map[pathKey] = value.name;
        } else {
          extractPaths(value, map);
        }
      }
    }
    return map;
  }

  const pathNameMap = extractPaths(PATHS);

  const breadcrumbs = [{ label: 'الرئيسية', href: '/' }];
  let accumulatedPath = '';

  for (let i = 0; i < pathParts.length; i++) {
    const part = pathParts[i];

    // Ignore 'bundles' from Breadcrumbs but add it in accumulatedPath
    if (part === 'bundles') {
      accumulatedPath += `/${part}`;
      continue;
    }

    if (part === 'categories' && pathParts[i + 1]) {
      const categoryType = pathParts[i + 1];
      accumulatedPath += `/categories/${categoryType}`;
      const label = pathNameMap[categoryType] || formatPart(categoryType);
      breadcrumbs.push({ label, href: accumulatedPath });
      i++; // Skip next
      continue;
    }

    accumulatedPath += `/${part}`;
    const isLast = i === pathParts.length - 1;

    const label = pathNameMap[part] || formatPart(part);

    breadcrumbs.push({
      label,
      href: isLast ? '' : accumulatedPath,
    });
  }

  const cleanParts = pathParts.filter((p) => p !== 'categories');
  const lastPart = cleanParts[cleanParts.length - 1] || '';
  const secondLastPart = cleanParts[cleanParts.length - 2] || '';

  let currentTitle = breadcrumbs[breadcrumbs.length - 1]?.label || 'الرئيسية';

  if (lastPart === 'bundles') {
    const itemIdFormatted = formatPart(secondLastPart);
    currentTitle = `بطاقات ${itemIdFormatted}`;
  }

  return (
    <div className="bg-enjoy-gray-light py-6 md:py-8 px-4 md:px-8 rounded-md">
      <Container>
        <div className="flex flex-col space-y-2">
          <Breadcrumb className="flex items-center">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center">
                <BreadcrumbItem>
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-gray-700">{crumb.label}</span>
                  ) : (
                    <BreadcrumbLink href={crumb.href}>
                      {crumb.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </div>
            ))}
          </Breadcrumb>

          {showTitle && (
            <div className="flex items-center justify-between mt-5 mb-7 gap-4 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-semibold">
                {currentTitle}
              </h1>
              {children}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

function formatPart(str: string) {
  return decodeURIComponent(str)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default PageHeader;
