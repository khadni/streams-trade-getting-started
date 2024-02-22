// const { ethers } = require("hardhat");

task("emitLog", "Emits a log from the LogEmitter contract")
  .addParam("logEmitter", "The address of the deployed LogEmitter contract")
  .setAction(async (taskArgs, hre) => {
    const { logEmitter } = taskArgs;

    // Get the signer to interact with the contract
    const [signer] = await ethers.getSigners();

    // Create a contract instance with signer
    const LogEmitterContract = await hre.ethers.getContractAt("LogEmitter", logEmitter, signer);

    // Call the emitLog function
    console.log("Emitting a log...");
    const tx = await LogEmitterContract.emitLog();
    await tx.wait(); // Wait for the transaction to be mined

    console.log(`Log emitted successfully in transaction: ${tx.hash}`);
  });

module.exports = {};
