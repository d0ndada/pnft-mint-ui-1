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
//   metaplex: Metaplex
  wallet: PublicKey
  umi: Umi
}


export function ShowButton({
    className,
    wallet,
  candyMachine,
    umi,
    // metaplex,
    ...props
}: ShowButtonProps) {
  const [nftImages, setNftImages] = useState<JsonMetadata[]>([{
    name: "Loading...",
    image:""
  }])

       const fetchNFTImage = async (nftUri: RequestInfo | URL) => {
    try {
      const response = await fetch(nftUri)
      const metadata = await response.json()
      console.log(metadata.image)
      setNftImages((prevImages) => [...prevImages, metadata.image])
    } catch (error) {
      console.error("Failed to fetch NFT image", error)
    }
  }

  //cehck my nfts
    const CheckMyNfts = async () => {
        if ( !candyMachine || !wallet) {
            // if (!candyMachine?.candyGuard)
            //     throw new Error(
            //         "This app only works with Candy Guards. Please setup your Guards through Sugar."
            //     )

            throw new Error(
                "Couldn't find the Candy Machine or the connection is not defined."
            )
        }
        if (!wallet) {
            try {
                await wallet
            } catch (error) {
                console.error("failed to connect wallet:", error)
            }
        }

        try {
          const digitalAsset = await fetchDigitalAsset(umi, wallet)
          const JsonMetadata = await fetchJsonMetadata(umi, digitalAsset.metadata.uri)

            // när knappen är tryckt visa ntf och lock eller unlock
        } catch (e: any) {
            // const msg = fromTxError(e)

            if (wallet) {
                // setFormMessage(msg.message)
            } else {
                const msg = e.message || e.toString()
                // setFormMessage(msg)
            }
        } finally {
            // setIsLoading(false)

            setTimeout(() => {
                // setFormMessage(null)
            }, 5000)
        }
    }
      return (
                                        <button >my nfts</button>

    )
      }