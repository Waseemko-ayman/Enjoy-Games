import { SelectableListProps } from '@/interfaces';
import React from 'react';

function SelectableList<T>({
  items,
  selectedItem,
  getKey,
  onSelect,
  renderContent,
  className = '',
  listClassName = '',
}: SelectableListProps<T>) {
  return (
    <ul className={`space-y-4 ${className}`}>
      {items.map((item) => {
        const isSelected = selectedItem === item;
        return (
          <li
            key={getKey(item)}
            onClick={() => onSelect(item)}
            className={`cursor-pointer border p-2 rounded-md ${
              isSelected
                ? 'border-[var(--enjoy-primary)]'
                : 'border-gray-300 text-[var(--enjoy-gray-400)]'
            } ${listClassName}`}
          >
            {renderContent(item, isSelected)}
          </li>
        );
      })}
    </ul>
  );
}

export default SelectableList;
