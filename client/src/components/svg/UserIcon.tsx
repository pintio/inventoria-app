import React from "react";

function UserIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      fill="none"
      stroke=""
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      className=" stroke-primary"
      viewBox="0 0 24 24"
    >
      <path stroke="none" d="M0 0h24v24H0z"></path>
      <circle cx="12" cy="12" r="9"></circle>
      <path d="M9 10L9.01 10"></path>
      <path d="M15 10L15.01 10"></path>
      <path d="M10 14v2a2 2 0 004 0v-2m1.5 0h-7"></path>
    </svg>
  );
}

export default UserIcon;
