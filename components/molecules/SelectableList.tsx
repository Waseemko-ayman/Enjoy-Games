import { SelectableListProps } from '@/interfaces';
import React from 'react';
import AnimatedWrapper from './FramerMotion/AnimatedWrapper';

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
      {items.map((item, index) => {
        const isSelected = selectedItem === item;
        return (
          <AnimatedWrapper key={getKey(item)} custom={index}>
            <li
              onClick={() => onSelect(item)}
              className={`cursor-pointer border p-2 rounded-md ${
                isSelected
                  ? 'border-[var(--enjoy-primary)]'
                  : 'border-gray-300 text-[var(--enjoy-gray-400)]'
              } ${listClassName}`}
            >
              {renderContent(item, isSelected)}
            </li>
          </AnimatedWrapper>
        );
      })}
    </ul>
  );
}

export default SelectableList;
