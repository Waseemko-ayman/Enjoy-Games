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

const PageHeader = ({ showTitle = true }: { showTitle?: boolean }) => {
  const pathname = usePathname();

  // Split the pathname and remove empty parts
  const pathParts = pathname.split('/').filter(Boolean);

  // Extract only the page name (last part of the path)
  const pageName = pathParts[pathParts.length - 1] || '';

  // Create a map of path names using values from PATHS
  const pathNameMap = Object.entries(PATHS).reduce<Record<string, string>>(
    (acc, [, value]) => {
      if (typeof value === 'object' && value.link && value.name) {
        // Extract the page key (last part of the link)
        const pathKey = value.link.split('/').pop() || '';
        acc[pathKey] = value.name;
      }
      return acc;
    },
    {}
  );

  // Get the page title from the map
  const title = pathNameMap[pageName] || 'الرئيسية';

  // Create breadcrumbs with only two items (Home + current page)
  const breadcrumbs = [
    { label: 'الرئيسية', href: '/' },
    {
      label: title,
      href: pathname, // No link since it's the final item
    },
  ];

  return (
    <div className="bg-enjoy-gray-light py-6 md:py-8 px-4 md:px-8 rounded-md">
      <Container>
        <div className="flex flex-col space-y-2">
          <Breadcrumb className="flex items-center">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center">
                <BreadcrumbItem>
                  <BreadcrumbLink href={crumb.href}>
                    {crumb.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </div>
            ))}
          </Breadcrumb>
          {showTitle && (
            <h1 className="text-2xl md:text-3xl font-semibold mt-5 mb-7">
              {title}
            </h1>
          )}
        </div>
      </Container>
    </div>
  );
};

export default PageHeader;
