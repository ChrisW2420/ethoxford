const { Web3 } = require('web3');
const ethers = require('ethers');
const bytecode = require('./bytecode.json'); // Assuming bytecode is the compiled contract bytecode
const abi = require('./abi.json'); // Assuming ABI is the contract's ABI
const accounts = require('web3-eth-accounts')

// You should replace this URL with the WebSocket provider URL you intend to use, for example, Infura or Alchemy
const provider = new Web3('wss://polygon-mumbai-bor-rpc.publicnode.com');

const userPrivKey = '0x4399b2fb3ffa344351b43bc95da54385692241d8925e779258a942fef01d5039';

async function createWallet() {
    // Create a new Ethereum wallet
    const wallet = accounts.create();
    // Print the generated address and private key
    address = wallet.address;
    console.log(`Address: ${wallet.address}`);
    console.log(`Private Key: ${wallet.privateKey}`);
    return address;
}

async function deployContract() {
    destWallet = await createWallet();
    const account = provider.eth.accounts.privateKeyToAccount(userPrivKey);
    provider.eth.accounts.wallet.add(account); // Add this account to the wallet

    const contract = new provider.eth.Contract(abi);
    console.log("destWallet.address: ", destWallet);
    const deployOptions = {
        data: bytecode,
        arguments: [destWallet], // Any constructor arguments go here
    };

    // const gasEstimate = await contract.deploy(deployOptions).estimateGas();

    const newContractInstance = await contract.deploy(deployOptions)
        .send({
            from: account.address,
        });

    console.log("Contract Address:", newContractInstance.options.address);
    return newContractInstance.options.address;
}

// Deploy contract
deployContract().then((address) => {
    console.log("Deployed Contract Address:", address);
}).catch((error) => {
    console.error("Error deploying contract:", error);
});

// Example of creating a wallet (uncomment to use)
// createWallet();
