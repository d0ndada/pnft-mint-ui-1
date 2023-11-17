const fs = require("fs");
const path = require("path");

const assetsDir = path.join(__dirname, "testt"); // Assuming the assets folder is in the same directory as this script

fs.readdir(assetsDir, (err, files) => {
  console.log("Script starting");
  if (err) {
    console.error("Error reading the directory:", err);
    return;
  }
  console.log("Files detected:", files); // Log all detected files

  files.forEach((file, index) => {
    if (file.startsWith("Solar Juice _")) {
      console.log(`Attempting to rename: ${file}`); // Log the file it's trying to rename

      const fileExtension = path.extname(file); // .png or .json
      let newIndex = parseInt(file.split("Solar Juice _")[1].split(fileExtension)[0], 10);
      newIndex -= 1; // Decrement the index by 1

      const oldPath = path.join(assetsDir, file);
      const newPath = path.join(assetsDir, `${newIndex}${fileExtension}`);

      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.error(`Error renaming ${file}:`, err);
        } else {
          console.log(`${file} renamed to ${newIndex}${fileExtension}`);
        }
      });
    }
  });
  console.log("Script ending");
});
