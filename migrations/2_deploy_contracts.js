var SampleCrowdsale = artifacts.require("./SampleCrowdsale.sol")

module.exports = function(deployer, network, accounts) {
  const startTime = web3.eth.getBlock(web3.eth.blockNumber).timestamp + 1 // +1 second, future
  const endTime = startTime + (86400 * 7) // finished after 7 days

  const rate = new web3.BigNumber(1000)

  const goal = web3.toWei(10, "ether")
  const cap = web3.toWei(20, "ether")

  const wallet = accounts[0]

  deployer.deploy(SampleCrowdsale, startTime, endTime, rate, goal, cap, wallet)
}
