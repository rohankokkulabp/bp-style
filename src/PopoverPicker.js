import React, { useCallback, useRef, useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import useClickOutside from "./useClickOutside";
import useClickOutside2 from "./useClickOutside2";
import GenerateCSSButton from "./GenerateCSSButton";
export const PopoverPicker = ({ color, color2, onChange, onChange2 }) => {
  const popover = useRef();
  const popover2 = useRef();
  const [isOpen, toggle] = useState(false);
  const [isOpen2, toggle2] = useState(false);
  const [rectangleColor, setRectangleColor] = useState("#000000"); // Initial color of the rectangle
  const [rectangleColor2, setRectangleColor2] = useState("#000000");
  const [rectangleColor3, setRectangleColor3] = useState("#000000");
  const close = useCallback(() => toggle(false), []);
  const close2 = useCallback(() => toggle2(false), []);
  useClickOutside(popover, close);
  useClickOutside2(popover2, close2);

  const generateLighterShade = (hexColor) => {
    const colorValue = hexColor.replace("#", "");
    const rgbColor = parseInt(colorValue, 16);
    const r = (rgbColor >> 16) & 255;
    const g = (rgbColor >> 8) & 255;
    const b = rgbColor & 255;

    const lightenFactor = 0.6; // Adjust this value to control the lightness

    const newR = Math.round(r + (255 - r) * lightenFactor);
    const newG = Math.round(g + (255 - g) * lightenFactor);
    const newB = Math.round(b + (255 - b) * lightenFactor);

    const newHexColor = `#${((newR << 16) | (newG << 8) | newB).toString(16)}`;

    return newHexColor;
  };
  const generateLighterShade2 = (hexColor) => {
    const colorValue = hexColor.replace("#", "");
    const rgbColor = parseInt(colorValue, 16);
    const r = (rgbColor >> 16) & 255;
    const g = (rgbColor >> 8) & 255;
    const b = rgbColor & 255;

    const lightenFactor = 0.3; // Adjust this value to control the lightness

    const newR = Math.round(r + (255 - r) * lightenFactor);
    const newG = Math.round(g + (255 - g) * lightenFactor);
    const newB = Math.round(b + (255 - b) * lightenFactor);

    const newHexColor = `#${((newR << 16) | (newG << 8) | newB).toString(16)}`;

    return newHexColor;
  };

  const handleColorChange = (newColor) => {
    setRectangleColor(newColor);
    setRectangleColor2(generateLighterShade(newColor));
    setRectangleColor3(generateLighterShade2(newColor));
    onChange(newColor); // Notify parent component about the color change
  };
  const handleColorChange2 = (newColor2) => {
    setRectangleColor2(newColor2);
    onChange2(newColor2); // Notify parent component about the color change
  };

  const [lighterShade, setLighterShade] = useState("#ffffff");

  const cssContent = `.bpw-header-container {
    background-color: ${rectangleColor};
}
.rectangle2 {
    background-color: ${rectangleColor2};
}
.bpw-from-bot .bpw-chat-bubble {
    background-color: ${rectangleColor};
}
.chat-bubble2 {
    background-color: ${rectangleColor3};
}`;

  return (
    <>
      <div className="picker">
        <div
          className="swatch"
          style={{ backgroundColor: color }}
          onClick={() => toggle(true)}
        />
        <HexColorInput color={color} onChange={handleColorChange} />

        {isOpen && (
          <div className="popover" ref={popover}>
            <HexColorPicker color={color} onChange={handleColorChange} />
          </div>
        )}
        <div
          className="swatch"
          style={{ backgroundColor: color2 }}
          onClick={() => toggle2(true)}
        />
        <HexColorInput color={color2} onChange={handleColorChange2} />
        {isOpen2 && (
          <div className="popover" ref={popover2}>
            <HexColorPicker color2={color2} onChange={handleColorChange2} />
          </div>
        )}

        <div
          className="bpw-header-container"
          style={{ backgroundColor: rectangleColor }}
        >
          <h3 contenteditable="true" spellCheck="false">
            Chatbot Name
          </h3>
          <p contenteditable="true" spellCheck="false">
            Description
          </p>
          <div
            className="rectangle2"
            style={{ backgroundColor: rectangleColor2 }}
          >
            <div
              className="bpw-from-bot"
              style={{ backgroundColor: rectangleColor }}
            >
              <p>See? I'm Proactive! 😍</p>
            </div>
            <div
              className="bpw-from-bot"
              style={{ backgroundColor: rectangleColor }}
            >
              <p>Botpress X Webchat 2.0</p>
            </div>
            <div
              className="bpw-from-user"
              style={{ backgroundColor: rectangleColor3 }}
            >
              <p>Hello! This message is from user!</p>
            </div>
          </div>
        </div>
      </div>
      <div className="generator">
        <textarea value={cssContent} className="css-box">
          works dude
        </textarea>
        <GenerateCSSButton cssContent={cssContent} />
      </div>
    </>
  );
};
