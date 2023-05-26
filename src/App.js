import React, { useState } from "react";
import { PopoverPicker } from "./components/PopoverPicker";
import { ListBots } from "./components/listBots";
export const App = () => {
  const [color, setColor] = useState("#aabbcc");
  const [color2, setColor2] = useState("#aabbcc");
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
