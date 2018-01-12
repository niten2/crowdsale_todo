import chai, { expect } from "chai"
import chaiAsPromised from "chai-as-promised"
chai.use(chaiAsPromised)

let SampleCrowdsale = artifacts.require("./SampleCrowdsale.sol")
let SampleCrowdsaleToken = artifacts.require("./SampleCrowdsaleToken.sol")

contract('SampleCrowdsale', (accounts) => {
  it(`should have capacity 20`, async () => {
    let cap = 20
    let account1 = web3.eth.accounts[1]
    let crowdsale = await SampleCrowdsale.deployed()

    await crowdsale.sendTransaction({ from: account1, value: web3.toWei(cap, "ether")})

    try {
      await crowdsale.sendTransaction({ from: account1, value: web3.toWei(1, "ether")})
      throw new Error("should return throw")
    } catch (err) {
      expect(err.message).eql("VM Exception while processing transaction: revert")
    }

  })

  // it(`should sendTransaction token`, async () => {
  //   let balance
  //   let account1 = web3.eth.accounts[1]

  //   let crowdsale = await SampleCrowdsale.deployed()

  //   let coinInstance = SampleCrowdsaleToken.at(await crowdsale.token())

  //   balance = (await coinInstance.balanceOf(account1)).toString(10)
  //   expect(balance).to.eql("0")

  //   await crowdsale.sendTransaction({ from: account1, value: web3.toWei(10, "ether")})

  //   balance = (await coinInstance.balanceOf(account1)).toString(10)
  //   expect(balance).to.eql("10000000000000000000000")
  // })

})
