import * as React from "react";

function Button({
  title,
  onClickHandler,
}: {
  title: string;
  onClickHandler: React.MouseEventHandler;
}): JSX.Element {
  return (
    <button
      onClick={onClickHandler}
      className="w-auto h-auto px-10 py-4 mt-2 text-slate-100 bg-teal-700 hover:bg-teal-900 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-xl font-medium rounded-md text-center "
    >
      {title}
    </button>
  );
}

export default Button;
