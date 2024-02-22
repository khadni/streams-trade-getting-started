const { deployStreamsUpkeep } = require("./deployStreamsUpkeep");
const { deployLogEmitter } = require("./deployLogEmitter");

async function main() {
  await run("compile");
  await deployStreamsUpkeep();
  await deployLogEmitter();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
