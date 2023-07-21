"use client"

import { useState } from "react"
import { Button } from "./button"
import { CandyMachine } from "@metaplex-foundation/mpl-candy-machine"
// import { PublicKey } from "@solana/web3.js"
import { JsonMetadata, fetchDigitalAsset, fetchJsonMetadata } from "@metaplex-foundation/mpl-token-metadata"
import { PublicKey,Umi } from "@metaplex-foundation/umi"
let Metaplex

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
    const digitalAsset = await fetchDigitalAsset(umi, wallet)
    const jsonMetadata = await fetchJsonMetadata(umi, digitalAsset.metadata.uri)
    if (offChainMetadata.findIndex((el) => el.name === jsonMetadata.name) === -1) {
      setOffChainMetadata((prev) => {
        const newOffChainMetadata = [...prev];
        const index = newOffChainMetadata.findIndex((el) => el.name === "Loading...");
        if (index !== -1) {
          newOffChainMetadata[index] = jsonMetadata;
        } else {
          newOffChainMetadata.push(jsonMetadata);
        }
        return newOffChainMetadata;
      });
      console.log(jsonMetadata)
      setMetadataVersion((prev) => prev + 1);
    }
}
      

      return (
                                        <button onClick={ShowNFt}>my nfts</button>

    )
      }