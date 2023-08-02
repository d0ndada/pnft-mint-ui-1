
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Metaplex, keypairIdentity, bundlrStorage, toMetaplexFile, toBigNumber, CreateCandyMachineInput, DefaultCandyGuardSettings, CandyMachineItem, toDateTime, sol, TransactionBuilder, CreateCandyMachineBuilderContext } from "@metaplex-foundation/js";
import secret from './keypair.json';


if (!process.env.NEXT_PUBLIC_RPC_ENDPOINT) {
    throw new Error("NEXT_PUBLIC_RPC_ENDPOINT is not defined")
}
if (!process.env.NEXT_SECRET) {
    throw new Error("NEXT_SECRET is not defined")
}

const WALLET = Keypair.fromSecretKey(new Uint8Array(secret))

const SESSION_HASH = 'QNDEMO' + Math.ceil(Math.random() * 1e9);
const SOLANA_CONNECTION = new Connection(process.env.NEXT_PUBLIC_RPC_ENDPOINT, {
    commitment: "finalized", httpHeaders: {"x-session-hash": SESSION_HASH}
})

  