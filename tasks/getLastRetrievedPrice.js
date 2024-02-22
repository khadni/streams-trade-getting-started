// const { ethers } = require("hardhat");

task("getLastRetrievedPrice", "Gets the last retrieved price from StreamsUpkeep")
  .addParam("streamsUpkeep", "The address of the deployed StreamsUpkeep contract")
  .setAction(async (taskArgs, hre) => {
    const { streamsUpkeep } = taskArgs;

    // Get the contract instance
    const StreamsUpkeepContract = await hre.ethers.getContractAt("StreamsUpkeep", streamsUpkeep);

    // Call the automatically generated getter for the public state variable
    const lastRetrievedPrice = await StreamsUpkeepContract.last_retrieved_price();

    console.log(`Last Retrieved Price: ${lastRetrievedPrice}`);
  });

module.exports = {};
