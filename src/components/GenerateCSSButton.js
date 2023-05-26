import React, { useState } from "react";
import { ListBots } from "./listBots";

const GenerateCSSButton = ({ cssContent }) => {
  const [fileName, setFileName] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleFileNameChange = (event) => {
    event.preventDefault();
    const inputValue = event.target.value;
    setFileName(inputValue);
    validateInput(inputValue);
  };

  const validateInput = (inputValue) => {
    const regex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    setIsValid(regex.test(inputValue));
  };

  const handleGenerateCSS = () => {
    if (isValid) {
      const cssFilePath = `${fileName}`;

      // Create a new Blob with the CSS content
      const blob = new Blob([cssContent], { type: "text/css" });

      // Create a temporary anchor element to trigger the download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = cssFilePath;
      link.click();
    }
  };

  return (
    <div>
      <ListBots/>
      <input
        className={isValid ? "bot-id-input" : "bot-id-input invalid"}
        type="text"
        value={fileName}
        onChange={handleFileNameChange}
        placeholder="Enter your Bot ID"
      />
      <button
        onClick={handleGenerateCSS}
        className={isValid ? "generate-button" : "generate-button-invalid"}
        disabled={!isValid}
      >
        Generate Stylesheet URL
      </button>
    </div>
  );
};

export default GenerateCSSButton;
