import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import { Link } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ShowCard } from './ui/show-card';
import { Button } from './ui/button';
import { TokenStandard, delegateStakingV1, fetchAllDigitalAssetByOwner } from '@metaplex-foundation/mpl-token-metadata';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useCandyMachine } from '@/hooks/useCandymachine';
import { useUmi } from '@/hooks/useUmi';
import { Umi, generateSigner } from '@metaplex-foundation/umi';

  
  
    
export function Staking() {

    return (
         <div>

            <ShowCard />
    </div>
    )
};


  
// const metaplex = new Metaplex()

// const lockBtnHandler = async () => {
//   // Lock an NFT using a utility delegate
//   await metaplex.nfts().lock({
//     nftOrSft: nft,
//     authority: {
//       __kind: "tokenDelegate",
//       type: "UtilityV1",
//       delegate: utilityDelegate,
//       owner: nftOwner.publicKey,
//     },
//   });
// };

// // Define the unlockBtnHandler function
// const unlockBtnHandler = async () => {
//   // Unlock an NFT using a utility delegate
//   await metaplex.nfts().unlock({
//     nftOrSft: nft,
//     authority: {
//       __kind: "tokenDelegate",
//       type: "UtilityV1",
//       delegate: utilityDelegate,
//       owner: nftOwner.publicKey,
//     },
//   });
// };