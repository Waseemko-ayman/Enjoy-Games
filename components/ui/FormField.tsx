/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { JSX, useState } from 'react';
import { FaCheck, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Controller, UseFormRegister, FieldError } from 'react-hook-form';
import { InputTypes } from '@/utils/type';
import Tiptap from '../molecules/Tiptap';
import Select from 'react-select';

interface FormFieldProps {
  id?: string;
  label?: string;
  placeholder?: string;
  control?: any;
  value?: string;
  handleChange?: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
  onValueChange?: (value: string) => void;
  type?: InputTypes;
  isMulti?: boolean;
  withIcon?: boolean;
  icon?: JSX.Element;
  options?: {
    id: string | number | null;
    name: string;
  }[];
  SelectValuePlaceholder?: string;
  disabled?: boolean;
  inputName: string;
  register?: UseFormRegister<any>;
  error?: FieldError;
  editId?: string | number | null;
  readOnly?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  placeholder,
  control,
  value,
  type = 'text',
  isMulti,
  withIcon = false,
  icon,
  options = [],
  SelectValuePlaceholder = 'اختر...',
  disabled,
  inputName,
  register,
  error,
  editId,
  readOnly,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const errorStyle = `${error ? 'border-2 border-red-500' : ''}`;
  const fieldStyle = `flex items-center h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm outline-none ${errorStyle} ${
    type === 'file' ? 'cursor-pointer' : ''
  }`;
  const isPassword = type === 'password';

  // const filteredOptions = options.filter((opt) =>
  //   opt.name.toLowerCase().includes(search.toLowerCase())
  // );

  const filteredOptions =
    Array.isArray(options) && options.length > 0
      ? options.filter((opt) =>
          (opt.name ?? '').toLowerCase().includes(search.toLowerCase())
        )
      : [];

  return (
    <div className="space-y-2">
      {label && <label htmlFor={id}>{label}</label>}

      {type === 'editor' && control ? (
        <div className="mt-2">
          <Controller
            key={editId ?? 'new'}
            name={inputName}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Tiptap
                key={editId || 'new'}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                errorStyle={errorStyle}
              />
            )}
          />
        </div>
      ) : type === 'select' && control ? (
        <div className="mt-2">
          <Controller
            control={control}
            name={inputName}
            render={({ field }) => (
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={`w-full justify-between ${errorStyle}`}
                    disabled={disabled}
                  >
                    {field.value !== null && field.value !== ''
                      ? options.find(
                          (opt) =>
                            String(opt.id !== null ? opt.id : '') ===
                            String(field.value)
                        )?.name
                      : SelectValuePlaceholder}

                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command className="bg-white">
                    <CommandInput
                      placeholder="إبحث..."
                      className="h-9"
                      value={search}
                      onValueChange={setSearch}
                    />
                    <CommandList>
                      {filteredOptions.length === 0 && (
                        <CommandEmpty>لا يوجد نتائج</CommandEmpty>
                      )}
                      <CommandGroup>
                        {filteredOptions.map((opt) => (
                          <CommandItem
                            key={String(opt.id)}
                            value={`${opt.id} ${opt.name}`}
                            onSelect={() => {
                              field.onChange(
                                opt.id !== null ? String(opt.id) : null
                              );
                              setOpen(false);
                              setSearch('');
                            }}
                          >
                            {opt.name}
                            <Check
                              className={cn(
                                'ml-auto',
                                String(field.value) === String(opt.id)
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
          />
        </div>
      ) : isMulti && control ? (
        <Controller
          name={inputName}
          control={control}
          render={({ field }) => {
            const normalizedOptions = options.map((opt: any) => ({
              value: opt.value ?? String(opt.id),
              label: opt.label ?? opt.name,
            }));
            return (
              <Select
                isMulti
                options={normalizedOptions}
                value={normalizedOptions.filter((opt) =>
                  Array.isArray(field.value)
                    ? field.value.includes(opt.value)
                    : false
                )}
                onChange={(selected: any) =>
                  field.onChange(
                    selected ? selected.map((sel: any) => sel.value) : []
                  )
                }
                placeholder={SelectValuePlaceholder}
                isDisabled={disabled}
                getOptionValue={(option: any) => option.value}
                getOptionLabel={(option: any) => option.label}
                className="mt-2"
                classNamePrefix="custom"
                styles={{
                  control: (base: any) => ({ ...base, cursor: 'pointer' }),
                  option: (base: any) => ({ ...base, cursor: 'pointer' }),
                  multiValueRemove: (base: any) => ({
                    ...base,
                    cursor: 'pointer',
                  }),
                  menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
                  menu: (base: any) => ({ ...base, zIndex: 9999 }),
                }}
                menuPlacement="auto"
                maxMenuHeight={240}
              />
            );
          }}
        />
      ) : type === 'checkbox' ? (
        <div className="mt-2">
          <Controller
            control={control}
            name={inputName}
            render={({ field: { onChange, value, ref, name } }) => (
              <label className="flex items-center cursor-pointer select-none gap-3">
                <input
                  ref={ref}
                  type="checkbox"
                  name={name}
                  checked={!!value}
                  onChange={(e) => onChange(e.target.checked)}
                  className="peer sr-only"
                  disabled={disabled}
                />
                <div className="w-6 h-6 rounded-lg border border-gray-300 peer-checked:bg-green-600 flex items-center justify-center transition-colors">
                  {!!value && <FaCheck className="w-3 h-3 text-white" />}
                </div>
                <span
                  className={`text-sm transition-colors ${
                    value ? 'text-gray-700' : 'text-gray-400'
                  }`}
                >
                  {placeholder}
                </span>
              </label>
            )}
          />
        </div>
      ) : (
        <div className="relative">
          {icon}
          <input
            type={isPassword && showPassword ? 'text' : type}
            id={id}
            placeholder={placeholder}
            value={value}
            className={`mt-2 ${withIcon ? 'pl-9' : ''} ${
              isPassword ? 'pr-9' : ''
            } ${fieldStyle}`}
            disabled={disabled}
            {...(register ? register(inputName) : {})}
            readOnly={readOnly}
          />
          {isPassword && (
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          )}
        </div>
      )}

      {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
    </div>
  );
};

export default FormField;
