interface InsidePageProps {
  children: React.ReactNode;
  title: string;
}

export function InsidePage({ children, title }: InsidePageProps) {
  return (
    <>
      <div className="h-24 bg-[#06afb1]">
        <div className="h-24 min-h-full p-5 font-semibold text-white">{title}</div>
      </div>

      <div className="relative top-[-3rem]  h-full overflow-x-auto  p-5 ">
        <div className="rounded bg-white p-5">{children}</div>
      </div>
    </>
  );
}
