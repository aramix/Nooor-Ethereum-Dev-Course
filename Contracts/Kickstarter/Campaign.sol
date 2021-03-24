// SPDX-License-Identifier: MIT
pragma solidity 0.7.4;

contract Campaign {
    address public manager;
    uint public minimumContribution;
    mapping(address => uint) public contributors;
    
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => address) approvals;
    }
    Request[] public requests;
    
    int[] numbers;
    
    constructor(uint minimum) {
        manager = msg.sender;
        minimumContribution = minimum * 1 ether;
    }
    
    function contribute() public payable onlyContributor("Managers can't contribute to their own campaign") {
        require(msg.value >= minimumContribution, "Paied ether should be bigger than minimum contribution");
        contributors[msg.sender] = msg.value;
    }
    
    function createRequest(string memory desc, uint value, address payable recipient) public onlyManager("Only manager can create an expense request") {
        Request storage newRequest = requests.push();
        newRequest.value = value;
        newRequest.description = desc;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }
    
    function approveRequest(uint requestIndex) public onlyContributor("Only approver can approve the request") nonApprover(requestIndex, "Contributors can vote only once") {
        requests[requestIndex].approvals[msg.sender] = msg.sender;
        requests[requestIndex].approvalCount++;
    }
    
    function finalizeRequest(uint requestIndex) private {
        
    }
    
    modifier onlyContributor(string memory desc) {
        require(msg.sender != manager && contributors[msg.sender] >= minimumContribution, desc);
        _;
    }
    
    modifier nonApprover(uint requestIndex, string memory desc) {
        require(requests[requestIndex].approvals[msg.sender] != msg.sender, desc);
        _;
    }
    
    modifier onlyManager(string memory desc) {
        require(msg.sender == manager, desc);
        _;
    }
    
    
}
