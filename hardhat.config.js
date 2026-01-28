require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { PRIVATE_KEY, BASE_SEPOLIA_RPC_URL, BASE_MAINNET_RPC_URL } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    baseSepolia: {
      url: BASE_SEPOLIA_RPC_URL || "",
      chainId: 84532,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    },
    base: {
      url: BASE_MAINNET_RPC_URL || "",
      chainId: 8453,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    }
  }
};
