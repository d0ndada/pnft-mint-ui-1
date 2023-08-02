
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Metaplex, keypairIdentity, bundlrStorage, toMetaplexFile, toBigNumber, CreateCandyMachineInput, DefaultCandyGuardSettings, CandyMachineItem, toDateTime, sol, TransactionBuilder, CreateCandyMachineBuilderContext } from "@metaplex-foundation/js";
import secret from './keypair.json';
import fs from 'fs';
import path from 'path';

// if (!process.env.NEXT_PUBLIC_RPC_ENDPOINT) {
//     throw new Error("NEXT_PUBLIC_RPC_ENDPOINT is not defined")
// }
// if (!process.env.NEXT_SECRET) {
//     throw new Error("NEXT_SECRET is not defined")
// }
const tpc = "https://solana-devnet.g.alchemy.com/v2/8y5XaD-EI4DKbwLDBU4ywF3EnsCoS3kZ"

const SESSION_HASH = 'QNDEMO' + Math.ceil(Math.random() * 1e9);
const WALLET = Keypair.fromSecretKey(new Uint8Array(secret))
const SOLANA_CONNECTION = new Connection(tpc, {
    commitment: "finalized", httpHeaders: {"x-session-hash": SESSION_HASH}
})

//upload to arwawe 
const METAPLEX = Metaplex.make(SOLANA_CONNECTION).use(keypairIdentity(WALLET)).use(bundlrStorage({
    address: 'https://devnet.bundlr.network',
        providerUrl: process.env.NEXT_PUBLIC_RPC_ENDPOINT,
        timeout: 60000,
}))

// create an config
const CONFIG = {
    creators: [
        {address: WALLET.publicKey, share: 100}
    ]
}
// upload image
async function uploadImages(directoryPath: string): Promise<{ uri: string, name: string, description: string, attributes: any[], properties: any }[]> {
  console.log(`Step 1 - Uploading Images`);

  // Get all files in the directory
  const fileNames = fs.readdirSync(directoryPath);

  // Array to store all URIs
  const nftData: { uri: string, name: string, description: string, attributes: any[], properties: any }[] = [];

  for (const fileName of fileNames) {
    const filePath = path.join(directoryPath, fileName);

    // If the file is a JSON file, read the attributes
  if (path.extname(fileName) === '.json') {
  const jsonContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // Find the corresponding entry in nftData and add the attributes
  for (const data of nftData) {
    if (data.uri.includes(path.basename(fileName, '.json'))) {
      data.name = jsonContent.name;
      data.description = jsonContent.description;
      data.attributes = jsonContent.attributes;
      data.properties = jsonContent.properties;
      break;
    }
  }
}

  }

  return nftData;
}
//upload meatadata
async function uploadMetadata(data: { uri: string, name: string, description: string, attributes: any[], properties: any }) {
    console.log(`Step 2 - Uploading Metadata`);

    const { uri } = await METAPLEX
    .nfts()
    .uploadMetadata({
        name: data.name,
        description: data.description,
        image: data.uri,
        attributes: data.attributes,
        properties: {
            files: [
                {
                    type: data.properties.files[0].type,
                    uri: data.uri,
                },
            ]
        }
    });
    console.log('   Metadata URI:',uri);
    return uri;  
}
//create 
async function main() {
    console.log(`Minting NFT's to wallet  ${WALLET.publicKey.toBase58()}. `);
    
    const nftData = await uploadImages("./assets");

    for (const data of nftData) {

        const metadataUri = await uploadMetadata(data)
        console.log(`Minted NFT with URI ${data.uri} and metadata URI ${metadataUri}`);

        
    }
    
}
main()
