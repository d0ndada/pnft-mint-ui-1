const fs = require("fs")
const path = require("path")

const assetsDir = path.join(__dirname, "assets")

const additionalAttributes = [
  {
    trait_type: "Maximal Power (Pmax)",
    value: "420, 319, 462, and 504 watt",
  },
  {
    trait_type: "MPP Voltage (Vmpp)",
    value: "31.50, 30.20, 38.14, and 38.18 volt",
  },
  {
    trait_type: "MPP Current (Impp)",
    value: "13.34, 10.56, 15.43, and 16.79 ampere",
  },
  {
    trait_type: "Open Circuit Voltage (Voc)",
    value: "38.10, 36.60, 31.54, and 31.58 volt",
  },
  {
    trait_type: "Short Circuit Current (Isc)",
    value: "14.07, 11.34, 14.65, and 15.96 ampere",
  },
  {
    trait_type: "Cell Type",
    value: "N-Type Mono 182mm x 91mm",
  },
  {
    trait_type: "Number of Cells",
    value: "108 cells (6 x 18)",
  },
  {
    trait_type: "Dimensions",
    value: "1722 x 1134 x 30 mm",
  },
  {
    trait_type: "Weight",
    value: "24.0 kg",
  },
  {
    trait_type: "Snow Load",
    value: "Up to 5400 Pa",
  },
  {
    trait_type: "Wind Load",
    value: "Up to 2400 Pa",
  },
]

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
        jsonData.attributes.forEach((attribute) => {})
      }
      delete jsonData.rarityScore
      delete jsonData.rarityTier
      delete jsonData.attributeRarities
      delete jsonData.animation_url
      delete jsonData.external_url

      jsonData.collection = {
        name: "SolarJuice Collection",
        family: "SolarJuice",
        description: "Collection of 3000 solar panels on the blockchain.",
      }
      jsonData.attributes = jsonData.attributes.concat(additionalAttributes)

      // Write the updated JSON back to the file
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8")
    }
  })
})
