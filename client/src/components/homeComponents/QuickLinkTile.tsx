import React from "react";

function QuickLinkTile({
  heading,
  numOfItems,
}: {
  heading: string;
  numOfItems: string;
}) {
  return (
    <div className=" w-fit h-48 px-6 py-4 rounded hover:shadow-2xl bg-gradient-to-r from-gray-700 via-gray-900 to-black">
      <h2 className="text-themeWhite text-xl">{heading}</h2>
      <h3 className="text-primary font-semibold opacity-80 text-8xl">
        {numOfItems}
      </h3>
      <p className="text-themeWhite text-lg font-light text">
        These items require your attention
      </p>
    </div>
  );
}

export default QuickLinkTile;
