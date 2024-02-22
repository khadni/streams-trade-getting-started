const { ethers } = require("hardhat");

async function deployLogEmitter() {
  // //set log level to ignore non errors
  // ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.ERROR);

  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying the LogEmitter contract with the account:",
    deployer.address
  );

  const LogEmitter = await ethers.getContractFactory("LogEmitter");
  const logEmitter = await LogEmitter.deploy();

  console.log("--- LogEmitter deployed at:", logEmitter.address);
}

module.exports = {
  deployLogEmitter,
};
