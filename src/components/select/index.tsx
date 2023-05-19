import { SelectHTMLAttributes } from 'react';

interface Option {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
}

export function Select({ options, ...rest }: SelectProps) {
  return (
    <select
      {...rest}
      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5
          text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700
           dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
    >
      {options.map((x, y) => (
        <option value={x.value} key={y}>
          {x.label}
        </option>
      ))}
    </select>
  );
}
