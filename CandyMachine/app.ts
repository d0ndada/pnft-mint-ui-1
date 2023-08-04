import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Metaplex, keypairIdentity, bundlrStorage, toMetaplexFile, toBigNumber, CreateCandyMachineInput, DefaultCandyGuardSettings, CandyMachineItem, toDateTime, sol, TransactionBuilder, CreateCandyMachineBuilderContext, candyMachineProgram } from "@metaplex-foundation/js";
import {

    TokenStandard,
    createNft,
 
} from "@metaplex-foundation/mpl-token-metadata"
import { addConfigLines, create, createCandyMachineV2, fetchCandyMachine, mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import { createGenericFile, createNoopSigner, createSignerFromKeypair, generateSigner, none, percentAmount, publicKey, signerIdentity, some } from "@metaplex-foundation/umi";
import fs from 'fs';
// import { nftStorage } from "@metaplex-foundation/umi-uploader-nft-storage";
import { nftStorage } from "@metaplex-foundation/umi-uploader-nft-storage";

import path from 'path';

// 'https://solana-devnet.g.alchemy.com/v2/8y5XaD-EI4DKbwLDBU4ywF3EnsCoS3kZ'

const QUICKNODE_RPC ='https://api.devnet.solana.com' ; // 👈 Replace with your QuickNode Solana Devnet HTTP Endpoint
const SESSION_HASH = 'QNDEMO'+Math.ceil(Math.random() * 1e9); // Random unique identifier for your session
const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC, { commitment: 'finalized', httpHeaders: { "x-session-hash": SESSION_HASH } });

const umi = createUmi(QUICKNODE_RPC).use(mplCandyMachine());
const keypairFIle = fs.readFileSync("./keypair.json");
const WALLET = Keypair.fromSecretKey(Buffer.from(JSON.parse(keypairFIle.toString())));


const umiKeypair = {
    publicKey: publicKey(WALLET.publicKey),
  secretKey: WALLET.secretKey
};

const signer = createSignerFromKeypair(umi,umiKeypair)
umi.use(signerIdentity(signer))


const NFT_METADATA = 'https://mfp2m2qzszjbowdjl2vofmto5aq6rtlfilkcqdtx2nskls2gnnsa.arweave.net/YV-mahmWUhdYaV6q4rJu6CHozWVC1CgOd9NkpctGa2Q'; 
const candyMachine = generateSigner(umi);
const collectionMint = generateSigner(umi)
const collectionUpdateAuthority = generateSigner(umi);
const CANDY_MACHINE_ID = 'HzU8GpE8HaZHWbXHqAZJGF2ibfDjPZVCRfYvJJ89BfYA';
const CM3 = await fetchCandyMachine(umi, candyMachine.publicKey);



async function insertingItems() {
    umi.use(nftStorage())

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
    for (let configLine of configLines) {

    
        await addConfigLines(umi, {
            candyMachine: candyMachine.publicKey,
            index: CM3.itemsLoaded,
            configLines: [
                configLine
            ]

        }).sendAndConfirm(umi)
  
    }
    console.log(`✅ - Items added to Candy Machine: ${CANDY_MACHINE_ID}`);
    console.log(`     https://explorer.solana.com/tx/${response.signature}?cluster=devnet`);
}


async function createCollectionNft() {
    console.log(umi.identity.publicKey);
    
    const nft = await createNft(umi, {
        mint: collectionMint,
        authority: collectionUpdateAuthority,
        symbol: "GG",
        name: "QuickNode Demo NFT Collection",
        uri: NFT_METADATA,
        sellerFeeBasisPoints: percentAmount(9.99,2),
        isCollection: true,
        // tokenStandard: TokenStandard.ProgrammableNonFungible,
      }).sendAndConfirm(umi)

      console.log(`✅ - Minted Collection NFT: ${collectionMint}`);
      console.log(`     https://explorer.solana.com/address/${umi.toString()}?cluster=devnet`);
}

};
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
            itemsAvailable: 500,
            maxEditionSupply: 0,
            isMutable: true,
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
    
    // const { candyMachine } = await METAPLEX.candyMachines().create(candyMachineSettings);
    console.log(`✅ - Created Candy Machine: ${candyMachine.publicKey.toString()}`);
    console.log(`     https://explorer.solana.com/address/${candyMachine.publicKey.toString()}?cluster=devnet`);
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



