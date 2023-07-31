"use client"

import { useState } from "react"
import { Button } from "./button"
import { CandyMachine } from "@metaplex-foundation/mpl-candy-machine"
// import { PublicKey } from "@solana/web3.js"
import { JsonMetadata, fetchDigitalAsset, fetchJsonMetadata,fetchAllDigitalAssetByOwner } from "@metaplex-foundation/mpl-token-metadata"
import { PublicKey,Umi, publicKey } from "@metaplex-foundation/umi"

type ShowButtonProps = React.ComponentProps<typeof Button> & {
  candyMachine: CandyMachine
  wallet: PublicKey
  umi: Umi
}


export function ShowButton({
  className,
  wallet,
  candyMachine,
  umi,
  ...props
}: ShowButtonProps) {
  const [offChainMetadata, setOffChainMetadata] = useState<JsonMetadata[]>([{
    name: "Loading...",
    image: ""
  }])
  const [metadataVersion, setMetadataVersion] = useState(0);



  const ShowNFt = async () => {
    // only when minted
    // const digitalAsset = await fetchDigitalAsset(umi, wallet)
    // const jsonMetadata = await fetchJsonMetadata(umi, digitalAsset.metadata.uri)
    // if (offChainMetadata.findIndex((el) => el.name === jsonMetadata.name) === -1) {
    //   setOffChainMetadata((prev) => {
    //     const newOffChainMetadata = [...prev];
    //     const index = newOffChainMetadata.findIndex((el) => el.name === "Loading...");
    //     if (index !== -1) {
    //       newOffChainMetadata[index] = jsonMetadata;
    //     } else {
    //       newOffChainMetadata.push(jsonMetadata);
    //     }
    //     return newOffChainMetadata;
    //   });
    //   console.log(jsonMetadata)
    //   setMetadataVersion((prev) => prev + 1);
    // }
// 8m1LuiKMaTHa9z24ndC85Kpgk8kPJkaGgqPHQo8J8fUb
    // const nftCollection = process.env.

    const ownedNft = await fetchAllDigitalAssetByOwner(umi, wallet)
    // const owned = await fetchDigitalAsset(umi, wallet)


const ownOfCollection = ownedNft.filter(nft => 
        nft.metadata.collection.__option === 'Some' && 
        nft.metadata.collection.value.key === process.env.NEXT_PUBLIC_COLLECTION_MINT
    )
    console.log(ownOfCollection.length);
    // console.log(owned);
    
    
    
    
}
      

      return (
                                        <Button onClick={ShowNFt}>my nfts</Button>

    )
      }