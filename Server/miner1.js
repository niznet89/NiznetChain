const Block = require("./block");
const Blockchain = require("./blockchain");
const TARGET_DIFFICULTY = BigInt("0x0000" + "F".repeat(60));

function mineOne(transactions) {
  let block = new Block();
  console.log(block);

  block.transactions.push({sender: "", recipient: '0xeb9bfc049c9a07b6ce5e942028f5bdc14344caa0', amount: 5})
  block.addTransactions(transactions);
  while(BigInt('0x' + block.hash()) >= TARGET_DIFFICULTY) {
    //console.log(block.hash());
    block.nonce++;
}
return block;
};


module.exports = { mineOne };
