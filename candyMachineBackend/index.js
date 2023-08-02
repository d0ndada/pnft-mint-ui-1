import { create, mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine"
import {
  TokenStandard,
  createNft,
} from "@metaplex-foundation/mpl-token-metadata"
import { generateSigner, percentAmount, some } from "@metaplex-foundation/umi"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"

// initialize umi

const umi = createUmi(
  "https://solana-devnet.g.alchemy.com/v2/8y5XaD-EI4DKbwLDBU4ywF3EnsCoS3kZ"
).use(mplCandyMachine())

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
const candyMachine = generateSigner(umi)
await create(umi, {
  candyMachine,
  collectionMint: collectionMint.publicKey,
  collectionUpdateAuthority,
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
  configLineSettings: some({
    prefixName: "",
    nameLength: 32,
    prefixUri: "",
    uriLength: 200,
    isSequential: false,
  }),
}).sendAndConfirm(umi)
