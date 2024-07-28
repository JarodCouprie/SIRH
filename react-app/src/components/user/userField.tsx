export function UserField(props: {
  title: string;
  children: string | string[];
}) {
  const title = props.title || "Titre à donner";
  const children = props.children;
  return (
    <div className="flex flex-col gap-1 p-4">
      <div className="text-slate-800 dark:text-slate-300">{title}</div>
      <div className="font-bold text-slate-950 dark:text-slate-50">
        {children}
      </div>
    </div>
  );
}
