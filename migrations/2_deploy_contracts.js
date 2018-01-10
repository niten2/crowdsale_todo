var SampleCrowdsale = artifacts.require("./SampleCrowdsale.sol");

module.exports = function(deployer, network, accounts) {
  const startTime = web3.eth.getBlock(web3.eth.blockNumber).timestamp + 1 // +1 second, future
  const endTime = startTime + (86400 * 7) // finished after 7 days
  const rate = new web3.BigNumber(1000)
  const goal = new web3.BigNumber(5000)
  const cap = new web3.BigNumber(5000)
  const wallet = accounts[0]

  deployer.deploy(SampleCrowdsale, startTime, endTime, rate, goal, cap, wallet)

  // const startTime = web3.eth.getBlock(web3.eth.blockNumber).timestamp + 1
  // const endTime = startTime + (86400 * 7) // 7 days
  // const rate = new web3.BigNumber(1000)
  // const wallet = accounts[0]

  // deployer.deploy(SampleCrowdsale, startTime, endTime, rate, wallet)

};

