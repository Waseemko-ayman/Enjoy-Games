/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Layer from '@/components/atomic/Layer';
import PageTitle from '@/components/ui/common/PageTitle';
import TabsNavigation from '@/components/ui/display/TabsNavigation';
import { Tabs } from '@/components/ui/tabs';
import { useToggleLocale } from '@/hook/useToggleLocale';
import React, { useState } from 'react';

interface GenericPageProps {
  title: string;
  description: string;
  tabs: { value: string; label: string }[];
  allComponent?: React.ComponentType<{
    value: string;
    onTabChange: (val: string) => void;
    onEditIdChange: (id: string | number | null) => void;
  }>;
  createComponent?: React.ComponentType<{
    value: string;
    editId: string | number | null;
    onTabChange: (val: string) => void;
    onEditIdChange: (id: string | number | null) => void;
  }>;
  overviewComponent?: React.ComponentType<{
    value: string;
    onTabChange: (val: string) => void;
  }>;
  overviewTabValue?: string; // ← أضفنا هذا
  // Any other component can be added in the future.
  [key: string]: any;
}

const GenericPage = ({
  title,
  description,
  tabs,
  allComponent: AllComponent,
  createComponent: CreateComponent,
  overviewComponent: OverviewComponent,
  overviewTabValue,
}: GenericPageProps) => {
  const { isArabic } = useToggleLocale();
  const [activeTab, setActiveTab] = useState(tabs[0]?.value);
  const [editId, setEditId] = useState<string | number | null>(null);

  return (
    <Layer otherClassName="!my-0">
      <PageTitle title={title} description={description} />
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className={`w-full ${isArabic ? 'rtl' : 'ltr'}`}
        dir={isArabic ? 'rtl' : 'ltr'}
      >
        <TabsNavigation tabs={tabs} />

        {/* Render AllComponent إذا كان موجود والتاب يطابق قيمته */}
        {AllComponent &&
          activeTab ===
            tabs.find((tab) => tab.value === tabs[0]?.value)?.value && (
            <AllComponent
              value={activeTab}
              onTabChange={setActiveTab}
              onEditIdChange={setEditId}
            />
          )}

        {/* Render CreateComponent إذا كان موجود */}
        {CreateComponent &&
          activeTab ===
            tabs.find((tab) => tab.value === tabs[1]?.value)?.value && (
            <CreateComponent
              value={activeTab}
              editId={editId}
              onTabChange={setActiveTab}
              onEditIdChange={setEditId}
            />
          )}

        {/* Render OverviewComponent إذا كان موجود */}
        {OverviewComponent && activeTab === overviewTabValue && (
          <OverviewComponent value={activeTab} onTabChange={setActiveTab} />
        )}

        {/* {OverviewComponent &&
          activeTab ===
            tabs.find((tab) => tab.value === tabs[2]?.value)?.value && (
            <OverviewComponent value={activeTab} />
          )} */}
      </Tabs>
    </Layer>
  );
};

export default GenericPage;
