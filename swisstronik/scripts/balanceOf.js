const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/swisstronik.js");

const sendShieldedQuery = async (provider, destination, data) => {
    const rpcLink = hre.network.config.url;

    const [encryptedData, usedEncryptionKey] = await encryptDataField(rpcLink, data);

    // Execute the call/query using the provider
    const response = await provider.call({
        to: destination,
        data: encryptedData,
    });

    return await decryptNodeResponse(rpcLink, response, usedEncryptionKey);
};

async function main() {
    // Address of the deployed contract
    const replace_contractAddress = "0xc694271B39CbBb89Abe2F88FC83Bfc2235a4b9E5";

    // Get the signer (your account)
    const [signer] = await hre.ethers.getSigners();

    // Create a contract instance
    const replace_contractFactory = await hre.ethers.getContractFactory("MySWTR");
    const contract = replace_contractFactory.attach(replace_contractAddress);

    // Send a shielded query to retrieve balance data from the contract
    const replace_functionName = "balanceOf";
    const replace_functionArgs = ["0x2EE917B5A7F633B5dd649a0b9B060e22f485F7b2"];
    const responseMessage = await sendShieldedQuery(signer.provider, replace_contractAddress, contract.interface.encodeFunctionData(replace_functionName, replace_functionArgs));

    // Decode the Uint8Array response into a readable string
    console.log("Decoded response:", contract.interface.decodeFunctionResult(replace_functionName, responseMessage)[0]);
}

// Using async/await pattern to handle errors properly
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});