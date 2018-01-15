import chai, { expect } from "chai"
import chaiAsPromised from "chai-as-promised"
chai.use(chaiAsPromised)

let SampleCrowdsale = artifacts.require("./SampleCrowdsale.sol")
let SampleCrowdsaleToken = artifacts.require("./SampleCrowdsaleToken.sol")

contract('SampleCrowdsale', (accounts) => {
  let cap = 20

  it(`should not take additional eth if capacity ${cap}`, async () => {
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

})
