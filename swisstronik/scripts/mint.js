const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/swisstronik.js");

// Function to send a shielded transaction using the provided signer, destination, data, and value
const sendShieldedTransaction = async (signer, destination, data, value) => {
    // Get the RPC link from the network configuration
    const rpcLink = hre.network.config.url;

    // Encrypt transaction data
    const [encryptedData] = await encryptDataField(rpcLink, data);

    // Construct and sign transaction with encrypted data
    return await signer.sendTransaction({
        from: signer.address,
        to: destination,
        data: encryptedData,
        value,
    });
};

async function main() {
    // Address of the deployed contract
    const contractAddress = "0xc694271B39CbBb89Abe2F88FC83Bfc2235a4b9E5";

    // Get the signer (my account)
    const [signer] = await hre.ethers.getSigners();

    // Create a contract instance
    const contractFactory = await hre.ethers.getContractFactory("MySWTR");
    const contract = contractFactory.attach(contractAddress);

    // Send a shielded transaction to mint 100 tokens in the contract
    const functionName = "mint100tokens";
    try {
        const mint100TokensTx = await sendShieldedTransaction(signer, contractAddress, contract.interface.encodeFunctionData(functionName), 0);
        await mint100TokensTx.wait();
        // It should return a TransactionReceipt object
        console.log("Transaction Receipt: ", mint100TokensTx);
    } catch (error) {
        if (error.reason) {
            console.error("Revert Reason:", error.reason);
        } else {
            console.error("Transaction Failed:", error.message);
        }
        process.exitCode = 1; // Set an exit code to indicate an error
    }
}

// Using async/await pattern to handle errors properly
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});