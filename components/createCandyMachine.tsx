// import { useWallet } from "@solana/wallet-adapter-react";
import { useCandyMachine } from "@/hooks/useCandymachine";
import { useUmi } from "@/hooks/useUmi";
import { TokenStandard, createNft } from "@metaplex-foundation/mpl-token-metadata";
import { generateSigner, percentAmount, some } from "@metaplex-foundation/umi";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { create, createCandyMachineV2, mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";

export function MyComponent() {
    //   const wallet = useWallet(); 
    const umi = useUmi()
    // const { candyMachine, candyGuard, fetchCM } = useCandyMachine(umi)
    // const { connection } = useConnection()
    // const wallet = useWallet()
    const createCollectionNft = async () => {
        const configLineSettings =  some({
        prefixName: "My NFT Project #$ID+1$",
            nameLength: 0,
            prefixUri: "https://arweave.net/",
            uriLength: 43,
            isSequential: false,
        })
        const candyMachine = generateSigner(umi);
        const collectionMint = generateSigner(umi)
        const collectionUpdateAuthority = generateSigner(umi);
        if (umi.identity.publicKey) {
    console.log(umi.identity.publicKey);
          console.log(umi.identity.publicKey);
    
    const nft = await createNft(umi, {
        mint: collectionMint,
        authority: collectionUpdateAuthority,
        name: "QuickNode Demo NFT Collection",
        uri: "ddd",
        sellerFeeBasisPoints: percentAmount(9.99,2),
        isCollection: true,
        // tokenStandard: TokenStandard.ProgrammableNonFungible,
      }).sendAndConfirm(umi)

      console.log(`✅ - Minted Collection NFT: ${nft}`);
      console.log(`     https://explorer.solana.com/address/${candyMachine.toString()}?cluster=devnet`);
       
      }

      const cn = (await create(umi,
          {
              candyMachine,
              collectionMint: collectionMint.publicKey,
              collectionUpdateAuthority,
              tokenStandard: TokenStandard.ProgrammableNonFungible,
              sellerFeeBasisPoints: percentAmount(9.99, 2),
              itemsAvailable: 500,
              maxEditionSupply: 0,
              isMutable: true,
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
  

  return (
    <div>
      
      <button onClick={createCollectionNft}>Create Collection NFT</button>
    </div>
  );
}
