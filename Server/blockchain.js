const SHA256 = require('crypto-js/sha256');

class Blockchain {
  constructor() {
    this.blocks = [];
    this.root = null;
    this.address = {};
    this.accounts = {
      "0xeb9bfc049c9a07b6ce5e942028f5bdc14344caa0": 10,
      "0x9fb1536cf70c229c7847c33bd8b7fc3ad184ca92": 10,
      "0x49243960080b46c80a2bf4687ba1d0b89f7181db": 10
    };
  }

  addBlocks(block) {
    if (this.root === null) {
      return this.root = block;
    }
    block.prevHash = SHA256(this.blocks[this.blocks.length-1]);
    this.blocks.push(block);
  }

  blockHeight() {
    return this.blocks.length;
  }
}

module.exports = Blockchain;
