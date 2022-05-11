const Block = require("./block");
const Blockchain = require("./blockchain");
const TARGET_DIFFICULTY = BigInt("0x00000" + "F".repeat(59));
const fs = require('fs');
const miner1 = require("./miner1.js");
const miner2 = require("./miner2.js");
const { mempool } = require("./transactions.js")

let blockchain = new Blockchain();


// Kick start mining process once index.js is started
mine();

function mine() {

  let transactions = [];
  let mining = true;


  const minerOne = new Promise((resolve, reject) => {
    resolve(miner1);
  });

  const minerTwo = new Promise((resolve, reject) => {
    resolve(miner2);
  });
  console.log("one", minerOne, "two", minerTwo);

  Promise.race([minerOne, minerTwo]).then((value) => {
    console.log(value);
    blockchain.addBlocks(value);
    console.log(`Mined block #${blockchain.blockHeight()} with a hash of ${value.hash()} at nonce ${value.nonce}`);

    const content = JSON.stringify(blockchain);
    console.log(content);
    fs.writeFile('./db.json', content, err => {
      if (err) {
        console.error(err);
      }
      console.log("file written successfully");
  });

  });

function addToAccount(address, amount) {

  if (blockchain[address]) {
    return blockchain[address] += amount
  } else {
    return blockchain[address] = amount;
  }
}

  setTimeout(mine, 1000);
}
