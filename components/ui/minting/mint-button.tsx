"use client"

import { useEffect, useState } from "react"
import {
  CandyGuard,
  CandyMachine,
  DefaultGuardSet,
  DefaultGuardSetMintArgs,
  fetchCandyMachine,
  fetchMintCounterFromSeeds,
  getMerkleProof,
  mintV2,
  route,
} from "@metaplex-foundation/mpl-candy-machine"
import {
  DigitalAsset,
  TokenStandard,
  fetchAllDigitalAssetByOwner,
  fetchDigitalAsset,
} from "@metaplex-foundation/mpl-token-metadata"
import { setComputeUnitLimit } from "@metaplex-foundation/mpl-toolbox"
import {
  KeypairSigner,
  PublicKey,
  Transaction,
  TransactionBuilder,
  generateSigner,
  none,
  some,
  transactionBuilder,
  unwrapOption,
} from "@metaplex-foundation/umi"
import { base58 } from "@metaplex-foundation/umi/serializers"

import { getAllowListByGuard } from "@/lib/mintsettings"
import { useUmi } from "@/hooks/useUmi"
import { Button } from "@/components/ui/button"

import { useToast } from "../toast/use-toast"
import { toWeb3JsTransaction } from "@metaplex-foundation/umi-web3js-adapters"
import { getExplorerUrl } from "@/lib/utils"
import { ToastAction } from "@radix-ui/react-toast"

type MintButtonProps = React.ComponentProps<typeof Button> & {
  group?: string
  candyMachine: CandyMachine
  candyGuard: CandyGuard<DefaultGuardSet>
  guardToUse: DefaultGuardSet
  thirdPartySigner?: KeypairSigner
  nftGateMint?: PublicKey
  onMintCallback?: (mint?: DigitalAsset, signature?: string) => void
  setMessageCallback?: (message?: string) => void
  setDisabledCallback?: (disabled?: boolean) => void
  mintLimit?: number,
  setCountMinted: any
}

