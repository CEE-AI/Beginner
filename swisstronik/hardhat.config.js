require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
const PRIVATE_KEY = "61d94057e0d98e5edca23ae6d03c1e66cc98a12d4209213c97e443bb7d6d918c"

module.exports = {
  solidity: "0.8.19",
  networks: {
    swisstronik: {
      url: "https://json-rpc.testnet.swisstronik.com/", //URL of the RPC node for Swisstronik.
      accounts: [PRIVATE_KEY],
    },
  },
};