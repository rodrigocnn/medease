import { Sidebar } from '../sidebar';

interface Props {
  children: React.ReactNode;
}

export function Admin({ children }: Props) {
  return (
    <div className="grid grid-cols-6 ">
      <div className="col-span-1 ">
        <Sidebar />
      </div>
      <div className="col-span-5">
        <div className="bg-[#01d8da] p-5">Barra Superior</div>
        <main>{children}</main>
      </div>
    </div>
  );
}
