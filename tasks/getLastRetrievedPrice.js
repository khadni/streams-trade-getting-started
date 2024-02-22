/**
 * Defines a Hardhat task to retrieve the last price updated in the StreamsUpkeep contract.
 * This task requires the address of the deployed StreamsUpkeep contract as input.
 */
task("getLastRetrievedPrice", "Gets the last retrieved price from StreamsUpkeep")
  .addParam("streamsUpkeep", "The address of the deployed StreamsUpkeep contract") // Define a required parameter for the task: the address of the StreamsUpkeep contract.
  .setAction(async (taskArgs, hre) => {
    const { streamsUpkeep } = taskArgs; // Destructure the streamsUpkeep address from the task arguments.

    // Retrieve an instance of the StreamsUpkeep contract using the provided address.
    // This enables interaction with the contract's functions.
    const StreamsUpkeepContract = await hre.ethers.getContractAt("StreamsUpkeep", streamsUpkeep);

    // Call the automatically generated getter function for the last_retrieved_price public state variable.
    const lastRetrievedPrice = await StreamsUpkeepContract.last_retrieved_price();

    // Output the last retrieved price to the console.
    console.log(`Last Retrieved Price: ${lastRetrievedPrice}`);
  });

module.exports = {};
