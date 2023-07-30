import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import { Link } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ShowCard } from './ui/show-card';

interface MintNavProps extends React.HTMLAttributes<HTMLDivElement> {}


export function WalletNav({ className, ...props }: MintNavProps) {
  
    return (
         <div>

            <p>in development</p>
            <ShowCard/>
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