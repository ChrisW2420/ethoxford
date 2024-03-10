// require("dotenv").config();
// const { Web3 } = require("web3");

const sendEther = async (contract_address, amount) => {
  // Initialize a web3 instance using an Infura or Alchemy URL
  const web3 = new Web3("wss://polygon-mumbai-bor-rpc.publicnode.com");

  let account = null;

  // The sender's Ethereum address and private key
  if (typeof window.ethereum !== "undefined") {
    // Create a new Web3 instance with MetaMask provider
    const web3 = new Web3(window.ethereum);

    // Request account access if needed
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(function (accounts) {
        // Get the first account from the array of accounts
        account = accounts[0];

        // Display the account address
        console.log("Wallet Address:", account);
      })
      .catch(function (error) {
        // Handle error if user denies account access
        console.error(error);
      });
  } else {
    // If MetaMask is not installed, prompt the user to install it
    console.error("MetaMask is not installed!");
  }

  const senderAddress = account;
  let privateKey = prompt("Please provide your private key:");
  // "4399b2fb3ffa344351b43bc95da54385692241d8925e779258a942fef01d5039";

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
