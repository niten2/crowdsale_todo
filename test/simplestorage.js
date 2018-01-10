var SampleCrowdsale = artifacts.require("./SampleCrowdsale.sol");

contract('SampleCrowdsale', function(accounts) {

  // it("should", function() {
  //   SampleCrowdsale.deployed().then(function(instance) {
  //     instance.token().then(addr => {
  //       console.log(addr)
  //     })
  //   })
  // })

  it("should", async () => {
    SampleCrowdsale.deployed().then(function(instance) {

      let res = await instance.token()
      console.log(res)

    })
  })


})
