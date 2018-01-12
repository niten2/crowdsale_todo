import React, { Component } from 'react'
import { getWeb3, getSampleCrowdsale, getSampleCrowdsaleToken } from 'src/utils/params'

export default class Balance extends Component {

  state = {
    totalSupply: null,
    status: null,
  }

  async componentWillMount() {
    await this.handle()
  }

  getStatus = async (crowdsale) => {
    let state = (await crowdsale.state()).toString(10)

    const status = {
      0: "Active",
      1: "Refunding",
      2: "Closed",
    }

    return status[state]
  }

  handle = async () => {
    this.setState({ totalSupply: "processing...", state: "processing..." })

    let web3 = getWeb3()
    let crowdsale = await getSampleCrowdsale(web3)
    let token = await getSampleCrowdsaleToken(web3)
    let instance = await token.at(await crowdsale.token())

    let totalSupply = await web3.fromWei(await instance.totalSupply()).toString(10)
    let state = await this.getStatus(crowdsale)

    this.setState({ totalSupply, state })
  }

  render() {
    let { totalSupply, state } = this.state

    return (
      <div className="App">
        <h4>totalSupply = { totalSupply || "not found" }</h4>
        <h4>state = { state || "not found" }</h4>
        <button onClick={ this.handle }> refresh </button>
      </div>
    )
  }
}
