import React from "react";

const GenerateCSSButton = ({ cssContent }) => {
  const handleGenerateCSS = () => {
    const cssFileName = "dynamic-styles.css";
    const cssFilePath = `css/${cssFileName}`;

    // Create a new Blob with the CSS content
    const blob = new Blob([cssContent], { type: "text/css" });

    // Create a temporary anchor element to trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = cssFilePath;
    link.click();
  };

  return (
    <button onClick={handleGenerateCSS} className="generate-button">
      Donwload CSS
    </button>
  );
};

export default GenerateCSSButton;
