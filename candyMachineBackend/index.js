import {
  create,
  createCandyMachineV2,
  mplCandyMachine,
} from "@metaplex-foundation/mpl-candy-machine"
import {
  TokenStandard,
  createNft,
} from "@metaplex-foundation/mpl-token-metadata"
import { dateTime, generateSigner, percentAmount, sol, some } from "@metaplex-foundation/umi"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { group } from "console"

// initialize umi
const umi = createUmi(
  "https://solana-devnet.g.alchemy.com/v2/8y5XaD-EI4DKbwLDBU4ywF3EnsCoS3kZ"
).use(mplCandyMachine())

// const myCustomAuthority = generateSigner(umi)
// const candyMachineSettings = {
//   authority: myCustomAuthority,
// }

// Create the collection
const collectionUpdateAuthority = generateSigner(umi)
const collectionMint = generateSigner(umi)
await createNft(umi, {
  mint: collectionMint,
  authority: collectionUpdateAuthority,
  name: "Sol Juice NFT",
  uri: "",
  sellerFeBasisPoints: percentAmount(9.99, 2),
  isCollection: true,
}).sendAndConfirm(umi)

// Create the Candy machine

const candyMachineSettings = {
  hiddenSettings: none(),
  configLineSettings: some({
    prefixName: "My NFT Project #$ID+1$",
    namelength: 0,
    prefixUri: "https://arweave.net/",
    uriLength: 43,
    isSequential: false,
  }),
}

const candyMachine = generateSigner(umi)
await createCandyMachineV2({
  candyMachine,
  collectionMint: collectionMint.publicKey,
  collectionUpdateAuthority: umi.identity,
  TokenStandard: TokenStandard.ProgrammableNonFungible,
  sellerFeBasisPoints: percentAmount(9.99, 2),
  itemsAvailable: 5000,
  creators: [
    {
      address: umi.identity.publicKey,
      verified: true,
      percentageShare: 100,
    },
  ],
  candyMachineSettings,
}).sendAndConfirm(umi)


groups = () => {
    guards: {
        botTax: some({lamports: sol(0.001), lastInstruction: true}),
    },
    groups: [ 
        {
            label: "early",
            guards: {
                solPayment: some({ lamports: sol(0.01), destination: treasury }),
                startDate: some({ date: dateTime("2023-01-20T18:00:00Z") }),
                allowList: some({ merkleRoot: fica }),// fixa
                endDate: some({ date: dateTime("2024-10-20T19:00:00Z") }),
                mintLimit: some({id:1,limit:2}),
            },
        },
        {
            label: "public",
            guards: {
                solPayment: some({ lamports: sol(0.03), destination: treasury }),
                startDate: some({ date: dateTime("2023-01-20T18:00:00Z") }),
                // endDate: some({ date: dateTime("2024-10-20T19:00:00Z") }),
                mintLimit: some({id:2,limit:4}),
            }
        }

    ]
}