// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AutoSendOnReceipt {
    address payable public recipient;

    constructor(address payable _recipient) {
        recipient = _recipient; // Set the recipient address
    }

    function sendEtherToContract() public payable {
        // Ensure there's enough Ether sent with the transaction
        require(msg.value > 0, "Must send some Ether");

        // Send the Ether to the specified address (the AutoSendOnReceipt contract)
        (bool sent, ) = payable(address(this)).call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }

    function getBalance() external view returns(uint256){
        //fetch balance from this contract
        return address(this).balance;
    }

    // Function to receive Ether and automatically send a portion or all of it to the recipient
    receive() external payable {
        uint256 amountToSend = address(this).balance; // Specify the amount to send. This example sends all received Ether.
        payable(recipient).transfer(amountToSend);
    }
}
