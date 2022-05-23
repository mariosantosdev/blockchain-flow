import { Blockchain } from "./blockchain";

const difficult = Number(process.argv[2]) || 4;
const blockCounts = Number(process.argv[3]) || 2;
const debbuger = Boolean(process.argv[4] === "true");
const debbugerMineFail = Boolean(process.argv[5] === "true");

const blockchain = new Blockchain(difficult, debbuger, debbugerMineFail);
let chain = blockchain.chain;

console.time("[Debbuger] The Mining duration");
for (let i = 0; i < blockCounts; i++) {
  const block = blockchain.createBlock(`Block ${i + 1}`);
  const mineBlockInfo = blockchain.mine(block);
  chain = blockchain.pushBlock(mineBlockInfo.minedBlock);
}
console.timeEnd("[Debbuger] The Mining duration");

console.log("[Debbuger] Your generated chain is:\n");
console.log(chain);
