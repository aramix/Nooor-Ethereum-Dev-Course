// SPDX-License-Identifier: MIT
pragma solidity 0.7.4;

contract Campaign {
    address public manager;
    uint public minimumContribution;
    address payable[] public approvers;
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
    }
    Request[] public requests;
    
    constructor(uint minimum) {
        manager = msg.sender;
        minimumContribution = minimum * 1 ether;
    }
    
    function contribute() public payable onlyApprover("Managers can't contribute to their own campaign") {
        require(msg.value >= minimumContribution, "Paied ether should be bigger than minimum contribution");
        approvers.push(msg.sender);
    }
    
    function createRequest(string memory desc, uint value, address payable recipient) public onlyManager("Only manager can create an expense request") {
        Request memory newExpense = Request({
            description: desc,
            value: value,
            recipient: recipient,
            complete: false
        });
        
        requests.push(newExpense);
    }
    
    function getApprovers() public view returns(address payable[] memory) {
        return approvers;
    }
    
    function approveRequest(uint requestIndex) public onlyApprover("Only approver can approve the request") {
        
        // finalizeRequest(requestIndex);
    }
    
    function finalizeRequest(uint requestIndex) private {
        
    }
    
    modifier onlyApprover(string memory desc) {
        require(msg.sender != manager, desc);
        _;
    }
    
    modifier onlyManager(string memory desc) {
        require(msg.sender == manager, desc);
        _;
    }
    
    
}
