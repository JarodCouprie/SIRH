import { NavLink } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button.tsx";
import { UserMenu } from "@/components/navigation/UserMenu.tsx";
import { TbCalendarQuestion, TbLayoutDashboard } from "react-icons/tb";
import React from "react";
import {
  BackpackIcon,
  CalendarIcon,
  FileIcon,
  PersonIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";

export function NavBar() {
  return (
    <aside className="flex w-80 max-w-80 flex-col justify-between gap-4 bg-gray-900">
      <div className="flex flex-col">
        <h1 className="border-b border-slate-700 p-4 text-center text-lg font-bold text-gray-100">
          SIRH
        </h1>
        <div className="flex flex-col gap-2 p-4">
          <NavBarLink link="/" title="Dashboard">
            <TbLayoutDashboard className="mr-4 h-4 w-4" />
          </NavBarLink>
          <NavBarLink link="/demand" title="Demandes">
            <TbCalendarQuestion className="mr-4 h-4 w-4" />
          </NavBarLink>
          <NavBarLink link="/expense" title="Frais">
            <ReaderIcon className="mr-4 h-4 w-4" />
          </NavBarLink>
          <NavBarLink link="/absence" title="Absences">
            <CalendarIcon className="mr-4 h-4 w-4" />
          </NavBarLink>
          <NavBarLink link="/file" title="Documents">
            <FileIcon className="mr-4 h-4 w-4" />
          </NavBarLink>
          <NavBarLink link="/organisation" title="Organisation">
            <BackpackIcon className="mr-4 h-4 w-4" />
          </NavBarLink>
          <NavBarLink link="/user" title="Collaborateurs">
            <PersonIcon className="mr-4 h-4 w-4" />
          </NavBarLink>
        </div>
      </div>
      <UserMenu />
    </aside>
  );
}

function NavBarLink(props: any) {
  const link: string = props.link || "/";
  const children: React.JSX.Element = props.children;
  const title: string = props.title || "lien";
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        isActive
          ? buttonVariants({ variant: "navActive", size: "nav" })
          : buttonVariants({ variant: "navNotActive", size: "nav" })
      }
    >
      {children}
      {title}
    </NavLink>
  );
}
