import React, { useState } from "react";
import { PopoverPicker } from "./PopoverPicker";

export const App = () => {
  const [color, setColor] = useState("#aabbcc");
  const [color2, setColor2] = useState("#aabbcc");
  return (
    <PopoverPicker
      color={color}
      color2={color2}
      onChange={setColor}
      onChange2={setColor2}
    />
  );
};
