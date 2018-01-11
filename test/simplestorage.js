import { expect } from "chai"
let SampleCrowdsale = artifacts.require("./SampleCrowdsale.sol")

contract('SampleCrowdsale', (accounts) => {

  it("should", async () => {
    let instance = await SampleCrowdsale.deployed()


    let addr = await instance.token()

    expect(addr).to.be.a("string")

    console.log(addr)

  })

})
