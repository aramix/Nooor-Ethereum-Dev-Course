// SPDX-License-Identifier: MIT
pragma solidity 0.7.4;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Lottery.sol";

contract TestLottery {
  function testItShouldDeploy() public pure {
    Assert(DeployedAddresses.Lottery());
  }

  // function testItStoresAValue() public {
  //   SimpleStorage simpleStorage = SimpleStorage(DeployedAddresses.SimpleStorage());

  //   simpleStorage.set(89);

  //   uint expected = 89;

  //   Assert.equal(simpleStorage.get(), expected, "It should store the value 89.");
  // }

}
