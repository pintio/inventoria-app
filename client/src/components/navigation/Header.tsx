import React from "react";

import UserIcon from "../svg/UserIcon";
import SettingIcon from "../svg/SettingIcon";
import axios from "axios";

function Header({ className }: { className?: string }): JSX.Element {
  return (
    <header className={`z-50 fixed flex gap-2 justify-end ${className}`}>
      <div
        onClick={() => {
          axios("/api/get/user", {
            method: "post",
            withCredentials: true,
          }).then((res) => {
            console.log(res, "response");
          });
        }}
      >
        <SettingIcon />
      </div>

      <div
        onClick={() => {
          axios("/auth/logout", {
            method: "get",
          })
            .then((res) => {
              if (res.status === 205) {
                window.location = "/" as string & Location;
              } else {
                alert("something went wrong, please try again.");
              }
            })
            .catch(() => {
              console.log("noice");
            });
        }}
      >
        <UserIcon />
      </div>
    </header>
  );
}

export default Header;
