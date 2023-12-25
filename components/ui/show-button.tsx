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
    const ownedNft = await fetchAllDigitalAssetByOwner(umi, wallet)
const ownOfCollection = ownedNft.filter(nft => 
        nft.metadata.collection.__option === 'Some' && 
        nft.metadata.collection.value.key === process.env.NEXT_PUBLIC_COLLECTION_MINT
    )
    console.log(ownOfCollection)
    return ownOfCollection
  }
      

      return (
                                        <Button onClick={ShowNFt}>Stake</Button>

    )
      }