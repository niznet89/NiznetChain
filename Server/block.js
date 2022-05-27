const SHA256 = require('crypto-js/sha256');

class Block {
  constructor() {
    this.nonce = 0;
    this.transactions = [];
    this.timestamp = Date.now();
    this.prevHash = null;

  }

  hash() {
    return SHA256(this.nonce + "" + this.transactions + "" + this.timestamp + "" + this.prevHash).toString()
  }

  addTransactions(transactions) {
    transactions.forEach(element => {
      this.transactions.push(element);
    });
  }
}

module.exports = Block;
