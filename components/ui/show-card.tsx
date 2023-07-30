"use client"

import { useCallback, useEffect, useState } from "react"
import {
  DefaultGuardSet,
  fetchMintCounterFromSeeds,
} from "@metaplex-foundation/mpl-candy-machine"
import {
  DigitalAsset,
  safeFetchMetadata,
} from "@metaplex-foundation/mpl-token-metadata"
import { SPL_SYSTEM_PROGRAM_ID } from "@metaplex-foundation/mpl-toolbox"
import { SolAmount, none, publicKey, unwrapOption } from "@metaplex-foundation/umi"
import { toWeb3JsPublicKey } from "@metaplex-foundation/umi-web3js-adapters"
import {
  TOKEN_2022_PROGRAM_ID,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import { Calculator } from "lucide-react"

import { cn, getRemainingTime, mergeGuards } from "@/lib/utils"
import { useCandyMachine } from "@/hooks/useCandymachine"
import { useUmi } from "@/hooks/useUmi"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


// import { useToast } from "../toast/use-toast"
import { ShowButton } from "./show-button"


export function ShowCard() {
    // const { toast } = useToast()
    const umi = useUmi()
    const { candyMachine, candyGuard, fetchCM } = useCandyMachine(umi)
    const { connection } = useConnection()
    const wallet = useWallet()
  // const [mintsCreated, setMintsCreated] = useState<PublicKey[]>([publicKey("11111111111111111111111111111111")]);
        return (
            <>
                <ShowButton candyMachine={candyMachine} wallet={umi?.identity.publicKey} umi={umi} />
            </>
        )
}