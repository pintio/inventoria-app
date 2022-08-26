import React from "react";

import NavigationTile from "./NavigationTile";

function NavigationTileCoponents() {
  return (
    <div className="my-6">
      <h2 className="text-5xl my-6 text-secondary">Explore</h2>
      <div className="flex flex-row gap-4 flex-wrap">
        <NavigationTile />
        <NavigationTile />
        <NavigationTile />
        <NavigationTile />
        <NavigationTile />
      </div>
    </div>
  );
}

export default NavigationTileCoponents;
