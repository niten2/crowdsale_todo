import React, { Component } from 'react'
import { getWeb3, getSampleCrowdsale, getSampleCrowdsaleToken } from 'src/utils/params'

export default class Balance extends Component {

  state = {
    address: null,
  }

  handle = async () => {
    let web3 = getWeb3()
    let crowdsale = await getSampleCrowdsale(web3)
    let token = await getSampleCrowdsaleToken(web3)
    let account1 = web3.eth.accounts[1]

    let address = await crowdsale.token()
    this.setState({ address })
  }

  render() {
    let { address } = this.state

    return (
      <div className="App">
        <h1>Your balance address token { address || "not found" }</h1>
        <button onClick={ this.handle }> refresh </button>
      </div>
    )
  }
}
