import React from "react";

function Greetings({ name }: { name: string }) {
  return (
    <div>
      <h1 className="text-3xl text-themeBlack font-medium">
        Welcome!{" "}
        <span className="text-5xl text-themeBlackLight font-light">{name}</span>
      </h1>
      <h3 className=" text-themeBlackLight opacity-80 text-xl">
        inventory System
      </h3>
    </div>
  );
}

export default Greetings;
