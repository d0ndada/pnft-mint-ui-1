const fs = require("fs")
const path = require("path")

const assetsDir = path.join(__dirname, "assets") // Assuming the assets folder is in the same directory as this script
const attributeCounts = {}

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

      if (jsonData.attributes) {
        jsonData.attributes.forEach((attr) => {
          const key = `${attr.trait_type}: ${attr.value}`
          if (attributeCounts[key]) {
            attributeCounts[key]++
          } else {
            attributeCounts[key] = 1
          }
        })
      }
    }
  })

  // Write the attribute counts to a separate file
  const outputPath = path.join(__dirname, "attributeCounts.json")
  fs.writeFileSync(
    outputPath,
    JSON.stringify(attributeCounts, null, 2),
    "utf-8"
  )
  console.log("Attribute counts saved to attributeCounts.json")
})
