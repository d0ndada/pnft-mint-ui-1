import { create, mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine"
import {
  TokenStandard,
  createNft,
} from "@metaplex-foundation/mpl-token-metadata"
import { generateSigner, percentAmount } from "@metaplex-foundation/umi"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"

// Use the RPC endpoint of your choice.
const umi = createUmi("http://127.0.0.1:8899").use(mplCandyMachine())

// Create the Collection NFT.
const collectionUpdateAuthority = generateSigner(umi)
const collectionMint = generateSigner(umi)
await createNft(umi, {
  mint: collectionMint,
  authority: collectionUpdateAuthority,
  name: "My Collection NFT",
  uri: "https://example.com/path/to/some/json/metadata.json",
  sellerFeeBasisPoints: percentAmount(9.99, 2), // 9.99%
  isCollection: true,
}).sendAndConfirm(umi)

// Pass the collection address and its authority in the settings.
const candyMachineSettings = {
  collectionMint: collectionMint.publicKey,
  collectionUpdateAuthority,
  itemsAvailable: 500,
}
// Create the Candy Machine.
const candyMachine = generateSigner(umi)
await create(umi, {
  candyMachine,
  collectionMint: collectionMint.publicKey,
  collectionUpdateAuthority,
  tokenStandard: TokenStandard.NonFungible,
  sellerFeeBasisPoints: percentAmount(9.99, 2), // 9.99%
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
