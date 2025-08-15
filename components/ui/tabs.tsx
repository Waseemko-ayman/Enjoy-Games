'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

function TabsList({
  className,
  variant = 'modern',
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & {
  variant?: 'modern' | 'classic';
}) {
  const baseStyles = 'inline-flex items-center justify-center w-full';
  const classicStyles = 'rounded-md bg-gray-100 p-1';
  const modernStyles =
    'cursor-pointer text-muted-foreground h-9 gap-3 sm:gap-10 p-4';

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        baseStyles,
        variant === 'classic' ? classicStyles : modernStyles,
        className
      )}
      {...props}
    />
  );
}
TabsList.displayName = TabsPrimitive.List.displayName;

function TabsTrigger({
  className,
  variant = 'modern',
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & {
  variant?: 'modern' | 'classic';
}) {
  const baseStyles =
    'inline-flex items-center justify-center whitespace-nowrap transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50';
  const classicStyles =
    'rounded-sm px-3 py-2 text-sm font-medium ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm cursor-pointer';
  const modernStyles =
    'hover:bg-enjoy-gray-light hover:text-enjoy-primary rounded-xl data-[state=active]:bg-[var(--enjoy-gray-light)] data-[state=active]:text-[var(--enjoy-primary)] dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-enjoy-gray-light text-foreground dark:text-muted-foreground h-[calc(100%-1px)] flex-1 gap-1.5 border border-gray-100 px-2 !py-5 sm:!py-6 text-sm sm:text-base font-bold transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4';

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        baseStyles,
        variant === 'classic' ? classicStyles : modernStyles,
        className
      )}
      {...props}
    />
  );
}
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

function TabsContent({
  className,
  variant = 'modern',
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content> & {
  variant?: 'modern' | 'classic';
}) {
  const baseStyles = '';
  const classicStyles =
    'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';
  const modernStyles = 'pt-2 px-4 md:px-10 flex-1 outline-none';

  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        baseStyles,
        variant === 'classic' ? classicStyles : modernStyles,
        className
      )}
      {...props}
    />
  );
}
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
