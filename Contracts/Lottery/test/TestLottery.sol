// SPDX-License-Identifier: MIT
pragma solidity 0.7.4;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Lottery.sol";

contract TestLottery {
    // function testItShouldDeploy() public pure {
    //     Lottery lottery = Lottery(DeployedAddresses.Lottery());

    //     Assert(address(lottery));
    // }

    function testItShouldAllowAnAccountToEnter() public {
        Lottery lottery = Lottery(DeployedAddresses.Lottery());
        // lottery.enter{value: 2 ether}();
        // address payable[] memory players =
        //     lottery.getPlayers{from: lottery.manager}();

        Assert.equal(address(tx.origin), address(lottery), "balances not equal");
    }
}
