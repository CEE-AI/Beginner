require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
const PRIVATE_KEY = ""
module.exports = {
  solidity: "0.8.19",
  networks: {
    swisstronik: {
      url: "https://json-rpc.testnet.swisstronik.com/", //URL of the RPC node for Swisstronik.
      accounts: [PRIVATE_KEY],
    },
  },
};