export function MintButton({
  className,
  group,
  candyMachine,
  candyGuard,
  guardToUse,
  thirdPartySigner,
  onMintCallback,
  nftGateMint,
  setDisabledCallback,
  setMessageCallback,
  mintLimit,
  setCountMinted,
  ...props
}: MintButtonProps) {
  const { toast } = useToast()
  const umi = useUmi()
  const wallet = umi?.identity.publicKey
  const [loading, setLoading] = useState(false)
  const [mintAmount, setMintAmount] = useState(1)
  const [mintedByYou, setMintedByYou] = useState(0)
  
  useEffect(() => {
    const fetchNFTs = async () => {
    if(umi && wallet){
    const ownedNft = await fetchAllDigitalAssetByOwner(umi, wallet);

    const ownOfCollection = ownedNft.filter(
      (nft) =>
        nft.metadata.collection.__option === "Some" &&
        nft.metadata.collection.value.key === process.env.NEXT_PUBLIC_COLLECTION_MINT
    );

    console.log(ownOfCollection.length);
      setMintedByYou(ownOfCollection.length);
      // console.log(mintedByYou);
      
  };
}
   fetchNFTs();
}, [umi, wallet,mintedByYou]); // Empty dependency array means this effect runs once on mount

const mintBtnHandler = async () => {
  if (!candyMachine) {
      return
    }
    try {
      setLoading(true)

      const nftMintArr: KeypairSigner[] = [];

      let txArray: Transaction[] = [];
      let lastSignature: Uint8Array | undefined;
      const nftSigner = generateSigner(umi)

      for (let i = 0; i < mintAmount; i++) {
  
        const mintArgs: Partial<DefaultGuardSetMintArgs> = {}
        console.log(guardToUse)
        //TODO: Implement rest of guard logic NFT BURN, NFT Payment, FreezeSolPayment FreezeTokenPayment etc also consolidate this logic, very cluttered
        const solPaymentGuard = unwrapOption(
          guardToUse?.solPayment ?? none(),
          () => null
        )
        if (solPaymentGuard) {
          mintArgs.solPayment = some({
            destination: solPaymentGuard.destination,
          })
        }
        const redeemedAmountGuard = unwrapOption(
          guardToUse?.redeemedAmount ?? none(),
          () => null
        )
        if (redeemedAmountGuard) {
          const latestCandyMachine = await fetchCandyMachine(
            umi,
            candyMachine.publicKey
          ).catch((e) => {
            return null
          })
          if (latestCandyMachine) {
            const redeemedAmountValue = redeemedAmountGuard.maximum
            const itemsRedeemed = latestCandyMachine.itemsRedeemed
            if (itemsRedeemed >= redeemedAmountValue) {
              toast({
                title: "Redeemed Amount Reached",
                description: `A maximum of ${redeemedAmountValue} mints could be redeemed for this group. ${itemsRedeemed} have already been redeemed.`,
                duration: 5000,
              })
              setDisabledCallback && setDisabledCallback(true)
              break
            }
          } else {
            toast({
              title: "Error",
              description: `Failed to fetch candy machine`,
              duration: 5000,
            })
            setDisabledCallback && setDisabledCallback(true)
            return
          }
        }
        const mintLimitGuard = unwrapOption(
          guardToUse?.mintLimit ?? none(),
          () => null
        )
        if (mintLimitGuard) {
          const mitLimitCounter = await fetchMintCounterFromSeeds(umi, {
            id: mintLimitGuard.id,
            user: umi.identity.publicKey,
            candyMachine: candyMachine.publicKey,
            candyGuard: candyGuard.publicKey,
          }).catch((e) => {
            return null
          })
          if (mitLimitCounter) {
            if (mitLimitCounter.count >= mintLimitGuard.limit) {
              toast({
                title: "Mint Limit Reached",
                description: `You have reached the mint limit of ${mintLimitGuard.limit} for this NFT.`,
                duration: 5000,
              })
              setDisabledCallback && setDisabledCallback(true)
              break
            }
          }
          mintArgs.mintLimit = some({
            id: mintLimitGuard.id,
          })
        }
        const thirdPartyGuard = unwrapOption(
          guardToUse?.thirdPartySigner ?? none(),
          () => null
        )
        if (thirdPartyGuard && thirdPartySigner) {
          mintArgs.thirdParty = some({
            signer: thirdPartySigner,
          })
        }
        const nftGuard = unwrapOption(guardToUse?.nftGate ?? none(), () => null)
        if (nftGuard && nftGateMint) {
          mintArgs.nftGate = some({
            mint: nftGateMint,
          })
        }
        const tokenPayment = unwrapOption(
          guardToUse?.tokenPayment ?? none(),
          () => null
        )
        if (tokenPayment) {
          mintArgs.tokenPayment = some({
            mint: tokenPayment.mint,
            destinationAta: tokenPayment.destinationAta,
          })
        }

        const token2022Payment = unwrapOption(
          guardToUse?.token2022Payment ?? none(),
          () => null
        )
        if (token2022Payment) {
          mintArgs.token2022Payment = some({
            mint: token2022Payment.mint,
            destinationAta: token2022Payment.destinationAta,
          })
        }

        const tokenBurnGuard = unwrapOption(
          guardToUse?.tokenBurn ?? none(),
          () => null
        )
        if (tokenBurnGuard) {
          mintArgs.tokenBurn = some({
            mint: tokenBurnGuard.mint,
          })
        }

        const allowListGuard = unwrapOption(
          guardToUse?.allowList ?? none(),
          () => null
        )
        let routeBuilder: TransactionBuilder | null = null
        if (allowListGuard) {
          const allowlist = getAllowListByGuard(group)
          if (allowlist) {
            routeBuilder = route(umi, {
              candyMachine: candyMachine.publicKey,
              candyGuard: candyGuard.publicKey,
              guard: "allowList",
              group: group ? some(group) : undefined,
              routeArgs: {
                path: "proof",
                merkleRoot: allowListGuard.merkleRoot,
                merkleProof: getMerkleProof(
                  allowlist,
                  umi.identity.publicKey.toString()
                ),
              },
            })
            mintArgs.allowList = some({
              merkleRoot: allowListGuard.merkleRoot,
            })
          }
        }
        //Todo: for multimint, probably move these to their own txns
        nftMintArr.push(nftSigner);

        const tx = transactionBuilder().add(
          mintV2(umi, {
            candyMachine: candyMachine.publicKey,
            collectionMint: candyMachine.collectionMint,
            collectionUpdateAuthority: candyMachine.authority,
            nftMint: nftSigner,
            minter: umi.identity,
            candyGuard: candyGuard?.publicKey,
            mintArgs: mintArgs,
            group: group ? group : undefined,
            tokenStandard: TokenStandard.ProgrammableNonFungible,
          })
        )
          .prepend(setComputeUnitLimit(umi, { units: 800_000 }))
        
    
        if (!tx) return;
        const builtTransaction = await tx.buildWithLatestBlockhash(umi);
        const signedTransaction = await nftSigner.signTransaction(builtTransaction);

        txArray.push(signedTransaction);


   
      }
      // Batch and send all transactions together
      const signedTxs = await umi.identity.signAllTransactions(txArray);
      for (let signedTx of signedTxs) {
        await umi.rpc.sendTransaction(signedTx);
      }
      if (signedTxs) {
        setMintedByYou(prev => prev + mintAmount)
        setCountMinted((prev: number) => prev + mintAmount)
        toast({
          title: `Minted ${mintAmount} NFTs!`,
          description: `Click below to view`,
          action: (
              <a href={getExplorerUrl(nftSigner.publicKey, "address")}>
                <ToastAction altText="View NFT">View</ToastAction>
              </a>),
          duration: 5000,
        });
      
      } else {
        toast({
          title: "Mint failed!",
          description: `Something went wrong.`,
          // status: "success",
          duration: 5000,
        });
      }
   
    }catch (error) {
      toast({
          title: "Mint cancelled or  failed!",
          description: `Transaction was not completed.`,
          // status: "success",
          duration: 5000,
      });
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="flex items-center justify-end">
      <div className="relative  flex h-10 w-32 flex-row rounded-lg bg-transparent">
        <Button
          data-action="decrement"
  className="h-full w-20 cursor-pointer rounded-l border-inc-dec-border bg-inc-dec-bg text-inc-dec-text hover:scale-105 hover:bg-inc-dec-hover hover:text-inc-dec-textHover"
          onClick={() => mintAmount > 1 && setMintAmount((prev) => prev - 1)}
        >
          -
        </Button>
        <input
          type="text"
  className="text-md flex w-full cursor-default items-center rounded border-inc-dec-border bg-inc-dec-bg text-center font-semibold text-inc-dec-text hover:bg-inc-dec-hover hover:text-inc-dec-textHover md:text-base"
          name="custom-input-number"
          value={mintAmount}
          readOnly
        />
        <Button
          data-action="increment"
  className="h-full w-20 cursor-pointer rounded-r  border-inc-dec-border bg-inc-dec-bg text-inc-dec-text hover:scale-105 hover:bg-inc-dec-hover hover:text-inc-dec-textHover"
            onClick={() => {
    // if (mintLimit === undefined || mintLimit === null) {
    //   setMintAmount((prev) => prev + 1);
     if (mintAmount < Number(mintLimit) - Number(mintedByYou)) {
      setMintAmount((prev) => prev + 1);
    }
  }}
>

        
          +
        </Button>
      </div>
      <Button
        className={`${className} ml-3 bg-mintButton-bg text-mintButton-text transition-all  duration-300 ease-in-out hover:scale-105 hover:bg-mintButton-hover active:bg-mintButton-active disabled:bg-mintButton-disabled`}
        onClick={mintBtnHandler}
        {...props}
      >
        {loading ? "Minting..." : "Mint"}
      </Button>
    </div>
  )
}
