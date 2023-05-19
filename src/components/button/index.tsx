export function Button({ ...rest }) {
  return (
    <button
      {...rest}
      className="mb-2 mr-2 rounded-lg bg-[#01d8da] px-5 py-2.5 text-sm font-medium
      text-white hover:bg-[#06afb1] focus:outline-none focus:ring-4 focus:ring-blue-300
      dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    />
  );
}
