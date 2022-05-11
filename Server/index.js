const Block = require("./block");
const Blockchain = require("./blockchain");
const TARGET_DIFFICULTY = BigInt("0x00000" + "F".repeat(59));
const fs = require('fs');
const miner1 = require("./miner1.js");
const miner2 = require("./miner2.js");
const { mempool, clearMempool } = require("./transactions.js")

let blockchain = new Blockchain();

const accounts = blockchain.accounts;

const privateKeys = ["4653ae01c9276f3706d9bdb2958c3a6c0c10b324324ca4c6ed547b10c0fefbfa", "551b867617990d1a9915086a399da89eb60c32d1fc72b3e1f4665e4efdedb7a7", "c5422ed605cca3267063e56e93ac073397568c9aa27e2fb5fd64a838d0ec70ea"]


// Kick start mining process once index.js is started
mine();

function mine() {

  let transactions = mineMempool();
  let mining = true;


  const minerOne = new Promise((resolve, reject) => {
    resolve(miner1(transactions));
  });

  const minerTwo = new Promise((resolve, reject) => {
    resolve(miner2(transactions));
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

function mineMempool() {
  let mempoolArray = mempool;
  const validatedMempool = mempoolArray.filter(x => x.amount <= blockchain.accounts[x.sender]);
  clearMempool();
  return validatedMempool;

}

  setTimeout(mine, 1000);
}
