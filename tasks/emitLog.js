// Define a Hardhat task named "emitLog" to trigger log emission from the LogEmitter contract.
task("emitLog", "Emits a log from the LogEmitter contract")
  .addParam("logEmitter", "The address of the deployed LogEmitter contract") // Define a required parameter for the task: the address of the LogEmitter contract.
  .setAction(async (taskArgs, hre) => {
    const { logEmitter } = taskArgs; // Destructure the logEmitter address from the task arguments.

    // Retrieve the signer account to interact with the blockchain.
    // The signer will be used to send the transaction for emitting a log.
    const [signer] = await hre.ethers.getSigners();

    // Create an instance of the LogEmitter contract at the specified address,
    // using the signer to enable sending transactions.
    const LogEmitterContract = await hre.ethers.getContractAt("LogEmitter", logEmitter, signer);

    // Call the emitLog function of the LogEmitter contract to emit a log event.
    console.log("Emitting a log...");
    const tx = await LogEmitterContract.emitLog();

    // Wait for the transaction to be mined to ensure the log has been emitted.
    await tx.wait();

    // Log the transaction hash to the console as confirmation of log emission.
    console.log(`Log emitted successfully in transaction: ${tx.hash}`);
  });

module.exports = {};
