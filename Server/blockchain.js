const SHA256 = require('crypto-js/sha256');

class Blockchain {
  constructor() {
    this.blocks = [];
    this.root = null;
    this.address = {}
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
