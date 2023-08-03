
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Metaplex, keypairIdentity, bundlrStorage, toMetaplexFile, toBigNumber, CreateCandyMachineInput, DefaultCandyGuardSettings, CandyMachineItem, toDateTime, sol, TransactionBuilder, CreateCandyMachineBuilderContext } from "@metaplex-foundation/js";
import secret from './keypair.json';
import fs from 'fs';
import path from 'path';
require('dotenv').config();

const alchemyEndpoint = process.env.DEVNET_RPC_ENDPOINT || "";

if (!alchemyEndpoint) {
    throw new Error("NEXT_PUBLIC_RPC_ENDPOINT is not defined")
}
// if (!process.env.NEXT_SECRET) {
//     throw new Error("NEXT_SECRET is not defined")
// }


const SESSION_HASH = 'QNDEMO' + Math.ceil(Math.random() * 1e9);
const WALLET = Keypair.fromSecretKey(new Uint8Array(secret))
const SOLANA_CONNECTION = new Connection(alchemyEndpoint, {
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

    try {
        // Get all files in the directory
        const fileNames = fs.readdirSync(directoryPath);

        // Array to store all URIs
        const nftData: { uri: string, name: string, description: string, attributes: any[], properties: any }[] = [];

        for (const fileName of fileNames) {
            const filePath = path.join(directoryPath, fileName);

            if (path.extname(fileName) === '.png') {
                const imgBuffer = fs.readFileSync(filePath);
                const imgMetaplexFile = toMetaplexFile(imgBuffer, fileName);

                const imgUri = await METAPLEX.storage().upload(imgMetaplexFile);
                console.log(`   Image URI:`, imgUri);

                nftData.push({ uri: imgUri, name: '', description: '', attributes: [], properties: {} });
            }
            // If the file is a JSON file, read the attributes
            else if (path.extname(fileName) === '.json') {
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
    catch (error) {
        console.error(`Error uploading images: ${error}`);
        return [];
    }
}
//upload meatadata
async function uploadMetadata(data: { uri: string, name: string, description: string, attributes: any[], properties: any }) {
    console.log(`Step 2 - Uploading Metadata`);

    try {
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
        console.log('   Metadata URI:', uri);
        return uri;
    }
    catch (error) {
        console.error(`Error uploading metadata: ${error}`);
        return null
    }
}
// create collection
async function createCollectionNft(collectionMetadata: any) {
    try {
        const { nft: createCollectionNft } = await METAPLEX.nfts().create({
            name: collectionMetadata.name,
            uri: collectionMetadata.uri,
            sellerFeeBasisPoints: 0,
            symbol: collectionMetadata.symbol,
            isCollection: true,
            updateAuthority: WALLET,
        });
        console.log(`✅ - Minted Collection NFT: ${createCollectionNft.address.toString()}`);
        console.log(`     https://explorer.solana.com/address/${createCollectionNft.address.toString()}?cluster=devnet`);
    } catch (error) {
        console.error(`Error creating the colleciton NFT: ${error}`)
    }
}

//create 
async function main() {
    console.log(`Minting NFT's to wallet  ${WALLET.publicKey.toBase58()}. `);
    
    try {
        const nftData = await uploadImages("./assets");

        for (const data of nftData) {
            try {

                const metadataUri = await uploadMetadata(data)
                console.log(`Minted NFT with URI ${data.uri} and metadata URI ${metadataUri}`);
            }
            catch (error) {
                console.error(`Error uploading metadata for NFT with URI ${data.uri}: ${error}`);

            }
        }
        try {
            //Upload the collection metadata and create the collection NFT
            const collectionMetadata: any = JSON.parse(fs.readFileSync("./assets/collection.json", "utf-8"))
            await createCollectionNft(collectionMetadata)
        } catch (error) {
            console.error(`Error creating collection NFT: ${error}`);
        }
    } catch (error) {
        console.error(`Error in main fucntion: ${error}`)
    }
}
main()
