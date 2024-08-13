interface CustomButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type?: 'button' | 'submit' | 'reset' | 'cancel';
}

export function Button({ type, ...rest }: CustomButtonProps) {
  const defaultClass = `
    mb-6 mr-2 rounded-lg bg-[#01d8da] px-5 py-2.5 text-sm font-medium text-white
    hover:bg-[#06afb1] focus:outline-none focus:ring-4 focus:ring-blue-300
    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
  `;

  const cancelClass = `
    mb-2 mr-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5
                text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-[#06afb1] focus:z-10
                focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800
                dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700
  `;

  const classType = type === 'cancel' ? cancelClass : defaultClass;

  return <button {...rest} className={classType} />;
}
