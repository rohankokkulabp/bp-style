import React, { useCallback, useRef, useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import useClickOutside from "./useClickOutside";
import useClickOutside2 from "./useClickOutside2";
import { ListBots } from "./listBots";
export const PopoverPicker = ({ color, color2, onChange, onChange2 }) => {
  const popover = useRef();
  const popover2 = useRef();
  const [isOpen, toggle] = useState(false);
  const [isOpen2, toggle2] = useState(false);
  const [rectangleColor, setRectangleColor] = useState("#8d71bc"); // Initial color of the rectangle
  const [rectangleColor2, setRectangleColor2] = useState("#d3c8e5");
  const [rectangleColor3, setRectangleColor3] = useState("#84bbd3");
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
}
.bpw-header-container{
  border: none;
}

.bpw-layout{
  width: 200px;
  border: none;
}
.bpw-header-name{
  color: ${rectangleColor2};
}

.bpw-layout{
  height: 60%;
  right: 30px;
}

.bpw-header-container{
  color: ${rectangleColor2};
}

.bpw-header-icon, .bpw-header-icon svg, .bpw-header-icon svg path {
  fill: ${rectangleColor2};
}

.bpw-chat-container{
  background-color: ${rectangleColor2};
}

.bpw-composer{
  background-color: ${rectangleColor2};
}
`;

  return (
    <>
      <div className="picker">
        <div className="pickers">
          <div className="theme-selector">
            <div
              className="swatch"
              style={{ backgroundColor: color }}
              onClick={() => toggle(true)}
            />
            <HexColorInput
              color={color}
              onChange={handleColorChange}
              className="color-input"
            />
            {isOpen && (
              <div className="popover" ref={popover}>
                <HexColorPicker color={color} onChange={handleColorChange} />
              </div>
            )}
          </div>
          <div className="theme-selector">
            <div
              className="swatch"
              style={{ backgroundColor: color2 }}
              onClick={() => toggle2(true)}
            />
            <HexColorInput
              color={color2}
              onChange={handleColorChange2}
              className="color-input"
            />
            {isOpen2 && (
              <div className="popover" ref={popover2}>
                <HexColorPicker color2={color2} onChange={handleColorChange2} />
              </div>
            )}
          </div>
        </div>
        <div className="generator">
          <textarea
            contenteditable="true"
            value={cssContent}
            className="css-box"
          >
            CSS AREA
          </textarea>
          <ListBots cssContent={cssContent} />
        </div>
        <div className="container">
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
          </div>
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
              <p>Botpress x Webchat 2.0</p>
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
    </>
  );
};
