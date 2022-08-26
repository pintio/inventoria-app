import React, { useState } from "react";

import Button from "./Button";
import PopUp from "../PopUp";

// TODO - add form for each button.
// TODO - add click handler for each button.

function QuickActions(): JSX.Element {
  const [formVisibility, setFormVisibility] = useState<boolean>(false);

  return (
    <div className="my-6">
      <h2 className="text-5xl my-6 text-secondary">Quick Actions</h2>
      <div className="flex flex-auto gap-6">
        <Button
          title="Receive Material"
          onClickHandler={() => {
            setFormVisibility(true);
          }}
        />
        <Button
          title="Sell Material"
          onClickHandler={() => {
            setFormVisibility(true);
          }}
        />
      </div>
      <PopUp visibility={formVisibility}>
        <div>lol</div>
      </PopUp>
    </div>
  );
}

export default QuickActions;
