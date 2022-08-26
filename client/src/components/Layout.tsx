import React, { ReactChild } from "react";

import NavBar from "../components/navigation/NavBar";
import Header from "./navigation/Header";

function Layout({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element {
  return (
    <main className=" w-full  bg-themeWhite  flex">
      <Header className="ml-32 mt-4 px-4 md:px-16 lg:px-36 w-full" />
      <NavBar />
      <div className="w-full h-full container ml-32 px-4 md:px-16 py-8 lg:px-36 flex flex-col justify-evenly">
        {children}
      </div>
    </main>
  );
}

export default Layout;
