const fs = require('fs');
const path = require('path');

const saveCSS = (cssContent) => {
  const publicFolder = path.join(__dirname, 'public');
  const cssFilePath = path.join(publicFolder, 'styles.css');

  fs.writeFile(cssFilePath, cssContent, (err) => {
    if (err) {
      console.error('Error saving CSS file:', err);
    } else {
      console.log('CSS file saved successfully!');
    }
  });
};

export default saveCSS;
