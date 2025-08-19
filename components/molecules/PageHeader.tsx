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
  const tLoading = useTranslations('Loading');

  const pathParts = pathname
    .split('/')
    .filter(Boolean)
    .filter((part, index) => !(index === 0 && ['en', 'ar'].includes(part)));

  const categoryIndex = pathParts.indexOf('categories');
  const categorySlug =
    categoryIndex !== -1 && pathParts[categoryIndex + 1]
      ? pathParts[categoryIndex + 1]
      : '';

  const { title: categoryLabel, loading: loadingCategory } =
    useCategoryTitle(categorySlug);

  const pathNameMap = extractPaths(PATHS);
  const breadcrumbs = [{ label: tPages('home'), href: '/' }];
  let accumulatedPath = '';

  for (let i = 0; i < pathParts.length; i++) {
    const part = pathParts[i];

    if (part === 'categories' && pathParts[i + 1]) {
      accumulatedPath += `/categories/${categorySlug}`;
      breadcrumbs.push({
        label: loadingCategory
          ? tLoading('loadingMessage')
          : categoryLabel || '',
        href: accumulatedPath,
      });
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

  let currentTitle =
    breadcrumbs[breadcrumbs.length - 1]?.label || tPages('home');

  if (categorySlug) {
    currentTitle = loadingCategory ? tLoading('loadingMessage') : categoryLabel;
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
                      <span className="text-gray-700 text-base">
                        {crumb.label}
                      </span>
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
  // لو part رقم (id للتذكرة)
  if (!isNaN(Number(part))) {
    const template = tPages('ticket-detail');
    return template.replace(':id', part);
  }

  const translated = tPages(part);
  if (translated === part) {
    return pathNameMap[part] || formatPart(part);
  }
  return translated;
}

interface PathLeaf {
  name: string;
  link: string;
}

type PathValue = PathLeaf | PathTree | string;
type PathTree = {
  [key: string]: PathValue;
};

function extractPaths(
  obj: PathTree,
  map: Record<string, string> = {}
): Record<string, string> {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (typeof value === 'string') {
        const pathKey = value.split('/').filter(Boolean).pop() || '';
        map[pathKey] = key;
      } else if (isPathLeaf(value)) {
        const pathKey = value.link.split('/').filter(Boolean).pop() || '';
        map[pathKey] = value.name;
      } else {
        extractPaths(value, map);
      }
    }
  }
  return map;
}

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

// const PageHeader = ({
//   showTitle = true,
//   children,
// }: {
//   showTitle?: boolean;
//   children?: React.ReactNode;
// }) => {
//   const pathname = usePathname();
//   const tPages = useTranslations('PagesHeaderTitles');

//   // 🟢 state جديد لتخزين العنوان من الـ API
//   const [currentTitle, setCurrentTitle] = useState<string>('');
//   const { getSingle, isLoading } = useAPI<any, any>('categories-subcategories');

//   const pathParts = pathname
//     .split('/')
//     .filter(Boolean)
//     .filter((part, index) => !(index === 0 && ['en', 'ar'].includes(part)));

//   const categoryIndex = pathParts.indexOf('categories');
//   const categorySlug =
//     categoryIndex !== -1 && pathParts[categoryIndex + 1]
//       ? pathParts[categoryIndex + 1]
//       : '';

//   // 🟢 جلب العنوان من الـ API بدل الاعتماد على useCategoryTitle
//   useEffect(() => {
//     if (categorySlug) {
//       getSingle(categorySlug).then((data) => {
//         if (data?.name) {
//           setCurrentTitle(data.name);
//         }
//       });
//     }
//   }, [categorySlug, getSingle]);

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
//       breadcrumbs.push({ label: currentTitle || '', href: accumulatedPath });
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

//   console.log(currentTitle);

//   // -------------------
//   // الكود القديم لجلب العنوان (تم استبداله بالكود فوق)
//   /*
//   const categoryLabel = useCategoryTitle(categorySlug);
//   let currentTitle =
//     breadcrumbs[breadcrumbs.length - 1]?.label || tPages('home');

//   if (lastPart === 'bundles') {
//     currentTitle = `بطاقات ${itemLabel}`;
//   }

//   if (pathParts.length === 0) {
//     currentTitle = tPages('home');
//   }
//   */

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
//                       <span className="text-gray-700 text-base">
//                         {crumb.label}
//                       </span>
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
//                   {isLoading ? '...' : currentTitle || tPages('home')}
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
