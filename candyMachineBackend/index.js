import { create } from "@metaplex-foundation/mpl-candy-machine"
import {
  TokenStandard,
  createNft,
} from "@metaplex-foundation/mpl-token-metadata"
import { generateSigner, percentAmount } from "@metaplex-foundation/umi"

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
