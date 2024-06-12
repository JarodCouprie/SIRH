import React from "react";

export function MainRoot(props: any) {
  const title: string = props.title || "Titre de la page";
  const action: React.JSX.Element = props.action;
  const children: React.JSX.Element = props.children;
  const mainHeader = (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="text-2xl text-gray-900 dark:text-gray-200">{title}</div>
        <div className="flex w-full items-center justify-end pb-4">
          <div>{action}</div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
  return mainHeader;
}
