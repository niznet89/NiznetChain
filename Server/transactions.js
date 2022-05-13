const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;
const secp = require('@noble/secp256k1');
const { blockchain } = require("./index.js");

// localhost can have cross origin errors
// depending on the browser you use!
app.use(cors());
app.use(express.json());

console.log(blockchain);


let privateArray = ["4653ae01c9276f3706d9bdb2958c3a6c0c10b324324ca4c6ed547b10c0fefbfa", "551b867617990d1a9915086a399da89eb60c32d1fc72b3e1f4665e4efdedb7a7", "c5422ed605cca3267063e56e93ac073397568c9aa27e2fb5fd64a838d0ec70ea"];
let publicArray = [];

privateArray.forEach(pk => {
  let publicKey = secp.getPublicKey(pk);
  publicKey = Buffer.from(publicKey).toString('hex');
  publicKey = '0x' + publicKey.slice(publicKey.length - 40);
  publicArray.push(publicKey);
})

let mempool = [];

function clearMempool() {
  return mempool = [];
}

const balances = {
  [publicArray[0]]: 100,
  [publicArray[1]]: 50,
  [publicArray[2]]: 75,
}

// Logging to console the available
console.log("AVAILABLE ACCOUNTS");
console.log("==================");
for (let i = 0; i < privateArray.length; i++) {
  console.log(`(${i}) ${publicArray[i]} (${balances[publicArray[i]]}) NizCoin`)
};

console.log("Private Keys");
console.log("========");
for (let i = 0; i < privateArray.length; i++) {
  console.log(`(${i}) ${privateArray[i]}`)
};

////////////

app.get('/balance', (req, res) => {
  const {address} = req.params;
  const balance = balances || 0;
  res.send({ balance });
});

app.post('/send', (req, res) => {
  const {sender, recipient, amount} = req.body;
  (async () => {
    let sendingPrivateKey = secp.getPublicKey(sender);

    let messageHash = await secp.utils.sha256(amount);
    console.log(messageHash);
    let signature = await secp.sign(messageHash, sender);
    const isValid = secp.verify(signature, messageHash, sendingPrivateKey);
    console.log(isValid);
    if (isValid) {
      mempool.push({sender: sender, recipient: recipient, amount: amount});
    };
  })();
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

module.exports = { mempool, clearMempool, publicArray };
