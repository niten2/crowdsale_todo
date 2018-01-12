import React, { Component } from 'react'
import { getWeb3, getSampleCrowdsale, getSampleCrowdsaleToken } from 'src/utils/params'

export default class Actions extends Component {

  state = {
    action: null,
    accounts: [],
  }

  handle = async () => {
    this.setState({ action: "processing..." })

    try {
      let web3 = getWeb3()
      let crowdsale = await getSampleCrowdsale(web3)
      let account1 = web3.eth.accounts[1]

      await crowdsale.sendTransaction({ from: account1, value: web3.toWei(1, "ether")})

      this.setState({ action: "add account1 token..." })
    } catch (err) {
      this.setState({ action: err.message })
    }
  }

  close = async () => {
    try {
      let web3 = getWeb3()
      let crowdsale = await getSampleCrowdsale(web3)

      console.log(crowdsale)

      await crowdsale.close()
    } catch (err) {
      console.log("owner???")
      console.log(err)
    }
  }

  render() {
    let { action } = this.state

    return (
      <div className="App">
        <h4> actions </h4>
        <div> actions { action }</div>

        <button onClick={ this.handle }> add account1 token </button>
        <button onClick={ this.close }> close contract </button>
      </div>
    )
  }
}
