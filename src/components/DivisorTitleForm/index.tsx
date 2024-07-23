interface DivisorTitleFormProps {
  children: React.ReactNode;
}

export function DivisorTitleForm({ children }: DivisorTitleFormProps) {
  return <div className="mb-4 mt-4 p-1   font-bold text-[#06afb1] ">{children}</div>;
}
