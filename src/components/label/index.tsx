interface LabelProps {
  title: string;
}

export function Label({ title }: LabelProps) {
  return (
    <label
      htmlFor="select_professional"
      className="left-1  z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-gray-400 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-gray-900 dark:text-gray-500 peer-focus:dark:text-blue-500"
    >
      {title}
    </label>
  );
}
