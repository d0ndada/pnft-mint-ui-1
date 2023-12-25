"use client"

import { useState } from "react"
import { Button } from "./button"
import { CandyMachine } from "@metaplex-foundation/mpl-candy-machine"
// import { PublicKey } from "@solana/web3.js"
import { JsonMetadata, fetchDigitalAsset, fetchJsonMetadata,fetchAllDigitalAssetByOwner, delegateStakingV1, TokenStandard, unlockV1, delegateLockedTransferV1, lockV1 } from "@metaplex-foundation/mpl-token-metadata"
import { PublicKey,Umi, createSignerFromKeypair, generateSigner, keypairIdentity, publicKey } from "@metaplex-foundation/umi"
import bs58 from 'bs58';
import { Keypair } from "@solana/web3.js"

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
 
  const owner = umi?.identity
  
const myKey = "36TrpoPz6xkpc9ubE4RFDtrXuT6LM2drenr3d7SYLQBV2XNvAoAYbeQzcb6L545g88zhJAvr5BY2juX1Mck7nqBM";
const secretKey = bs58.decode(myKey)
  const signer = Keypair.fromSecretKey(secretKey)
  
const umiKeypair = {
  publicKey: publicKey(signer.publicKey),
  secretKey: signer.secretKey,
}
  const test = createSignerFromKeypair(umi,umiKeypair)


  const ShowNFt = async () => {
    const ownedNft = await fetchAllDigitalAssetByOwner(umi, wallet)
const ownOfCollection = ownedNft.filter(nft => 
        nft.metadata.collection.__option === 'Some' && 
        nft.metadata.collection.value.key === process.env.NEXT_PUBLIC_COLLECTION_MINT
    )
    return ownOfCollection
  }
  const StakeNFTs = async () => {
    const nfts = await ShowNFt()
    console.log("avialable nft",nfts[0]);
    
        const stakingDelegate = generateSigner(umi);
        // try{
    await unlockV1(umi, {
      mint: publicKey(nfts[0]),
      authority: stakingDelegate,
      tokenStandard: TokenStandard.ProgrammableNonFungible,
    }).sendAndConfirm(umi)
    //       console.log("Unlocked")
    //     } catch (e) {
    //       console.error(e)
    // }
      await delegateStakingV1(umi, {
          mint: nfts.at(0)!.publicKey,
          tokenOwner: owner.publicKey,
          authority: owner,
          delegate: stakingDelegate.publicKey,
          tokenStandard: TokenStandard.ProgrammableNonFungible,
    }).sendAndConfirm(umi)
    
    //      await delegateLockedTransferV1(umi, {
    //       mint: nfts.at(0)!.publicKey,
    //       tokenOwner: owner.publicKey,
    //       authority: owner,
    //       delegate: stakingDelegate,
    //       tokenStandard: TokenStandard.ProgrammableNonFungible,
    // }).sendAndConfirm(umi)
    
        
const metaplex = new Metaplex()

const lockBtnHandler = async () => {
  // Lock an NFT using a utility delegate
  await metaplex.nfts().lock({
    nftOrSft: nft,
    authority: {
      __kind: "tokenDelegate",
      type: "UtilityV1",
      delegate: utilityDelegate,
      owner: nftOwner.publicKey,
    },
  });
};
      }

  return (
       
       
                                        <Button onClick={StakeNFTs}>Stake</Button>
       

    )
      }