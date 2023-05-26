import React, { useState } from "react";
import { PopoverPicker } from "./components/PopoverPicker";
import { ListBots } from "./components/listBots";
export const App = () => {
  const [color, setColor] = useState("#8d71bc");
  const [color2, setColor2] = useState("#000000");
  return (
    <div>
      <PopoverPicker
        color={color}
        color2={color2}
        onChange={setColor}
        onChange2={setColor2}
      />
    </div>
  );
};
