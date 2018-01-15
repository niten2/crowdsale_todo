import chai, { expect } from "chai"
import chaiAsPromised from "chai-as-promised"
chai.use(chaiAsPromised)

let SampleCrowdsale = artifacts.require("./SampleCrowdsale.sol")
let SampleCrowdsaleToken = artifacts.require("./SampleCrowdsaleToken.sol")

contract('SampleCrowdsale', (accounts) => {

  it(`should be a ban on sending tokens if ico is not complete`, async () => {
  })

  it(`should can sending tokens owner if ico is complete`, async () => {
  })

})
