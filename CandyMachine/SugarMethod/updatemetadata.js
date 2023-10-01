const fs = require("fs")
const path = require("path")

const assetsDir = path.join(__dirname, "assets")

// Load rarity data
const rarityData = require("./rarityData.json")
const percentageRarity = rarityData.percentageRarity
const rarityTiers = rarityData.rarityTiers

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
          // jsonData.properties.files[0].type = "image/png"
        }
      }
      jsonData.symbol = "SOL"
      if (
        jsonData.properties &&
        jsonData.properties.files &&
        jsonData.properties.files.length > 1 &&
        jsonData.properties.files[1].uri.startsWith("Solar Juice _")
      ) {
        jsonData.properties.files.splice(1, 1)
      }
      // Remove specified fields
      delete jsonData.collection
      delete jsonData.seller_fee_basis_points
      if (jsonData.properties) {
        delete jsonData.properties.category
        delete jsonData.properties.creators
        jsonData.properties.files[0].type = "image/png"
      }

      jsonData.properties.category = "image"

      // Calculate rarity score and assign tier
      if (jsonData.attributes) {
        jsonData.attributes.forEach((attribute) => {
          const rarityValue = parseFloat(
            percentageRarity[
              `${attribute.trait_type}: ${attribute.value}`
            ]?.replace("%", "") || 0
          )
          attribute.rarity = rarityValue

          if (
            rarityTiers.Legendary.includes(
              `${attribute.trait_type}: ${attribute.value}`
            )
          ) {
            attribute.rarityTier = "Legendary"
          } else if (
            rarityTiers.Rare.includes(
              `${attribute.trait_type}: ${attribute.value}`
            )
          ) {
            attribute.rarityTier = "Rare"
          } else {
            attribute.rarityTier = "Common"
          }
        })
      }
      delete jsonData.rarityScore
      delete jsonData.rarityTier
      delete jsonData.attributeRarities

      // Write the updated JSON back to the file
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8")
    }
  })
})

// Change the name because of error

// const fs = require("fs")
// const path = require("path")

// const assetsDir = path.join(__dirname, "assets")

// fs.readdir(assetsDir, (err, files) => {
//   console.log("Script starting")
//   if (err) {
//     console.error("Error reading the directory:", err)
//     return
//   }
//   console.log("Files detected:", files)

//   files.forEach((file) => {
//     const fileExtension = path.extname(file)
//     const baseName = path.basename(file, fileExtension)

//     // Check if the base name is an integer
//     if (Number.isInteger(Number(baseName))) {
//       console.log(`Processing file: ${file}`)

//       // If it's a JSON file, update the metadata
//       if (fileExtension === ".json") {
//         const filePath = path.join(assetsDir, file)
//         const fileContent = fs.readFileSync(filePath, "utf-8")
//         let jsonData = JSON.parse(fileContent)

//         // Update the name, image, and uri fields
//         jsonData.name = `Solar Juice ${baseName}`
//         jsonData.image = `${baseName}.png`
//         if (
//           jsonData.properties &&
//           jsonData.properties.files &&
//           jsonData.properties.files[0]
//         ) {
//           jsonData.properties.files[0].uri = `${baseName}.png`
//         }

//         // Remove specified fields
//         delete jsonData.collection
//         if (jsonData.properties) {
//           delete jsonData.properties.category
//           delete jsonData.properties.creators
//         }

//         // Write the updated JSON back to the file
//         fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8")
//       }
//     }
//   })
//   console.log("Script ending")
// })
