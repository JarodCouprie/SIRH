import React from "react";

interface MainRootProps {
  title: string;
  action?: React.JSX.Element;
  children: React.ReactNode;
}

export const MainRoot: React.FC<MainRootProps> = (props) => {
  const title = props.title || "Titre de la page";
  const action = props.action;
  const children = props.children;
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col">
        <div className="text-2xl text-gray-900 dark:text-gray-200">{title}</div>
        <div className="flex w-full items-center justify-end pb-4">
          <div>{action}</div>
        </div>
      </div>
      <div className="flex h-full flex-col">{children}</div>
    </div>
  );
};
