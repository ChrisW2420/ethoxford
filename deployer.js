const ethers = require('ethers');
const { Web3 } = require('web3');
const provider = new Web3('wss://base-sepolia-rpc.publicnode.com');
const bytecode = require('./bytecode.json');
const abi = require('./abi.json');

const user_priv_key = '0x4399b2fb3ffa344351b43bc95da54385692241d8925e779258a942fef01d5039';

async function createWallet() {
    // Create a new Ethereum wallet
    const wallet = ethers.Wallet.createRandom();
    // Print the generated address and private key
    console.log(`Address: ${wallet.address}`);
    console.log(`Private Key: ${wallet.privateKey}`);
    return wallet
}
// web.eth.sendTransaction({from: web.eth.accounts[0], to: "0x9d2a327b320da739ed6b0da33c3809946cc8cf6a", value: web.toWei(2, 'ether')})

async function sendTrans() {
    userWallet = provider.eth.wallet.add(user_priv_key);
    destWallet = createWallet();
    Web3.eth.sendTransaction({
        from: userWallet.address,
        to: destWallet.address,
        value: Web3.utils.toWei('0.001', 'ether'),
    });
}

async function deployContract(currency, amt) {
    destWallet = createWallet();
    wallet = provider.eth.wallet.add(user_priv_key);
    contract = new provider.eth.Contract(abi);
    deployer = contract.deploy({
        data: bytecode,
        arguments: [destWallet.address],
    });

    const txReceipt = await deployer.send({ from: wallet[0].address });
    console.log("Contract Address: " + txReceipt.options.address);
    return txReceipt.options.address;
}

address = deployContract('ETH', 0.001);
console.log(address);

// createWallet();
