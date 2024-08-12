import { FC, ReactNode } from "react";

interface FieldRowProps {
  title: string;
  children: ReactNode;
}

export const FieldRow: FC<FieldRowProps> = (props) => {
  return (
    <div className="flex flex-col gap-1 p-4">
      <div className="text-xs text-slate-800 dark:text-slate-300">
        {props.title}
      </div>
      <div className="font-bold text-slate-950 dark:text-slate-50">
        {props.children}
      </div>
    </div>
  );
};
