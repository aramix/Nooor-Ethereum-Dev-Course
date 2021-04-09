// SPDX-License-Identifier: MIT
pragma solidity 0.7.4;

import "./Campaign.sol";

contract CampaignFactory {
    CampaignStruct[] public deployedCampaigns;
    struct CampaignStruct {
        string name;
        string description;
        address campaignAddress;
    }

    function createCampaign(
        uint256 minimum,
        string memory name,
        string memory description
    ) public {
        address campaignAddress = address(new Campaign(minimum, msg.sender));
        CampaignStruct memory newCampaign =
            CampaignStruct({
                name: name,
                description: description,
                campaignAddress: campaignAddress
            });

        deployedCampaigns.push(newCampaign);
    }

    function getCampaignsCount() public view returns (uint256) {
        return deployedCampaigns.length;
    }
}
