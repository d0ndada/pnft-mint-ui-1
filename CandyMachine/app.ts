import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Metaplex, keypairIdentity, bundlrStorage, toMetaplexFile, toBigNumber, CreateCandyMachineInput, DefaultCandyGuardSettings, CandyMachineItem, toDateTime, sol, TransactionBuilder, CreateCandyMachineBuilderContext, candyMachineProgram } from "@metaplex-foundation/js";
import {

    TokenStandard,
    createNft,
 
} from "@metaplex-foundation/mpl-token-metadata"
import { addConfigLines, create, createCandyMachineV2, fetchCandyMachine, mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { nftStorageUploader } from "@metaplex-foundation/umi-uploader-nft-storage";

import { createGenericFile, createNoopSigner, createSignerFromKeypair, generateSigner, none, percentAmount, publicKey, signerIdentity, some } from "@metaplex-foundation/umi";
import fs from 'fs';

import path from 'path';

// 'https://solana-devnet.g.alchemy.com/v2/8y5XaD-EI4DKbwLDBU4ywF3EnsCoS3kZ'

const QUICKNODE_RPC ='https://api.devnet.solana.com' ; // 👈 Replace with your QuickNode Solana Devnet HTTP Endpointconst SESSION_HASH = 'QNDEMO'+Math.ceil(Math.random() * 1e9); // Random unique identifier for your session

const keypairFIle = fs.readFileSync("./keypair.json");
const WALLET = Keypair.fromSecretKey(Buffer.from(JSON.parse(keypairFIle.toString())));


const umiKeypair = {
    publicKey: publicKey(WALLET.publicKey),
    secretKey: WALLET.secretKey
};

const umi = createUmi(QUICKNODE_RPC).use(mplCandyMachine());
const signer = createSignerFromKeypair(umi,umiKeypair)
umi.use(signerIdentity(signer)).use(nftStorageUploader({
     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDk5ZDZiOWUyNjY1ODQwNkI4YTEzODhDOTAyYTA2OGEyODVmRTBiM2YiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5MTE2MTQ3NzAzNiwibmFtZSI6InRlc3RhcGkifQ.B3ES92b39DwkxFM8mWvtPhg7vY1Yb3B1v-7ZUag7VqQ"
}))

const NFT_METADATA = 'https://mfp2m2qzszjbowdjl2vofmto5aq6rtlfilkcqdtx2nskls2gnnsa.arweave.net/YV-mahmWUhdYaV6q4rJu6CHozWVC1CgOd9NkpctGa2Q'; 
const candyMachine = generateSigner(umi);
const collectionMint = generateSigner(umi)
const collectionUpdateAuthority = generateSigner(umi);
console.log("outisde function candymachinePK", candyMachine.publicKey);
console.log("outisde function2 collectionMintPK",  collectionMint.publicKey);





async function insertingItems() {
      console.log(`Step 3 - Uploading Images`);

    // const CM3 = await fetchCandyMachine(umi, candyMachine.publicKey);
    // umi.use(nftStorage())

    //Upload the assets
    
    const nftAssets = fs.readdirSync("./assets").filter(file => /^\d+(png|json)$/.test(file));

    let configLines = [];
    
    for (const asset of nftAssets) {
        const fileBuffer = fs.readFileSync(`./assets/${asset}`)
        const file = createGenericFile(fileBuffer, asset)
        //upload json metadata
        const [fileUri] = await umi.uploader.upload([file])
        const metadata = JSON.parse(fileBuffer.toString())
        //Inserting the item into the Candy Machine
        const name = metadata.name
        const uri = fileUri;
        configLines.push({ name: name, uri: uri })
    }
        console.log("Loading...");

   for (let i = 0; i < configLines.length; i++) {
    const configLine = configLines[i];
    await addConfigLines(umi, {
        candyMachine: candyMachine.publicKey,
        index: i,
        configLines: [
            configLine
        ]
    }).sendAndConfirm(umi)
}
        console.log("Loading complete.");

    console.log(`✅ - Items added to Candy Machine: ${candyMachine}`);
    // console.log(`     https://explorer.solana.com/tx/${response.signature}?cluster=devnet`);
    console.log("working created nft insertion on candymachine")

}


async function createCollectionNft() {
    console.log("----step 1 crateCollectionNft------");
    
    console.log(umi.identity.publicKey);
    
    const collectionJsonBuffer = fs.readFileSync("./assets/collection.json")
    const collectionJsonFile = createGenericFile(collectionJsonBuffer, "collection.json")
    const collectionJson = JSON.parse(collectionJsonBuffer.toString());


        const collectionJsonUri = await umi.uploader.uploadJson(collectionJson);
    
    // Read and upload the collection.png file.
    const collectionPngBuffer = fs.readFileSync('./assets/collection.png');
    const collectionPngFile = createGenericFile(collectionPngBuffer, 'collection.png');
    const [collectionPngUri] = await umi.uploader.upload([collectionPngFile]);

    // Parse the JSON metadata.
    const metadata = JSON.parse(collectionJsonBuffer.toString());

    console.log("uploading...");
    
    
    const nft = await createNft(umi, {
        mint: collectionMint,
        authority: collectionUpdateAuthority,
        symbol: metadata.symbol,
        name: metadata.name,
        uri: "",
        sellerFeeBasisPoints: percentAmount(9.99,2),
        isCollection: true,
        
        // tokenStandard: TokenStandard.ProgrammableNonFungible,
      }).sendAndConfirm(umi)

      console.log(`✅ - Minted Collection NFT: ${nft.result}`);
    console.log(`     https://explorer.solana.com/address/${umi.toString()}?cluster=devnet`);
    console.log("working created collection")
}


const configLineSettings = some({
    
    prefixName: "My NFT Project #$ID+1$",
    nameLength: 0,
    prefixUri: "https://arweave.net/",
    uriLength: 43,
    isSequential: false,
})
async function generateCandyMachine() {
    
    

    (await createCandyMachineV2(umi,
        {
            candyMachine,
            collectionMint: collectionMint.publicKey,
            collectionUpdateAuthority,
            tokenStandard: TokenStandard.ProgrammableNonFungible,
            sellerFeeBasisPoints: percentAmount(9.99, 2),
            itemsAvailable: 6,
            maxEditionSupply: 0,
            isMutable: true,
            ruleSet: publicKey("eBJLFYPxJmMGKuFwpDWkzxZeUrad92kZRC5BJLpzyT9"),
            symbol: "GG",
            hiddenSettings: none(),
            creators: [
                {
                    address: umi.identity.publicKey,
                    verified: true,
                    percentageShare: 100,
                },
            ],

            configLineSettings, 
        })).sendAndConfirm(umi)
    
    console.log(`✅ - Created Candy Machine: ${candyMachine.publicKey.toString()}`);
    console.log(`     https://explorer.solana.com/address/${candyMachine.publicKey.toString()}?cluster=devnet`);
    console.log("working created candymachine")

}
// async function updateCandyMachine() {
//     const candyMachine = await METAPLEX
//         .candyMachines()
//         .findByAddress({ address: new PublicKey(CANDY_MACHINE_ID) });

//     const { response } = await METAPLEX.candyMachines().update({
//         candyMachine,
//         guards: {
//             startDate: { date: toDateTime("2022-10-17T16:00:00Z") },
//             mintLimit: {
//                 id: 1,
//                 limit: 2,
//             },
//             solPayment: {
//                 amount: sol(0.1),
//                 destination: METAPLEX.identity().publicKey,
//             },
//         }
//     })
    
//     console.log(`✅ - Updated Candy Machine: ${CANDY_MACHINE_ID}`);
//     console.log(`     https://explorer.solana.com/tx/${response.signature}?cluster=devnet`);
// }
// async function mintNft() {
//     const candyMachine = await METAPLEX
//         .candyMachines()
//         .findByAddress({ address: new PublicKey(CANDY_MACHINE_ID) }); 
//     let { nft, response } = await METAPLEX.candyMachines().mint({
//         candyMachine,
//         // collectionUpdateAuthority: WALLET,
//         },{commitment:'finalized'})

//     console.log(`✅ - Minted NFT: ${nft.address.toString()}`);
//     console.log(`     https://explorer.solana.com/address/${nft.address.toString()}?cluster=devnet`);
//     console.log(`     https://explorer.solana.com/tx/${response.signature}?cluster=devnet`);
// }
// createCollectionNft();
// generateCandyMachine();

// updateCandyMachine();
// addItems();
// mintNft()


async function main() {
    await createCollectionNft()
    await generateCandyMachine();
    await insertingItems();
}

main().catch(console.error)
