var SampleCrowdsale = artifacts.require("./SampleCrowdsale.sol");

contract('SampleCrowdsale', (accounts) => {

  it("should", async () => {
    let instance = await SampleCrowdsale.deployed()

    console.log(instance)

      // .then((instance) => {
      // instance.token().then(addr => {
      //   console.log(addr)
      //   console.log("----------------")
      // })
    // })
  })

  // it("should", async () => {
  //   SampleCrowdsale.deployed().then(function(instance) {

  //     let res = await instance.token()
  //     console.log(res)

  //   })
  // })


})
