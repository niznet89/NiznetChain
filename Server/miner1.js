const Block = require("./block");
const Blockchain = require("./blockchain");
const TARGET_DIFFICULTY = BigInt("0x0000" + "F".repeat(60));

function mineOne() {
  let block = new Block();

  while(BigInt('0x' + block.hash()) >= TARGET_DIFFICULTY) {
    //console.log(block.hash());
    block.nonce++;
}
return block;
}


module.exports = mineOne();
