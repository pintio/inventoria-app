import React, { ReactChild } from "react";
import { NavLink, Outlet } from "react-router-dom";

type navObj = {
  link: string;
  title: string;
};

const navArr: navObj[] = [
  { link: "", title: "home" },
  { link: "stock", title: "stock" },
  { link: "categories", title: "categories" },
  { link: "warehouses", title: "warehouses" },
  { link: "suppliers", title: "suppliers" },
  { link: "users", title: "users" },
  { link: "reports", title: "reports" },
  { link: "master list", title: "master list" },
  { link: "Settings", title: "Settings" },
];

const NavBarComponent = function ({ children }: { children: ReactChild[] }) {
  return (
    <>
      <div className=" z-50 py-6 h-screen fixed w-48 flex flex-wrap content-between bg-slate-50 border-r-2 border-opacity-30">
        <div className="w-full text-center">logo</div>
        <nav className="flex flex-wrap items-center content-center text-center">
          {children}
        </nav>
        <Outlet />
        <div className="w-full text-center">@pintio</div>
      </div>
    </>
  );
};

const NavBar = function () {
  return (
    <NavBarComponent>
      {navArr.map((navItem) => {
        return (
          <NavLink
            key={navItem.title}
            to={`/${navItem.link}`}
            className={({ isActive }) => {
              return `${
                isActive
                  ? "text-lg font-bold text-primary "
                  : "text-md text-slate-700 hover:text-themeBlack"
              } py-2 w-full`;
            }}
          >
            {navItem.title}
          </NavLink>
        );
      })}
    </NavBarComponent>
  );
};

export default NavBar;
