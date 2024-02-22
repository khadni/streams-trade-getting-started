// const { ethers } = require("hardhat");

task("registerUpkeep", "Registers an upkeep with Chainlink Automation")
  .addParam("streamsUpkeep", "The address of the deployed StreamsUpkeep contract")
  .addParam("logEmitter", "The address of the deployed LogEmitter contract")
  .setAction(async (taskArgs) => {
    const { streamsUpkeep, logEmitter } = taskArgs;

    // Assume the user's address (admin) is the first signer
    const [admin] = await ethers.getSigners();

    // Hardcoded values for simplicity; customize as needed
    const name = "Prog. Streams Upkeep";
    const encryptedEmail = "0x";
    const gasLimit = 500000;
    const triggerType = 1; // Log Trigger
    const checkData = "0x";
    const offchainConfig = "0x";
    const amount = ethers.utils.parseUnits("1", "ether"); // 1 LINK token

    // The event signature hash and additional topics for the LogEmitter trigger
    const topic0 = "0xb8a00d6d8ca1be30bfec34d8f97e55f0f0fd9eeb7fb46e030516363d4cfe1ad6";
    const topic1 = "0x0000000000000000000000000000000000000000000000000000000000000000";
    const topic2 = "0x0000000000000000000000000000000000000000000000000000000000000000";
    const topic3 = "0x0000000000000000000000000000000000000000000000000000000000000000";

    // ABI encode triggerConfig
    const triggerConfig = ethers.utils.defaultAbiCoder.encode(
      ["address", "uint8", "bytes32", "bytes32", "bytes32", "bytes32"],
      [logEmitter, 0, topic0, topic1, topic2, topic3]
    );

    // RegistrationParams struct
    const params = {
      name,
      encryptedEmail,
      upkeepContract: streamsUpkeep,
      gasLimit,
      adminAddress: admin.address,
      triggerType,
      checkData,
      triggerConfig,
      offchainConfig,
      amount,
    };

    // Fetch the deployed StreamsUpkeep contract and call registerAndPredictID
    const StreamsUpkeepContract = await ethers.getContractAt("StreamsUpkeep", streamsUpkeep, admin);
    await StreamsUpkeepContract.registerAndPredictID(params);

    console.log("Upkeep registered successfully.");
  });

module.exports = {};
