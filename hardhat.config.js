require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("./tasks")

const COMPILER_SETTINGS = {
  optimizer: {
    enabled: true,
    runs: 1000000,
  },
  metadata: {
    bytecodeHash: "none",
  },
};

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.16",
        settings: COMPILER_SETTINGS,
      },
    ],
  },
  networks: {
    arbitrumsepolia: {
      url: process.env.ARBITRUM_SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 421614,
    },
  },
  paths: {
    sources: "./contracts",
    cache: "./build/cache",
    artifacts: "./build/artifacts",
  },
};
