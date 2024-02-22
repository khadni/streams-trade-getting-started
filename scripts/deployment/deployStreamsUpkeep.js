const { ethers } = require("hardhat");
const { networkConfig } = require("../../helper-hardhat-config");

async function deployStreamsUpkeep() {
  // // Set log level to ignore non-errors
  // ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.ERROR);

  const networkId = await ethers.provider.getNetwork().then((network) => network.chainId);
  const config = networkConfig[networkId];

  if (!config) {
    throw new Error(`No config found for network id ${networkId}`);
  }

  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying the StreamsUpkeep contract with the account:",
    deployer.address
  );

  const StreamsUpkeep = await ethers.getContractFactory("StreamsUpkeep");
  const streamsUpkeep = await StreamsUpkeep.deploy(
    config.verifierProxyAddress, 
    config.linkToken, 
    config.automationRegistrarAddress
  );

  console.log("--- StreamsUpkeep deployed at:", streamsUpkeep.address);
}

module.exports = {
  deployStreamsUpkeep,
};
