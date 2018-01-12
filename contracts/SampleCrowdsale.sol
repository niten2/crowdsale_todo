pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/crowdsale/CappedCrowdsale.sol";
import "zeppelin-solidity/contracts/crowdsale/RefundableCrowdsale.sol";
import "zeppelin-solidity/contracts/token/MintableToken.sol";
import "./SampleCrowdsaleToken.sol";

contract SampleCrowdsale is Crowdsale, CappedCrowdsale, RefundableCrowdsale {

  function SampleCrowdsale(
    uint256 _startTime,
    uint256 _endTime,
    uint256 _rate,
    uint256 _goal,
    uint256 _cap,
    address _wallet
    // address _owner
  ) public
    CappedCrowdsale(_cap)
    FinalizableCrowdsale()
    RefundableCrowdsale(_goal)
    // Ownable(_owner)
    Crowdsale(_startTime, _endTime, _rate, _wallet)
  {
    // As goal needs to be met for a successful crowdsale
    // the value needs to less or equal than
    // a cap which is limit for accepted funds
    require(_goal <= _cap);
  }

  // creates the token to be sold.
  // override this method to
  // have crowdsale of a specific MintableToken token.
  function createTokenContract() internal returns (MintableToken) {
    return new SampleCrowdsaleToken();
  }

  // function kill() public {
  //   if (msg.sender == owner) {
  //     selfdestruct(owner);
  //   }
  // }

}
