import { BinaryLike, createHash } from "crypto";

export function hash(data: BinaryLike) {
  return createHash("sha256").update(data).digest("hex");
}

export function getShortHash(blockHash: string) {
  return blockHash.slice(0, 12);
}

export function isHashProofed(hash: string, difficulty = 4) {
  const prefix = "0";
  const check = prefix.repeat(difficulty);

  return hash.startsWith(check);
}
