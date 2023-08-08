import {
  getMerkleProof,
  getMerkleRoot,
} from "@metaplex-foundation/mpl-candy-machine"

import { allowlist } from "./allowlist"

export function computeMerkleRoot(allowlist: (string | Uint8Array)[]) {
  return getMerkleRoot(allowlist)
}

export function getValidMerkleProof(
  allowList: (string | Uint8Array)[],
  address: string | Uint8Array
) {
  return getMerkleProof(allowList, address)
}
