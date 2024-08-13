import { SelectHTMLAttributes } from 'react';

interface Option {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[] | undefined;
  error?: boolean;
}

export function Select({ options, value, error, onChange, ...rest }: SelectProps) {
  return (
    <div className="relative">
      <select
        {...rest}
        value={value}
        onChange={onChange}
        className={`block w-full rounded-lg border p-2.5 text-sm
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${
            error
              ? 'focus:border-red-500 focus:ring-red-500'
              : 'focus:border-blue-500 focus:ring-blue-500'
          }
          bg-gray-50 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white
          dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
      >
        {options?.map((x, y) => (
          <option value={x.value} key={y}>
            {x.label}
          </option>
        ))}
      </select>
    </div>
  );
}
