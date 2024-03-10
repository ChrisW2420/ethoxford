const { ethers } = require("ethers");

async function connectMetamask() {
  // Check if Metamask is installed
  if (typeof window.ethereum !== "undefined") {
    try {
      // Request accounts access
      await window.ethereum.request({ method: "eth_requestAccounts" });
      console.log("Connected to Metamask!");
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error("Metamask is not installed");
  }
}
// // first enter the private key of the user to metamask extension after setting up a connection to it
// async function executeMetamask() {
//   // Check if Metamask is installed
//   // contact address
//   const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // address of the contract
//   // contract abi
//   const abi = [
//     {
//       inputs: [
//         {
//           internalType: "string",
//           name: "_name",
//           type: "string",
//         },
//         {
//           internalType: "uint256",
//           name: "_favoriteNumber",
//           type: "uint256",
//         },
//       ],
//       name: "addPerson",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "string",
//           name: "",
//           type: "string",
//         },
//       ],
//       name: "nameToFavoriteNumber",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       name: "people",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "favoriteNumber",
//           type: "uint256",
//         },
//         {
//           internalType: "string",
//           name: "name",
//           type: "string",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "retrieve",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "uint256",
//           name: "_favoriteNumber",
//           type: "uint256",
//         },
//       ],
//       name: "store",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//   ];

//   // functions from the contract
//   const provider = new ethers.providers.Web3Provider(window.ethereum); // metamask is our provider, using it as an rpc rl could also be http://127.0.0.1:8545/ but local
//   const signer = provider.getSigner(); // get the signer from the provider connected account on metamask
//   const contract = new ethers.Contract(contractAddress, abi, signer); // create a contract instance, whoever connects to the metamask is the signer
//   await contract.store(42); // call the store function from the contract
// }
module.exports = {
  connectMetamask,
  // executeMetamask,
};
