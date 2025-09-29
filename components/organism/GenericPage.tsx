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
  allComponent: React.ComponentType<{
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
  }>;
}

const GenericPage = ({
  title,
  description,
  tabs,
  allComponent: AllComponent,
  createComponent: CreateComponent,
  overviewComponent: OverviewComponent,
}: GenericPageProps) => {
  const { isArabic } = useToggleLocale();
  const [activeTab, setActiveTab] = useState(tabs[0].value);
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
        {activeTab === tabs[0].value && (
          <AllComponent
            value={tabs[0].value}
            onTabChange={setActiveTab}
            onEditIdChange={setEditId}
          />
        )}

        {CreateComponent && activeTab === tabs[1].value && (
          <CreateComponent
            value={tabs[1].value}
            editId={editId}
            onTabChange={setActiveTab}
            onEditIdChange={setEditId}
          />
        )}

        {OverviewComponent && activeTab === tabs[1].value && (
          <OverviewComponent value={tabs[1].value} />
        )}
      </Tabs>
    </Layer>
  );
};

export default GenericPage;
