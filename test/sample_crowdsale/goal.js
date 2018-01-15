import chai, { expect } from "chai"
import chaiAsPromised from "chai-as-promised"
chai.use(chaiAsPromised)

let SampleCrowdsale = artifacts.require("./SampleCrowdsale.sol")
let SampleCrowdsaleToken = artifacts.require("./SampleCrowdsaleToken.sol")

contract('SampleCrowdsale', (accounts) => {
  let account = web3.eth.accounts[1]
  let cap = 20

  it(`should close ico if the goal is achieved`, async () => {
    let crowdsale = await SampleCrowdsale.deployed()
    let token = SampleCrowdsaleToken.at(await crowdsale.token())

    await crowdsale.sendTransaction({ from: account, value: web3.toWei(cap, "ether")})

    // let totalSupply = await web3.fromWei(await token.totalSupply()).toString(10)

    eval(require("pryjs").it)

    // expect(totalSupply).to.eql(2000)


    // let state = await this.getStatus(crowdsale)




    // let balance = (await coinInstance.balanceOf(account)).toString(10)


    // let balance = (await coinInstance.balanceOf(account)).toString(10)


    // eval(require("pryjs").it)


    // check status
  })

})
