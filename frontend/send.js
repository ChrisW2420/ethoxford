// require("dotenv").config();
// const { Web3 } = require("web3");

const sendEther = async (contract_address, amount) => {
  // Initialize a web3 instance using an Infura or Alchemy URL
  const web3 = new Web3("wss://polygon-mumbai-bor-rpc.publicnode.com");

  // The sender's Ethereum address and private key
  const senderAddress = "0x667396101862871AA0039d856f87c0378a84FE92";
  const privateKey =
    "4399b2fb3ffa344351b43bc95da54385692241d8925e779258a942fef01d5039";

  // The amount of Ether to send
  const amountToSend = web3.utils.toWei(amount, "ether"); // Converts 0.01 Ether to Wei

  // Create a transaction object
  const tx = {
    from: senderAddress,
    to: contract_address,
    value: amountToSend,
    gas: 100000, // Set the gas limit for the transaction
    gasPrice: await web3.eth.getGasPrice(), // Fetch the current gas price
  };

  // Sign the transaction with the private key of the sender
  const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

  // Send the signed transaction
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  console.log(`Transaction hash: ${receipt.transactionHash}`);

  alert("Completed transaction.");
};
