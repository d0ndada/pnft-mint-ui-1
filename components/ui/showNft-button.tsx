// import { useState } from "react"
// import { Button } from "./button"
// import { CandyMachine } from "@metaplex-foundation/mpl-candy-machine"


// type ShowButtonProps = React.ComponentProps<typeof Button> & {
//   candyMachine: CandyMachine
//   metaplex: Metaplex
//   publicKey: PublicKey
// }

// export function ShowButton({
//     className,
//     publicKey,
//     candyMachine,
//     metaplex,
//     ...props
// }: ShowButtonProps) {
//   const [nftImages, setNftImages] = useState<string[]>([])

//        const fetchNFTImage = async (nftUri: RequestInfo | URL) => {
//     try {
//       const response = await fetch(nftUri)
//       const metadata = await response.json()
//       console.log(metadata.image)
//       setNftImages((prevImages) => [...prevImages, metadata.image])
//     } catch (error) {
//       console.error("Failed to fetch NFT image", error)
//     }
//   }

//   //cehck my nfts
//     const CheckMyNfts = async () => {
//         if (!metaplex || !candyMachine || !publicKey) {
//             if (!candyMachine?.candyGuard)
//                 throw new Error(
//                     "This app only works with Candy Guards. Please setup your Guards through Sugar."
//                 )

//             throw new Error(
//                 "Couldn't find the Candy Machine or the connection is not defined."
//             )
//         }
//         if (!wallet.connected) {
//             try {
//                 await wallet.connect()
//             } catch (error) {
//                 console.error("failed to connect wallet:", error)
//             }
//         }

//         try {
//             //   setIsLoading(true)

//             //Button for user to se all of the mints he owns
//             const usersNFTS = await metaplex
//                 .nfts()
//                 .findAllByOwner({ owner: metaplex.identity().publicKey })
//             for (let nft of usersNFTS) {
//                 await fetchNFTImage(nft.uri)
//             }

//             console.log(usersNFTS)
//             console.log(usersNFTS[0].name)

//             // när knappen är tryckt visa ntf och lock eller unlock
//         } catch (e: any) {
//             const msg = fromTxError(e)

//             if (msg) {
//                 setFormMessage(msg.message)
//             } else {
//                 const msg = e.message || e.toString()
//                 setFormMessage(msg)
//             }
//         } finally {
//             setIsLoading(false)

//             setTimeout(() => {
//                 setFormMessage(null)
//             }, 5000)
//         }
//     }
//       return (
//                                         <button onClick={CheckMyNfts}>my nfts</button>

//     )
// }