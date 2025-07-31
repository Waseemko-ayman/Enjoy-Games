/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Container from '../organism/Container';
import { PATHS } from '@/data/paths';
import AnimatedWrapper from './FramerMotion/AnimatedWrapper';
import { useTranslations } from 'next-intl';
import { useCategoryTitle } from '@/hook/useCategoryTitle';

const PageHeader = ({
  showTitle = true,
  children,
}: {
  showTitle?: boolean;
  children?: React.ReactNode;
}) => {
  const pathname = usePathname();
  const tPages = useTranslations('PagesHeaderTitles');

  const pathParts = pathname
    .split('/')
    .filter(Boolean)
    .filter((part, index) => !(index === 0 && ['en', 'ar'].includes(part)));

  const categoryIndex = pathParts.indexOf('categories');
  const categorySlug =
    categoryIndex !== -1 && pathParts[categoryIndex + 1]
      ? pathParts[categoryIndex + 1]
      : '';

  const categoryLabel = useCategoryTitle(categorySlug); // ✅ always called
  const pathNameMap = extractPaths(PATHS);
  const breadcrumbs = [{ label: tPages('home'), href: '/' }];
  let accumulatedPath = '';

  for (let i = 0; i < pathParts.length; i++) {
    const part = pathParts[i];

    if (part === 'bundles') {
      accumulatedPath += `/${part}`;
      continue;
    }

    if (part === 'categories' && pathParts[i + 1]) {
      accumulatedPath += `/categories/${categorySlug}`;
      breadcrumbs.push({ label: categoryLabel || '', href: accumulatedPath });
      i++;
      continue;
    }

    accumulatedPath += `/${part}`;
    const isLast = i === pathParts.length - 1;
    const label = getLabel(part, pathNameMap, tPages);

    breadcrumbs.push({
      label,
      href: isLast ? '' : accumulatedPath,
    });
  }

  const cleanParts = pathParts.filter((p) => p !== 'categories');
  const lastPart = cleanParts[cleanParts.length - 1] || '';
  const secondLastPart = cleanParts[cleanParts.length - 2] || '';
  const itemLabel = useCategoryTitle(secondLastPart);

  let currentTitle =
    breadcrumbs[breadcrumbs.length - 1]?.label || tPages('home');

  if (lastPart === 'bundles') {
    currentTitle = `بطاقات ${itemLabel}`;
  }

  if (pathParts.length === 0) {
    currentTitle = tPages('home');
  }

  return (
    <div className="bg-enjoy-gray-light py-6 md:py-8 px-4 md:px-8 rounded-md">
      <Container>
        <div className="flex flex-col space-y-2">
          <Breadcrumb>
            <BreadcrumbList className="flex items-center flex-wrap">
              {breadcrumbs.map((crumb, index) => (
                <AnimatedWrapper
                  key={index}
                  custom={index}
                  direction="x"
                  distance={40}
                >
                  <BreadcrumbItem>
                    {index === breadcrumbs.length - 1 ? (
                      <span className="text-gray-700">{crumb.label}</span>
                    ) : (
                      <BreadcrumbLink href={crumb.href}>
                        {crumb.label}
                      </BreadcrumbLink>
                    )}
                    {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                  </BreadcrumbItem>
                </AnimatedWrapper>
              ))}
            </BreadcrumbList>
          </Breadcrumb>

          {showTitle && (
            <div className="flex items-center justify-between mt-5 mb-7 gap-4 flex-wrap">
              <AnimatedWrapper direction="x" distance={40}>
                <h1 className="text-2xl md:text-3xl font-semibold">
                  {currentTitle}
                </h1>
              </AnimatedWrapper>
              <AnimatedWrapper direction="x" distance={-40}>
                {children}
              </AnimatedWrapper>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

function getLabel(
  part: string,
  pathNameMap: Record<string, string>,
  tPages: (key: string) => string
): string {
  const translated = tPages(part);
  if (translated === part) {
    return pathNameMap[part] || formatPart(part);
  }
  return translated;
}

// 1. تحديث تعريف الأنواع لاستيعاب القيم النصية
interface PathLeaf {
  name: string;
  link: string;
}

type PathValue = PathLeaf | PathTree | string;
type PathTree = {
  [key: string]: PathValue;
};

// 2. تعديل دالة extractPaths
function extractPaths(
  obj: PathTree,
  map: Record<string, string> = {}
): Record<string, string> {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (typeof value === 'string') {
        // معالجة القيم النصية مباشرة
        const pathKey = value.split('/').filter(Boolean).pop() || '';
        map[pathKey] = key; // أو أي قيمة أخرى مناسبة
      } else if (isPathLeaf(value)) {
        // معالجة كائنات PathLeaf
        const pathKey = value.link.split('/').filter(Boolean).pop() || '';
        map[pathKey] = value.name;
      } else {
        // معالجة الكائنات المتداخلة (PathTree)
        extractPaths(value, map);
      }
    }
  }
  return map;
}

// 3. تعديل Type Guard
function isPathLeaf(obj: any): obj is PathLeaf {
  return (
    typeof obj === 'object' && obj !== null && 'link' in obj && 'name' in obj
  );
}

function formatPart(str: string) {
  return decodeURIComponent(str)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default PageHeader;

// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client';

// import { usePathname } from 'next/navigation';
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbSeparator,
// } from '@/components/ui/breadcrumb';
// import Container from '../organism/Container';
// import { PATHS } from '@/data/paths';
// import AnimatedWrapper from './FramerMotion/AnimatedWrapper';
// import { useTranslations } from 'next-intl';
// import { useCategoryTitle } from '@/hook/useCategoryTitle';
// import { useTranslatedPathParts } from '@/utils/translatePath';

// const PageHeader = ({
//   showTitle = true,
//   children,
// }: {
//   showTitle?: boolean;
//   children?: React.ReactNode;
// }) => {
//   const pathname = usePathname();
//   const tPages = useTranslations('PagesHeaderTitles');
//   const translatedParts = useTranslatedPathParts(pathname);

//   const pathParts = pathname
//     .split('/')
//     .filter(Boolean)
//     .filter((part, index) => !(index === 0 && ['en', 'ar'].includes(part)));

//   const categoryIndex = pathParts.indexOf('categories');
//   const categorySlug =
//     categoryIndex !== -1 && pathParts[categoryIndex + 1]
//       ? pathParts[categoryIndex + 1]
//       : '';

//   const categoryLabel = useCategoryTitle(categorySlug);

//   // مسارات الترجمة من PATHS
//   const pathNameMap = extractPaths(PATHS);

//   const breadcrumbs = [{ label: tPages('home'), href: '/' }];
//   let accumulatedPath = '';

//   for (let i = 0; i < pathParts.length; i++) {
//     const part = pathParts[i];

//     if (part === 'bundles') {
//       accumulatedPath += `/${part}`;
//       continue;
//     }

//     if (part === 'categories' && pathParts[i + 1]) {
//       accumulatedPath += `/categories/${categorySlug}`;
//       breadcrumbs.push({ label: categoryLabel || '', href: accumulatedPath });
//       i++;
//       continue;
//     }

//     accumulatedPath += `/${part}`;
//     const isLast = i === pathParts.length - 1;
//     const label = getLabel(part, pathNameMap, tPages);

//     breadcrumbs.push({
//       label,
//       href: isLast ? '' : accumulatedPath,
//     });
//   }

//   const cleanParts = pathParts.filter((p) => p !== 'categories');
//   const lastPart = cleanParts[cleanParts.length - 1] || '';
//   const secondLastPart = cleanParts[cleanParts.length - 2] || '';
//   const itemLabel = useCategoryTitle(secondLastPart);

//   let currentTitle =
//     breadcrumbs[breadcrumbs.length - 1]?.label || tPages('home');

//   if (lastPart === 'bundles') {
//     currentTitle = `بطاقات ${itemLabel}`;
//   }

//   if (pathParts.length === 0) {
//     currentTitle = tPages('home');
//   }

//   return (
//     <div className="bg-enjoy-gray-light py-6 md:py-8 px-4 md:px-8 rounded-md">
//       <Container>
//         <div className="flex flex-col space-y-2">
//           <Breadcrumb>
//             <BreadcrumbList className="flex items-center flex-wrap">
//               {breadcrumbs.map((crumb, index) => (
//                 <AnimatedWrapper
//                   key={index}
//                   custom={index}
//                   direction="x"
//                   distance={40}
//                 >
//                   <BreadcrumbItem>
//                     {index === breadcrumbs.length - 1 ? (
//                       <span className="text-gray-700">{crumb.label}</span>
//                     ) : (
//                       <BreadcrumbLink href={crumb.href}>
//                         {crumb.label}
//                       </BreadcrumbLink>
//                     )}
//                     {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
//                   </BreadcrumbItem>
//                 </AnimatedWrapper>
//               ))}
//             </BreadcrumbList>
//           </Breadcrumb>

//           {showTitle && (
//             <div className="flex items-center justify-between mt-5 mb-7 gap-4 flex-wrap">
//               <AnimatedWrapper direction="x" distance={40}>
//                 <h1 className="text-2xl md:text-3xl font-semibold">
//                   {currentTitle}
//                 </h1>
//               </AnimatedWrapper>
//               <AnimatedWrapper direction="x" distance={-40}>
//                 {children}
//               </AnimatedWrapper>
//             </div>
//           )}
//         </div>
//       </Container>
//     </div>
//   );
// };

// function getLabel(
//   part: string,
//   pathNameMap: Record<string, string>,
//   tPages: (key: string) => string
// ): string {
//   const translated = tPages(part);
//   if (translated === part) {
//     return pathNameMap[part] || formatPart(part);
//   }
//   return translated;
// }

// interface PathLeaf {
//   name: string;
//   link: string;
// }

// type PathValue = PathLeaf | PathTree | string;
// type PathTree = {
//   [key: string]: PathValue;
// };

// function extractPaths(
//   obj: PathTree,
//   map: Record<string, string> = {}
// ): Record<string, string> {
//   for (const key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       const value = obj[key];

//       if (typeof value === 'string') {
//         const pathKey = value.split('/').filter(Boolean).pop() || '';
//         map[pathKey] = key;
//       } else if (isPathLeaf(value)) {
//         const pathKey = value.link.split('/').filter(Boolean).pop() || '';
//         map[pathKey] = value.name;
//       } else {
//         extractPaths(value, map);
//       }
//     }
//   }
//   return map;
// }

// function isPathLeaf(obj: any): obj is PathLeaf {
//   return (
//     typeof obj === 'object' && obj !== null && 'link' in obj && 'name' in obj
//   );
// }

// function formatPart(str: string) {
//   return decodeURIComponent(str)
//     .replace(/-/g, ' ')
//     .replace(/\b\w/g, (c) => c.toUpperCase());
// }

// export default PageHeader;
