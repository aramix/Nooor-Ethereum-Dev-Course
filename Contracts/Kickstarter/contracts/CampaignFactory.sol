// SPDX-License-Identifier: MIT
pragma solidity 0.7.4;

import "./Campaign.sol";

contract CampaignFactory {
    address[] public deployedCampaignAddresses;

    function createCampaign(uint256 minimum) public {
        address newCampaign = address(new Campaign(minimum, msg.sender));

        deployedCampaignAddresses.push(newCampaign);
    }

    function getCampaigns() public view returns (address[] memory) {
        return deployedCampaignAddresses;
    }
}
