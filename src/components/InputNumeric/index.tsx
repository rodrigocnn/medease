import { useEffect, useRef } from 'react';
import { NumericFormat } from 'react-number-format';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  error?: boolean;
}

export const InputNumeric: React.FC<InputProps> = ({ error, value }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const typeFocus = error ? `focus:border-red-500 ` : `focus:border-blue-500 `;
  const className = `block w-full rounded-lg border border-gray-300
  bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none ${typeFocus}
  focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700
  dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500
  dark:focus:ring-blue-500`;

  useEffect(() => {
    if (error && inputRef.current) {
      inputRef.current.focus();
    }
  }, [error]);

  return (
    <NumericFormat
      getInputRef={inputRef}
      thousandSeparator="."
      decimalSeparator=","
      prefix="R$"
      className={className}
      value={value}
      type="text"
      name="price"
      placeholder="Valor"
    />
  );
};
