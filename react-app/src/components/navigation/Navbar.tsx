import { NavLink } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button.tsx";
import { UserMenu } from "@/components/navigation/UserMenu.tsx";
import { TbBuildingCommunity, TbLayoutDashboard } from "react-icons/tb";
import React from "react";
import { LuCalendarX } from "react-icons/lu";
import { MdOutlineReceiptLong } from "react-icons/md";
import { BsPersonRaisedHand } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";

export function NavBar() {
  return (
    <aside
      className="flex w-80 max-w-80 flex-col justify-between gap-4
     bg-gray-800 transition-all duration-500 max-md:w-20"
    >
      <div className="flex flex-col">
        <h1 className="border-b border-slate-700 p-4 text-center text-lg font-bold text-gray-100">
          SIRH
        </h1>
        <div className="flex flex-col gap-2 p-4">
          <NavBarLink link="/" title="Dashboard">
            <TbLayoutDashboard className="size-6" />
          </NavBarLink>
          <NavBarLink link="/demand" title="Demandes">
            <BsPersonRaisedHand className="size-6" />
          </NavBarLink>
          <NavBarLink link="/expense" title="Frais">
            <MdOutlineReceiptLong className="size-6" />
          </NavBarLink>
          <NavBarLink link="/absence" title="Absences">
            <LuCalendarX className="size-6" />
          </NavBarLink>
          <NavBarLink link="/organisation" title="Organisation">
            <TbBuildingCommunity className="size-6" />
          </NavBarLink>
          <NavBarLink link="/user" title="Collaborateurs">
            <GrGroup className="size-6" />
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
      <div className="flex w-full items-start justify-start gap-4 max-md:flex-col max-md:items-center">
        {children}
        <span className="max-md:hidden">{title}</span>
      </div>
    </NavLink>
  );
}
