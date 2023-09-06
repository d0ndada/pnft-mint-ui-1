const fs = require("fs")
const path = require("path")

const assetsDir = path.join(__dirname, "assets")

fs.readdir(assetsDir, (err, files) => {
  if (err) {
    console.error("Error reading the directory:", err)
    return
  }

  files.forEach((file) => {
    if (file.endsWith(".json")) {
      const filePath = path.join(assetsDir, file)
      const fileContent = fs.readFileSync(filePath, "utf-8")
      let jsonData = JSON.parse(fileContent)

      // Update the name, image, and uri fields
      if (jsonData.name && jsonData.name.startsWith("Solar Juice _")) {
        const newIndex = jsonData.name.split("Solar Juice _")[1]
        jsonData.name = `Solar Juice ${newIndex}`
        jsonData.image = `${newIndex}.png`
        if (
          jsonData.properties &&
          jsonData.properties.files &&
          jsonData.properties.files[0]
        ) {
          jsonData.properties.files[0].uri = `${newIndex}.png`
        }
      }

      // Write the updated JSON back to the file
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8")
    }
  })
})
