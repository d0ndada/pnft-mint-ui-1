import fs from "fs"
import path from "path"
import {
  CandyMachineItem,
  CreateCandyMachineBuilderContext,
  CreateCandyMachineInput,
  DefaultCandyGuardSettings,
  Metaplex,
  TransactionBuilder,
  amount,
  bundlrStorage,
  candyMachineProgram,
  keypairIdentity,
  sol,
  toBigNumber,
  toDateTime,
  toMetaplexFile,
} from "@metaplex-foundation/js"
import {
  addConfigLines,
  create,
  createCandyGuard,
  createCandyMachineV2,
  fetchCandyGuard,
  fetchCandyMachine,
  mintV2,
  mplCandyMachine,
} from "@metaplex-foundation/mpl-candy-machine"
import {
  TokenStandard,
  createNft,
  mintArgs,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata"
import { setComputeUnitLimit } from "@metaplex-foundation/mpl-toolbox"
import {
  createGenericFile,
  createNoopSigner,
  createSignerFromKeypair,
  dateTime,
  generateSigner,
  none,
  percentAmount,
  publicKey,
  signerIdentity,
  some,
  transactionBuilder,
} from "@metaplex-foundation/umi"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { nftStorageUploader } from "@metaplex-foundation/umi-uploader-nft-storage"
import { Connection, Keypair, PublicKey } from "@solana/web3.js"

// 'https://solana-devnet.g.alchemy.com/v2/8y5XaD-EI4DKbwLDBU4ywF3EnsCoS3kZ'

const QUICKNODE_RPC = "https://api.devnet.solana.com" // 👈 Replace with your QuickNode Solana Devnet HTTP Endpointconst SESSION_HASH = 'QNDEMO'+Math.ceil(Math.random() * 1e9); // Random unique identifier for your session

const keypairFIle = fs.readFileSync("./keypair.json")
const WALLET = Keypair.fromSecretKey(
  Buffer.from(JSON.parse(keypairFIle.toString()))
)

const umiKeypair = {
  publicKey: publicKey(WALLET.publicKey),
  secretKey: WALLET.secretKey,
}

const umi = createUmi(QUICKNODE_RPC).use(mplCandyMachine())
const signer = createSignerFromKeypair(umi, umiKeypair)
umi.use(signerIdentity(signer)).use(
  nftStorageUploader({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDk5ZDZiOWUyNjY1ODQwNkI4YTEzODhDOTAyYTA2OGEyODVmRTBiM2YiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5MTE2MTQ3NzAzNiwibmFtZSI6InRlc3RhcGkifQ.B3ES92b39DwkxFM8mWvtPhg7vY1Yb3B1v-7ZUag7VqQ",
  })
)

const collectionUpdateAuthority = generateSigner(umi)
let candyMachine = generateSigner(umi)
const collectionMint = generateSigner(umi)
// console.log("outisde function candymachinePK", candyMachine.publicKey);
console.log("outisde function2 collectionMintPK", collectionMint.publicKey)

interface Metadata {
  name: string
  symbol: string
  description: string
  image: string
  attributes: Array<{
    trait_type: string
    value: string
  }>
  properties: {
    files: Array<{
      uri: string
      type: string
    }>
  }
}

async function insertingItems() {
  console.log(`Step 3 -Images`)

  const nftAssets = fs
    .readdirSync("./assets")
    .filter((file) => /^\d+(png|json)$/.test(file))

  if (!nftAssets.length) {
    console.error("No assets found matching the pattern.")
    const allFiles = fs.readdirSync("./assets")
    console.log(`All files in assets: ${allFiles}`)
    return
  }

  console.log(`Found ${nftAssets.length} assets to process.`)

  let configLines = []
  let metadataMap: { [key: string]: Metadata } = {}

  console.log("Uploading images.... ")

  for (const asset of nftAssets) {
    const fileBuffer = fs.readFileSync(`./assets/${asset}`)
    const file = createGenericFile(fileBuffer, asset)

    if (asset.endsWith(".json")) {
      const metadata = JSON.parse(fileBuffer.toString())
      metadataMap[metadata.name] = metadata
      console.log(`Processed metadata for: ${metadata.name}`)
    } else {
      const [fileUri] = await umi.uploader.upload([file])
      console.log(`Uploaded asset ${asset} with URI: ${fileUri}`)

      const baseName = path.basename(asset, path.extname(asset))
      const metadata = metadataMap[baseName]

      if (!metadata) {
        console.warn(`No metadata found for asset: ${baseName}`)
        continue
      }

      metadata.image = fileUri

      if (metadata.properties && metadata.properties.files) {
        for (let file of metadata.properties.files) {
          if (file.type === "image/png") {
            file.uri = fileUri
          }
        }
      }

      const updatedMetadataUri = await umi.uploader.uploadJson(metadata)
      console.log(
        `Uploaded metadata for ${baseName} with URI: ${updatedMetadataUri}`
      )

      configLines.push({ name: metadata.name, uri: updatedMetadataUri })
    }
  }

  console.log(`Prepared ${configLines.length} config lines.`)

  if (!configLines.length) {
    console.warn("No config lines generated. Exiting.")
    return
  }

  console.log("Beginning inserting...")

  for (let i = 0; i < configLines.length; i++) {
    const configLine = configLines[i]
    const response = await addConfigLines(umi, {
      candyMachine: candyMachine.publicKey,
      index: i,
      configLines: [configLine],
    }).sendAndConfirm(umi)
    console.log(`Config line #${i + 1} added with response: ${response}`)
  }

  console.log("Insertion completed.")
  console.log("working created nft insertion on candymachine")
}

async function createCollectionNft() {
  console.log("----step 1 crateCollectionNft------")

  console.log(umi.identity.publicKey)

  const collectionJsonBuffer = fs.readFileSync("./assets/collection.json")
  const collectionJsonFile = createGenericFile(
    collectionJsonBuffer,
    "collection.json"
  )
  const collectionJson = JSON.parse(collectionJsonBuffer.toString())

  const collectionJsonUri = await umi.uploader.uploadJson(collectionJson)

  // Read and upload the collection.png file.
  const collectionPngBuffer = fs.readFileSync("./assets/collection.png")
  const collectionPngFile = createGenericFile(
    collectionPngBuffer,
    "collection.png"
  )
  const [collectionPngUri] = await umi.uploader.upload([collectionPngFile])

  collectionJson.image = collectionPngUri
  if (collectionJson.properties && collectionJson.properties.files) {
    for (let file of collectionJson.properties.files) {
      if (file.type === "image/png") {
        file.uri = collectionPngUri
      }
    }
  }
  const updatedCollectionJsonUri = await umi.uploader.uploadJson(collectionJson)

  // Parse the JSON metadata.
  const metadata = JSON.parse(collectionJsonBuffer.toString())

  console.log("uploading...")

  await createNft(umi, {
    mint: collectionMint,
    authority: umi.identity,
    symbol: metadata.symbol,
    name: metadata.name,
    uri: updatedCollectionJsonUri,
    sellerFeeBasisPoints: percentAmount(9.99, 2),
    isCollection: true,
  }).sendAndConfirm(umi)
  console.log(`Collection JSON URI: ${collectionPngUri}`)

  console.log(`✅ - Minted Collection NFT: ${collectionMint.publicKey}`)
  console.log(
    `     https://explorer.solana.com/address/${collectionMint.publicKey}?cluster=devnet`
  )
  console.log("working created collection")
}

const configLineSettings = some({
  prefixName: "My NFT Project #$ID+1$",
  nameLength: 0,
  prefixUri: "https://ipfs.io/ipfs/",
  uriLength: 43,
  isSequential: false,
})
async function generateCandyMachine() {
  try {
    const treasury = umi.identity.publicKey
    // const collectionMinting = await createCollectionNft()

    ;(
      await create(umi, {
        candyMachine,
        collectionMint: collectionMint.publicKey,
        collectionUpdateAuthority: umi.identity,
        tokenStandard: TokenStandard.ProgrammableNonFungible,
        sellerFeeBasisPoints: percentAmount(9.99, 2),
        itemsAvailable: 6,
        // maxEditionSupply: 0,
        isMutable: true,
        ruleSet: publicKey("eBJLFYPxJmMGKuFwpDWkzxZeUrad92kZRC5BJLpzyT9"),
        symbol: "GG",
        hiddenSettings: none(),
        guards: {
          botTax: some({
            lamports: {
              basisPoints: BigInt(1000), // This depends on the number of lamports you want to set
              identifier: "SOL" as "SOL",
              decimals: 9 as 9,
            },
            lastInstruction: true,
          }),
          // solPayment: some({ lamports: sol(1.5), destination: solDestination }),
          solPayment: some({
            lamports: {
              basisPoints: BigInt(1500000000), // This depends on the number of lamports you want to set
              identifier: "SOL" as "SOL",
              decimals: 9 as 9,
            },
            destination: umi.identity.publicKey,
          }),
          startDate: some({ date: "2023-03-07T16:13:00.000Z" }),
          endDate: some({ date: "2023-03-08T16:13:00.000Z" }),
        },
        creators: [
          {
            address: treasury,
            verified: true,
            percentageShare: 100,
          },
        ],

        configLineSettings,
      })
    ).sendAndConfirm(umi)

    console.log(
      `✅ - Created Candy Machine: ${candyMachine.publicKey.toString()}`
    )
    console.log(
      `     https://explorer.solana.com/address/${candyMachine.publicKey.toString()}?cluster=devnet`
    )
    console.log("working created candymachine")
  } catch (error) {
    console.error("An error occurred:", error)
  }
}
async function candy() {
  const base = generateSigner(umi)
  await createCandyGuard(umi, {
    base: base,
    authority: umi.identity.publicKey,
  }).sendAndConfirm(umi)

  console.log(`✅ - Updated Candy Machine: ${candyMachine.publicKey}`)
  //   console.log(`Transaction signature: ${tx}`);

  //   console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`);
}
async function mintNft() {
  console.log("-------step 5 inside mintNft----------")

  const candyMachinee = await fetchCandyMachine(
    umi,
    publicKey("4U6oxtWdBhJgCLAHhwW8ebLpjwDhyFXNtAJ7moPV7Pju")
  )
  console.log(candyMachinee.authority)
  console.log("-------fecthing candymachine done-----")

  // const mintAtuhot = publicKey("8m1LuiKMaTHa9z24ndC85Kpgk8kPJkaGgqPHQo8J8fUb")
  // const CandyGuardSigner = await fetchCandyGuard(
  //   umi,
  //   candyMachinee.mintAuthority
  // )
  // console.log("CandyGuard: ", CandyGuardSigner)

  const nftSigner = generateSigner(umi)
  console.log("-------After retreving x things----------")

  await transactionBuilder()
    .add(setComputeUnitLimit(umi, { units: 600_000 }))
    .add(
      mintV2(umi, {
        candyMachine: candyMachinee.publicKey,
        minter: umi.identity,
        nftMint: nftSigner,
        // payer: umi.identity,
        collectionMint: publicKey(
          "G3uZn2QccD1KsqxTiDDc9RPr1sHkWgnJ3uzvV84vXSwb"
        ),
        collectionUpdateAuthority: candyMachinee.authority,
        // candyGuard: CandyGuardSigner.publicKey,
        tokenStandard: TokenStandard.ProgrammableNonFungible,
        mintArgs: {
          solPayment: some({ destination: umi.identity.publicKey }),
        },
      })
    )
    .sendAndConfirm(umi)

  console.log(`✅ - Minted NFT: `)
  // console.log(`✅ - Minted NFT: ${nft.address.toString()}`);

  // console.log(`     https://explorer.solana.com/address/${nft.address.toString()}?cluster=devnet`);
  // console.log(`     https://explorer.solana.com/tx/${response.signature}?cluster=devnet`);
}

async function main() {
  // await createCollectionNft()
  // await generateCandyMachine()
  await insertingItems()
  // console.log("------ creating candyGuard----")
  // await candy()
  // console.log("------ before minting----")
  // await mintNft()
  // const candyMachinee = await fetchCandyMachine(
  //   umi,
  //   publicKey("4U6oxtWdBhJgCLAHhwW8ebLpjwDhyFXNtAJ7moPV7Pju")
  // )
  // console.log(candyMachinee.itemsLoaded)
}

main().catch(console.error)
