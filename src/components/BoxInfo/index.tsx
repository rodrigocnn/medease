interface Props {
  title: string;
  number: string;
  color: string;
  children: React.ReactNode;
}

export function BoxInfo({ title, number, color, children }: Props) {
  return (
    <div className="w-screen bg-white md:col-span-2 lg:col-span-2 xl:col-span-1">
      <div className="relative w-full overflow-hidden  rounded-md  p-4 shadow dark:bg-slate-800">
        <div className="items-cente flex justify-between xl:gap-x-2">
          <div className={`flex ${color} h-16 w-16 items-center justify-center rounded-full   text-2xl text-white`}>
            {children}
          </div>
          <div className="flex flex-col items-end justify-end ">
            <h3 className="my-1 text-2xl font-semibold dark:text-slate-200">{number}</h3>
            <p className="mb-0 font-medium text-gray-400">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
