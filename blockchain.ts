import type { Block } from "./types";
import { getShortHash, hash, isHashProofed } from "./utils";

export class Blockchain {
  private _chain: Block[] = [];
  private _difficult = 4;
  private _debbuger = false;
  private _debbugerMineFail = false;

  constructor(
    difficult: number = 4,
    debbuger: boolean = false,
    debbugerMineFaile: boolean = false
  ) {
    if (difficult > 64) throw new Error("The max difficult level is 64.");

    this._difficult = difficult;
    this._debbuger = debbuger;
    this._debbugerMineFail = debbugerMineFaile;
    this._chain.push(this.createGenesis());
  }

  get chain() {
    return this._chain;
  }

  private createGenesis(): Block {
    const body: Block["body"] = {
      id: 0,
      timestamp: Number(new Date()),
      data: "Genesis Block",
      previousHash: "",
    };

    const header: Block["header"] = {
      nonce: 0,
      hash: hash(JSON.stringify(body)),
    };

    if (this._debbuger)
      console.log(`[Debbuger] Genesis block created successfully`);

    return { body, header };
  }

  private getLastBlockBody(): Block["body"] {
    return this._chain.at(-1)?.body as Block["body"];
  }

  private getPreviousBlockHash(): string {
    return this._chain.at(-1)?.header.hash as string;
  }

  mine(block: Block["body"]) {
    let nonce = 0;
    const startTime = Number(new Date());

    if (this._debbuger) console.log(`[Debbuger] Mining block #${block.id}`);
    while (true) {
      const blockHash = hash(JSON.stringify(block));
      const proofingHash = hash(blockHash + nonce);
      const shortHash = getShortHash(blockHash);

      if (isHashProofed(proofingHash, this._difficult)) {
        const endTime = Number(new Date());
        const secondsMineTime = (endTime - startTime) / 1000; // Time in seconds

        if (this._debbuger)
          console.log(
            `[Debbuger] The block #${block.id} been mined in ${secondsMineTime} seconds, with ${nonce} attempts.`
          );

        return {
          minedBlock: {
            body: { ...block },
            header: { nonce, hash: blockHash },
          },
          minedHash: proofingHash,
          shortHash,
          secondsMineTime,
        };
      }

      if (this._debbugerMineFail)
        console.log(
          `[Debbuger] Fail mine block #${block.id} with nonce ${nonce} - ${shortHash}`
        );
      nonce++;
    }
  }

  createBlock(data: any) {
    const lastBlockBody = this.getLastBlockBody();

    const newBlock: Block["body"] = {
      id: lastBlockBody.id + 1,
      timestamp: Number(new Date()),
      data,
      previousHash: this.getPreviousBlockHash(),
    };

    if (this._debbuger)
      console.log(`[Debbuger] Block #${newBlock.id} created successfully.`);
    return newBlock;
  }

  verifyBlock(block: Block) {
    if (block.body.previousHash !== this.getPreviousBlockHash()) {
      console.error(
        `Block ${block.body.id} is invalid because previousHash don\'t match.`
      );
      return;
    }

    if (
      !isHashProofed(
        hash(block.header.hash + block.header.nonce),
        this._difficult
      )
    ) {
      console.error(
        `Block ${block.body.id} is invalid because don\'t proofed the work with nonce ${block.header.nonce}.`
      );
      return;
    }

    if (this._debbuger)
      console.log(
        `[Debbuger] The block #${block.body.id} was verified successfully.`
      );
    return true;
  }

  pushBlock(block: Block) {
    if (this.verifyBlock(block)) this._chain.push(block);

    if (this._debbuger)
      console.log(
        `[Debbuger] Block #${block.body.id} pushed successfully in chain.`
      );
    return this._chain;
  }
}
