pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/crowdsale/CappedCrowdsale.sol";
import "zeppelin-solidity/contracts/crowdsale/RefundableCrowdsale.sol";
import "zeppelin-solidity/contracts/crowdsale/RefundVault.sol";
import "zeppelin-solidity/contracts/lifecycle/Destructible.sol";
import "zeppelin-solidity/contracts/lifecycle/Pausable.sol";

// import "zeppelin-solidity/contracts/token/MintableToken.sol";
import "./SampleCrowdsaleToken.sol";

contract SampleCrowdsale is Crowdsale, CappedCrowdsale, RefundableCrowdsale, RefundVault, Destructible, Pausable {

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
      RefundVault(_wallet)
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

        // uint tokens = rate.mul(msg.value).div(1 ether);
        // uint bonusTokens = 0;

        // if(now < start + (period * 1 days).div(4)) {
        //   new SampleCrowdsaleToken();

        //   bonusTokens = tokens.div(4);
        // } else if(now >= start + (period * 1 days).div(4) && now < start + (period * 1 days).div(4).mul(2)) {
        //   bonusTokens = tokens.div(10);
        // } else if(now >= start + (period * 1 days).div(4).mul(2) && now < start + (period * 1 days).div(4).mul(3)) {
        //   bonusTokens = tokens.div(20);
        // }
        // tokens += bonusTokens;
        // token.mint(msg.sender, tokens);



      return new SampleCrowdsaleToken();
    }

    function finalization() internal {
      wallet.transfer(msg.value);
    }

    function kill() public {
      if (msg.sender == owner) {
        selfdestruct(owner);
      }
    }

}
