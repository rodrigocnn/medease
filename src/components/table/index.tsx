

interface ColumItemProps {
  caption: string;
}

interface TableProps {
  children: React.ReactNode;
  columns: ColumItemProps[];
}

interface TableCellProps {
  caption?: string;
}

interface ColumnProps {
  children?: React.ReactNode;
  caption?: string;
  icon?: React.ReactNode;
}

export function TableCell({ caption }: TableCellProps) {
  return (
    <th scope="col" className="px-6 py-3">
      {caption}
    </th>
  );
}

export function Column({ caption, icon }: ColumnProps) {
  return (
    <th scope="col" className="px-6 py-4 font-light">
      {icon} {caption}
    </th>
  );
}

export function Table({ children, columns }: TableProps) {
  return (
    <table className="w-full text-sm text-left text-gray-500  dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {columns?.map((colum: ColumItemProps) => {
            return <TableCell key={colum.caption} caption={colum.caption} />;
          })}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
