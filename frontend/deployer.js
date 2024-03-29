// const { Web3 } = require("web3");
// const bytecode = require("./bytecode.json"); // Assuming bytecode is the compiled contract bytecode
// const abi = require("./abi.json"); // Assuming ABI is the contract's ABI
// const accounts = require("web3-eth-accounts");

const abi = [
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_recipient",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "recipient",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "sendEtherToContract",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

async function createWallet() {
  // Create a new Ethereum wallet
  const web3 = new Web3(window.ethereum);
  const wallet = await web3.eth.accounts.create();

  // Print the generated address and private key
  address = wallet.address;
  console.log(`Address: ${wallet.address}`);
  console.log(`Private Key: ${wallet.privateKey}`);
  return address;
}

async function deployContract() {
  const provider = new Web3("wss://polygon-mumbai-bor-rpc.publicnode.com");

  destWallet = await createWallet();

  const userPrivKey =
    "0x4399b2fb3ffa344351b43bc95da54385692241d8925e779258a942fef01d5039";
  const account = provider.eth.accounts.privateKeyToAccount(userPrivKey);
  provider.eth.accounts.wallet.add(account); // Add this account to the wallet

  const contract = new provider.eth.Contract(abi);
  console.log("destWallet.address: ", destWallet);
  const deployOptions = {
    data: "0x608060405234801561001057600080fd5b5060405161050e38038061050e8339818101604052810190610032919061008d565b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506100ff565b600081519050610087816100e8565b92915050565b60006020828403121561009f57600080fd5b60006100ad84828501610078565b91505092915050565b60006100c1826100c8565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6100f1816100b6565b81146100fc57600080fd5b50565b6104008061010e6000396000f3fe6080604052600436106100385760003560e01c806312065fe0146100b1578063325ec768146100dc57806366d003ac146100e6576100ac565b366100ac57600047905060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501580156100a8573d6000803e3d6000fd5b5050005b600080fd5b3480156100bd57600080fd5b506100c6610111565b6040516100d39190610357565b60405180910390f35b6100e4610119565b005b3480156100f257600080fd5b506100fb61020b565b60405161010891906102fc565b60405180910390f35b600047905090565b6000341161015c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161015390610337565b60405180910390fd5b60003073ffffffffffffffffffffffffffffffffffffffff1634604051610182906102e7565b60006040518083038185875af1925050503d80600081146101bf576040519150601f19603f3d011682016040523d82523d6000602084013e6101c4565b606091505b5050905080610208576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101ff90610317565b60405180910390fd5b50565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6102388161038e565b82525050565b600061024b60148361037d565b91507f4661696c656420746f2073656e642045746865720000000000000000000000006000830152602082019050919050565b600061028b60148361037d565b91507f4d7573742073656e6420736f6d652045746865720000000000000000000000006000830152602082019050919050565b60006102cb600083610372565b9150600082019050919050565b6102e1816103c0565b82525050565b60006102f2826102be565b9150819050919050565b6000602082019050610311600083018461022f565b92915050565b600060208201905081810360008301526103308161023e565b9050919050565b600060208201905081810360008301526103508161027e565b9050919050565b600060208201905061036c60008301846102d8565b92915050565b600081905092915050565b600082825260208201905092915050565b6000610399826103a0565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600081905091905056fea2646970667358221220a54d2b3baee37727562ce1e3b8079238cfbdd9b93806b159cf32bfa0ce8c256264736f6c63430008000033",
    arguments: [destWallet], // Any constructor arguments go here
  };

  // const gasEstimate = await contract.deploy(deployOptions).estimateGas();

  const newContractInstance = await contract.deploy(deployOptions).send({
    from: account.address,
    gas: 800000,
  });

  console.log("Contract Address:", newContractInstance.options.address);

  let data = {
    vc_address: destWallet,
    sc_address: newContractInstance.options.address,
  };

  return data;
}
