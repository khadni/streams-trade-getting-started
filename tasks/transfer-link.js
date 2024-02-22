const { BigNumber } = require("ethers")
const { networkConfig } = require("../helper-hardhat-config")

// Minimal ERC20 ABI
const minimalERC20ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function transfer(address to, uint amount) returns (bool)",
];

task("transfer-link", "Transfer LINK tokens to a recipient")
    .addParam("recipient", "The address of the EOA or contract account that will receive your LINK tokens")
    .addParam("amount", "Amount in Juels. 1LINK=10**18 JUELS")
    .addOptionalParam("linkaddress", "Set the LINK token address")
    .setAction(async (taskArgs, hre) => {
        const { recipient: recipientAddress, amount } = taskArgs;
        const networkId = hre.network.config.chainId;

        if (!networkConfig[networkId] || !networkConfig[networkId]["linkToken"]) {
            throw new Error(`Network configuration not found for network ID ${networkId}`);
        }

        const linkTokenAddress = networkConfig[networkId]["linkToken"] || taskArgs.linkaddress;
        
        // Use getContractAt with the minimal ERC20 ABI
        const linkTokenContract = await hre.ethers.getContractAt(minimalERC20ABI, linkTokenAddress);

        const accounts = await hre.ethers.getSigners();
        const signer = accounts[0];

        console.log("LINK token address:", linkTokenAddress);
        const balance = await linkTokenContract.balanceOf(signer.address);
        console.log(`LINK balance of sender ${signer.address} is ${hre.ethers.utils.formatEther(balance)} LINK`);

        const amountBN = BigNumber.from(amount);
        if (balance.gte(amountBN)) {
            const result = await linkTokenContract.connect(signer).transfer(recipientAddress, amount);
            await result.wait();
            console.log(`${hre.ethers.utils.formatEther(amountBN)} LINK were sent from ${signer.address} to ${recipientAddress}. Transaction Hash: ${result.hash}`);
        } else {
            console.log(`Sender doesn't have enough LINK. Current balance is ${hre.ethers.utils.formatEther(balance)} LINK, but tried to send ${hre.ethers.utils.formatEther(amountBN)} LINK.`);
        }
    });

module.exports = {}