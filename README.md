# NiznetChain
A JS based PoW blockchain that allows the user to start mining (two competing miners) and send transactions in an account based model.

Tagline: "The most insecure, centralized chain in the world!" (because, well, it is)

### Setup 

1. Clone the repository locally `git clone https://github.com/niznet89/NiznetChain` from your terminal 

2. Change directory into the folder you cloned to

2. `npm install` to install the packages and dependencies 

### Starting the server 

1. `node server/index.js`

This will kick-start the mining process and Express server which will listen on port 3000 for incoming requests from the client.

### Starting the client 

1. `npx parcel client/index.html`

A server should get started (at port 1234) initiating the front-end. If you enter http://localhost:1234 (or whatever is provided) you'll see a user interface in the browser.

## How to interact with the blockchain

PRIVATE KEYS => PUBLIC ADDRESSES to test:
4653ae01c9276f3706d9bdb2958c3a6c0c10b324324ca4c6ed547b10c0fefbfa => 0xeb9bfc049c9a07b6ce5e942028f5bdc14344caa0
551b867617990d1a9915086a399da89eb60c32d1fc72b3e1f4665e4efdedb7a7 => 0x9fb1536cf70c229c7847c33bd8b7fc3ad184ca92
c5422ed605cca3267063e56e93ac073397568c9aa27e2fb5fd64a838d0ec70ea => 0x49243960080b46c80a2bf4687ba1d0b89f7181db

Once the server is started the miner will begin mining blocks. The miner gets a reward of 5 Niznet Coins for securing the network (it's a large responsibility, hence why we only chose one node; what could go wrong?) 
which you'll be able to see increment by pressing the 'Get Account Balances' button. 

If you would like to send a transaction, input the desired public address (which can be gathered above or from the browser, after hitting 'Get Account Balances'), private key & desired amount. 
A transaction won't be included if there isn't enough available funds to meet the transfer. 
