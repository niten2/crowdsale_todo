import chai, { expect } from "chai"
import chaiAsPromised from "chai-as-promised"
chai.use(chaiAsPromised)

let SampleCrowdsale = artifacts.require("./SampleCrowdsale.sol")
let SampleCrowdsaleToken = artifacts.require("./SampleCrowdsaleToken.sol")

contract('SampleCrowdsale', (accounts) => {

  contract('end time', (accounts) => {

    it(`should complete success crowdsale goal is achieved`, async () => {
    })

    it(`should not complete crowdsale goal is not achieved`, async () => {
    })

  })

})
