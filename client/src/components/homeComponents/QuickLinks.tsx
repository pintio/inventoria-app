import React from "react";

import QuickLinkTile from "./QuickLinkTile";

function QuickLinks(): JSX.Element {
  return (
    <div className="my-6">
      <h2 className="text-5xl my-6 text-secondary">Quick Links</h2>
      <div className="flex flex-wrap gap-4">
        <QuickLinkTile heading="abc" numOfItems="32" />
        <QuickLinkTile heading="abc" numOfItems="32" />
      </div>
    </div>
  );
}

export default QuickLinks;
