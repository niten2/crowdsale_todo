import chai, { expect } from "chai"
import chaiAsPromised from "chai-as-promised"
chai.use(chaiAsPromised)

let SampleCrowdsale = artifacts.require("./SampleCrowdsale.sol")
let SampleCrowdsaleToken = artifacts.require("./SampleCrowdsaleToken.sol")

contract('SampleCrowdsale', (accounts) => {

  it(`should add 10% first day`, async () => {
  })

})
