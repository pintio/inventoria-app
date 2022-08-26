import React from "react";

const PopUp = function ({
  visibility,
  children,
}: {
  visibility: boolean;
  children: JSX.Element;
}): JSX.Element {
  return (
    <div
      className={`w-screen h-screen absolute left-0 top-0 flex items-center justify-center backdrop-blur-sm backdrop-brightness-90 backdrop-opacity-80 backdrop-saturate-150 transition-all duration-300 ${
        visibility ? "opacity-100" : "hidden opacity-0 backdrop-opacity-80"
      }`}
    >
      {children}
    </div>
  );
};

export default PopUp;
