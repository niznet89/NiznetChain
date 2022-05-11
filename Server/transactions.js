const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;
const secp = require('@noble/secp256k1');

// localhost can have cross origin errors
// depending on the browser you use!
app.use(cors());
app.use(express.json());

// Defining all the private keys for the project
let privateKey1 = secp.utils.randomPrivateKey();
let privateKey2 = secp.utils.randomPrivateKey();
let privateKey3 = secp.utils.randomPrivateKey();
privateKey1 = Buffer.from(privateKey1).toString('hex');
privateKey2 = Buffer.from(privateKey2).toString('hex');
privateKey3 = Buffer.from(privateKey3).toString('hex');

let privateArray = [privateKey1, privateKey2, privateKey3];
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
    console.log(Buffer.from(sendingPrivateKey).toString('hex'));
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

module.exports = { mempool, clearMempool };
