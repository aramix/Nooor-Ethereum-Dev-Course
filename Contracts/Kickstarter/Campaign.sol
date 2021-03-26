// SPDX-License-Identifier: MIT
pragma solidity 0.7.4;

contract CampaignFactory {
    address[] deployedCampaignAddresses;
    
    function createCampaign(uint minimum) public {
        address newCampaign = address(new Campaign(minimum, msg.sender));
        
        deployedCampaignAddresses.push(newCampaign);
    }
    
    function getCampaigns() public view returns(address[] memory) {
        return deployedCampaignAddresses;
    }
}

contract Campaign {
    address public manager;
    uint public minimumContribution;
    uint public contributorsCount;
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
    
    constructor(uint minimum, address creator) {
        manager = creator;
        minimumContribution = minimum * 1 ether;
    }
    
    function contribute() public payable onlyContributor("Managers can't contribute to their own campaign") {
        require(msg.value >= minimumContribution, "Paid ether should be bigger than minimum contribution");
        contributors[msg.sender] = msg.value;
        contributorsCount++;
    }
    
    function createRequest(string memory desc, uint value, address payable recipient) public onlyManager("Only manager can create an expense request") {
        require(value <= address(this).balance, "Requested amount can't be higher than available balance");
        Request storage newRequest = requests.push();
        newRequest.value = value * 1 ether;
        newRequest.description = desc;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }
    
    function approveRequest(uint requestIndex) public onlyContributor("Only approver can approve the request") nonApprover(requestIndex, "Contributors can vote only once") {
        require(contributors[msg.sender] >= minimumContribution, "Only contributors can approve requests");
        Request storage request = requests[requestIndex];
        
        request.approvals[msg.sender] = msg.sender;
        request.approvalCount++;
        
        if (!request.complete) finalizeRequest(request);
    }
    
    function finalizeRequest(Request storage request) private {
        if (request.approvalCount > (contributorsCount / 2)) {
            request.complete = true;
            request.recipient.transfer(request.value);
        }
    }
    
    function getSummary() public view returns(address, uint, uint, uint, uint) {
        return (
            manager,
            contributorsCount,
            minimumContribution,
            address(this).balance,
            requests.length
        );
    }
    
    modifier onlyContributor(string memory desc) {
        require(msg.sender != manager, desc);
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
