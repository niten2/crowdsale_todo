import React, { Component } from 'react'
import { getWeb3, getSampleCrowdsale, getSampleCrowdsaleToken } from 'src/utils/params'

export default class Balance extends Component {

  state = {
    balance: null,
  }

  handle = async () => {
    let web3 = getWeb3()
    let crowdsale = await getSampleCrowdsale(web3)
    let token = await getSampleCrowdsaleToken(web3)
    let account1 = web3.eth.accounts[1]

    let instance = await token.at(await crowdsale.token())
    let balance = (await instance.balanceOf(account1)).toString(10)

    this.setState({ balance })
  }

  render() {
    let { balance } = this.state

    return (
      <div className="App">
        <h1>Your balance account1 { balance || "not found" }</h1>
        <button onClick={ this.handle }> refresh </button>
      </div>
    )
  }
}
