
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Metaplex, keypairIdentity, bundlrStorage, toMetaplexFile, toBigNumber, CreateCandyMachineInput, DefaultCandyGuardSettings, CandyMachineItem, toDateTime, sol, TransactionBuilder, CreateCandyMachineBuilderContext } from "@metaplex-foundation/js";


if (!process.env.NEXT_PUBLIC_RPC_ENDPOINT) {
    throw new Error("NEXT_PUBLIC_RPC_ENDPOINT is not defined")
}

const SESSION_HASH = 'QNDEMO' + Math.ceil(Math.random() * 1e9);
const SOLANA_CONNECTION = new Connection(process.env.NEXT_PUBLIC_RPC_ENDPOINT, {
    
})
  