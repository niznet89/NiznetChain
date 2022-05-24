const Block = require("./block");
const Blockchain = require("./blockchain");
const TARGET_DIFFICULTY = BigInt("0x00000" + "F".repeat(59));
const fs = require('fs');
const { mineOne } = require("./miner1.js");
const { mineTwo } = require("./miner2.js");
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const secp = require('@noble/secp256k1');

// localhost can have cross origin errors
// depending on the browser you use!
app.use(cors());
app.use(express.json());

let blockchain = new Blockchain();

const accounts = blockchain.accounts;

const privateKeys = ["4653ae01c9276f3706d9bdb2958c3a6c0c10b324324ca4c6ed547b10c0fefbfa", "551b867617990d1a9915086a399da89eb60c32d1fc72b3e1f4665e4efdedb7a7", "c5422ed605cca3267063e56e93ac073397568c9aa27e2fb5fd64a838d0ec70ea"]

console.log(blockchain.accounts);

let mempool = []

// Kick start mining process once index.js is started
mine();


function mine() {


// Listen to front-end for requests for balance & changes to state (account balance)

  app.get('/balance', (req, res) => {
    const {address} = req.params;
    const accounts = blockchain.accounts || 0;
    res.send({ accounts });
  });

  app.post('/send', (req, res) => {
    const {sender, recipient, amount} = req.body;
    (async () => {
      let sendingPrivateKey = secp.getPublicKey(sender);
      let messageHash = await secp.utils.sha256(amount);
      let signature = await secp.sign(messageHash, sender);
      const isValid = secp.verify(signature, messageHash, sendingPrivateKey);
      // Convert Uint8 array to Public Address
      publicKey = Buffer.from(sendingPrivateKey).toString('hex');
      publicKey = '0x' + publicKey.slice(publicKey.length - 40);
      console.log(isValid);
      if (isValid) {
        mempool.push({sender: publicKey, recipient: recipient, amount: amount});
      };
    })();
  });

  let minedMempool = mineMempool(mempool);

  console.log(minedMempool);


  const minerOne = new Promise((resolve, reject) => {
    resolve(mineOne(minedMempool));
  });

  const minerTwo = new Promise((resolve, reject) => {
    resolve(mineTwo(minedMempool));
  });
  //console.log("one", minerOne, "two", minerTwo);

  Promise.race([minerTwo, minerOne]).then((value) => {
    console.log("THIS BLOCK ", value);
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

  function mineMempool(mempoolArray) {
    console.log(mempoolArray[0]);
    const validatedMempool = mempoolArray.filter(x => parseInt(x.amount) <= blockchain.accounts[x.sender]);
    return validatedMempool;

  }
  // Clear the mempool
  mempool = [];

  setTimeout(mine, 1000);
}


////////////

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
